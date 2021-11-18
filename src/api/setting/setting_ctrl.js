import Menu from "../../models/menu";

export const findMain = async ctx => {
    try {
        const findAll = await Menu.find({menuname: '콩나물밥'})
        ctx.body = findAll;
        //console.log(findAll.length)
    } catch (e) {
        ctx.throw(500, e);
    }//여기서부터 다시 시작
}