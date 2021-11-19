import Menu from "../../models/menu";

export const findMain = async ctx => {
    try {
        const findAll = await Menu.aggregate([
            {$group: {
                '_id': '$main_ingredient',
                'count': {'$sum': 1}}}
        ])
        ctx.body = findAll;
        console.log(ctx.body)
    } catch (e) {
        ctx.throw(500, e);
    }
    console.log("리스트 불러옴");
}

// '_id': {'main_ingredient': '$main_ingredient'},
//                 'count': {'$sum': 1}}},
//                 {$match: {_id: {main_ingredient: '두부'}}}