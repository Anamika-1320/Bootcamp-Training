"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = void 0;
async function paginate(qb, options = {
    limit: 10, currentPage: 1
}) {
    const offset = (options.currentPage - 1) * options.limit;
    const data = await qb.limit(options.limit).offset(offset).getMany();
    return {
        first: offset + 1,
        last: offset + data.length,
        limit: options.limit,
        total: options.total ? await qb.getCount() : null,
        data: data
    };
}
exports.paginate = paginate;
//# sourceMappingURL=paginator.js.map