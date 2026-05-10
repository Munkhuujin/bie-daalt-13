const { taskService, ValidationError, NotFoundError } = require('../src/services/taskService');

// Mock the repository
jest.mock('../src/repositories/taskRepository', () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}));

const taskRepository = require('../src/repositories/taskRepository');

describe('taskService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createTask', () => {
    it('should create task with valid input', () => {
      const expected = { id: 1, title: 'Test', priority: 'medium', status: 'todo' };
      taskRepository.create.mockReturnValue(expected);

      const result = taskService.createTask({ title: 'Test' });
      expect(result).toEqual(expected);
      expect(taskRepository.create).toHaveBeenCalled();
    });

    it('should throw ValidationError for empty title', () => {
      expect(() => taskService.createTask({ title: '' })).toThrow(ValidationError);
    });

    it('should throw ValidationError for missing title', () => {
      expect(() => taskService.createTask({})).toThrow(ValidationError);
    });

    it('should throw ValidationError for whitespace-only title', () => {
      expect(() => taskService.createTask({ title: '   ' })).toThrow(ValidationError);
    });

    it('should throw ValidationError for invalid priority', () => {
      expect(() => taskService.createTask({ title: 'X', priority: 'urgent' }))
        .toThrow(ValidationError);
    });

    it('should throw ValidationError for invalid status', () => {
      expect(() => taskService.createTask({ title: 'X', status: 'pending' }))
        .toThrow(ValidationError);
    });
  });

  describe('getTaskById', () => {
    it('should return task when found', () => {
      const task = { id: 1, title: 'Test' };
      taskRepository.findById.mockReturnValue(task);

      expect(taskService.getTaskById(1)).toEqual(task);
    });

    it('should throw NotFoundError when task not found', () => {
      taskRepository.findById.mockReturnValue(undefined);

      expect(() => taskService.getTaskById(999)).toThrow(NotFoundError);
    });
  });

  describe('getAllTasks', () => {
    it('should call repository with empty filters', () => {
      taskRepository.findAll.mockReturnValue([]);
      taskService.getAllTasks();
      expect(taskRepository.findAll).toHaveBeenCalledWith({});
    });

    it('should throw ValidationError for invalid status filter', () => {
      expect(() => taskService.getAllTasks({ status: 'unknown' }))
        .toThrow(ValidationError);
    });

    it('should throw ValidationError for invalid priority filter', () => {
      expect(() => taskService.getAllTasks({ priority: 'urgent' }))
        .toThrow(ValidationError);
    });
  });
});