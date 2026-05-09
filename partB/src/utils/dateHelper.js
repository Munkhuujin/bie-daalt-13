const dateHelper = {
  todayISO() {
    return new Date().toISOString().split('T')[0];
  },

  endOfWeekISO() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday
    const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + daysUntilSunday);
    return endOfWeek.toISOString().split('T')[0];
  },

  isOverdue(dueDate) {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date(this.todayISO());
  },

  isToday(dueDate) {
    if (!dueDate) return false;
    return dueDate.startsWith(this.todayISO());
  },

  isThisWeek(dueDate) {
    if (!dueDate) return false;
    const today = this.todayISO();
    const endWeek = this.endOfWeekISO();
    return dueDate >= today && dueDate <= endWeek;
  }
};

module.exports = dateHelper;