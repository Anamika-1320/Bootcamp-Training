import { SelectQueryBuilder } from "typeorm";
export interface PaginateOptions {
    limit: number;
    currentPage: number;
    total?: boolean;
}
export interface PaginationResult<T> {
    first: number;
    last: number;
    limit: number;
    total?: number;
    data: T[];
}
export declare function paginate<T>(qb: SelectQueryBuilder<T>, options?: PaginateOptions): Promise<PaginationResult<T>>;
