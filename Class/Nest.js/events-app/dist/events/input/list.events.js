"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListEvents = exports.WhenEventFilter = void 0;
var WhenEventFilter;
(function (WhenEventFilter) {
    WhenEventFilter[WhenEventFilter["All"] = 1] = "All";
    WhenEventFilter[WhenEventFilter["Today"] = 2] = "Today";
    WhenEventFilter[WhenEventFilter["Tomorrow"] = 3] = "Tomorrow";
    WhenEventFilter[WhenEventFilter["ThisWeek"] = 4] = "ThisWeek";
    WhenEventFilter[WhenEventFilter["NextWeek"] = 5] = "NextWeek";
})(WhenEventFilter || (exports.WhenEventFilter = WhenEventFilter = {}));
class ListEvents {
    constructor() {
        this.when = WhenEventFilter.All;
        this.page = 1;
    }
}
exports.ListEvents = ListEvents;
//# sourceMappingURL=list.events.js.map