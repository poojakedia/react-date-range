"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStaticRanges = createStaticRanges;
exports.defaultStaticRanges = exports.defaultInputRanges = void 0;
var _dateFns = require("date-fns");
const defineds = {
  startOfToday: (0, _dateFns.startOfDay)(new Date()),
  endOfToday: (0, _dateFns.endOfDay)(new Date()),
  startOfTomorrow: (0, _dateFns.startOfTomorrow)(),
  endOfTomorrow: (0, _dateFns.endOfTomorrow)(),
  startOfWeek: (0, _dateFns.startOfWeek)(new Date()),
  endOfWeek: (0, _dateFns.endOfWeek)(new Date()),
  endOfNextWeek: (0, _dateFns.endOfWeek)((0, _dateFns.addDays)(new Date(), 7))
};
const staticRangeHandler = {
  range: {},
  isSelected(range) {
    const definedRange = this.range();
    return (0, _dateFns.isSameDay)(range.startDate, definedRange.startDate) && (0, _dateFns.isSameDay)(range.endDate, definedRange.endDate);
  }
};
function createStaticRanges(ranges) {
  return ranges.map(range => ({
    ...staticRangeHandler,
    ...range
  }));
}
// today, tomorrow, this week, next 2 weeks
const defaultStaticRanges = exports.defaultStaticRanges = createStaticRanges([{
  label: 'Today',
  range: () => ({
    startDate: defineds.startOfToday,
    endDate: defineds.endOfToday
  })
}, {
  label: 'Tommorow',
  range: () => ({
    startDate: defineds.startOfTomorrow,
    endDate: defineds.endOfTomorrow
  })
}, {
  label: 'This Week',
  range: () => ({
    startDate: defineds.startOfWeek,
    endDate: defineds.endOfWeek
  })
}, {
  label: 'Next Two Week',
  range: () => ({
    startDate: defineds.startOfWeek,
    endDate: defineds.endOfNextWeek
  })
}]);
const defaultInputRanges = exports.defaultInputRanges = [{
  label: 'days up to today',
  range(value) {
    return {
      startDate: (0, _dateFns.addDays)(defineds.startOfToday, (Math.max(Number(value), 1) - 1) * -1),
      endDate: defineds.endOfToday
    };
  },
  getCurrentValue(range) {
    if (!(0, _dateFns.isSameDay)(range.endDate, defineds.endOfToday)) return '-';
    if (!range.startDate) return '∞';
    return (0, _dateFns.differenceInCalendarDays)(defineds.endOfToday, range.startDate) + 1;
  }
}, {
  label: 'days starting today',
  range(value) {
    const today = new Date();
    return {
      startDate: today,
      endDate: (0, _dateFns.addDays)(today, Math.max(Number(value), 1) - 1)
    };
  },
  getCurrentValue(range) {
    if (!(0, _dateFns.isSameDay)(range.startDate, defineds.startOfToday)) return '-';
    if (!range.endDate) return '∞';
    return (0, _dateFns.differenceInCalendarDays)(range.endDate, defineds.startOfToday) + 1;
  }
}];