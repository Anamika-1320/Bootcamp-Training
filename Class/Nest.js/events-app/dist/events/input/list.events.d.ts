export declare enum WhenEventFilter {
    All = 1,
    Today = 2,
    Tomorrow = 3,
    ThisWeek = 4,
    NextWeek = 5
}
export declare class ListEvents {
    when?: WhenEventFilter;
    page: number;
}
