import Menu from "../../models/menu";

export const findMain = async ctx => {
    try {
        const findAll = await Menu.aggregate([
            {$group: {
                '_id': '$main_ingredient',
                }}//'count': {'$sum': 1}
        ])
        ctx.body = findAll;
    } catch (e) {
        ctx.throw(500, e);
    };
};