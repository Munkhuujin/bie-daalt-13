const dateHelper = require('../src/utils/dateHelper');

describe('dateHelper', () => {
  describe('todayISO', () => {
    it('should return today in YYYY-MM-DD format', () => {
      const today = dateHelper.todayISO();
      expect(today).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe('isOverdue', () => {
    it('should return true for past dates', () => {
      expect(dateHelper.isOverdue('2020-01-01')).toBe(true);
    });

    it('should return false for future dates', () => {
      expect(dateHelper.isOverdue('2099-12-31')).toBe(false);
    });

    it('should return false for null due date', () => {
      expect(dateHelper.isOverdue(null)).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(dateHelper.isOverdue('')).toBe(false);
    });
  });

  describe('isToday', () => {
    it('should return true for today', () => {
      const today = dateHelper.todayISO();
      expect(dateHelper.isToday(today)).toBe(true);
    });

    it('should return false for yesterday', () => {
      expect(dateHelper.isToday('2020-01-01')).toBe(false);
    });

    it('should return false for null', () => {
      expect(dateHelper.isToday(null)).toBe(false);
    });
  });

  describe('isThisWeek', () => {
    it('should return true for today', () => {
      const today = dateHelper.todayISO();
      expect(dateHelper.isThisWeek(today)).toBe(true);
    });

    it('should return false for last year', () => {
      expect(dateHelper.isThisWeek('2020-01-01')).toBe(false);
    });

    it('should return false for null', () => {
      expect(dateHelper.isThisWeek(null)).toBe(false);
    });
  });
});