import Joi from 'joi';
import Menu from '../../models/menu';

// const MenuSchema = new Schema ({
//     menuname: String,
//     image: Buffer,
//     description: String,
//     main_ingredient: String,
//     ingredient: [String],
// });

export const register = async ctx => {
    //console.log(ctx);
    console.log(ctx.query);
    console.log(ctx.params);

    const schema = Joi.object().keys({
        menuname: Joi.string().max(15).required(),
        main: Joi.boolean().required(),
        description: Joi.string().required(),
        main_ingredient: Joi.string().required(),
        ingredient: Joi.required(),
        category: Joi.string().required(),
        cook_type: Joi.required(),
        sauce_base: Joi.required(),

    })

    const result = schema.validate(ctx.request.body);
    if (result.error) {
        console.log("Joi 검증에 통과하지 못했어요!");
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }
    console.log(ctx.request.body);

    const { menuname,
            main,
            description,
            main_ingredient,
            ingredient,
            category,
            cook_type,
            sauce_base } = ctx.request.body;
    try {
        const exists = await Menu.findByMenuname(menuname)
        if (exists) {
            console.log("중복되는 이름이 있어요");
            ctx.status = 409;
            return;
        }

        const menu = new Menu({
            menuname,
            main,
            description,
            main_ingredient,
            ingredient,
            category,
            cook_type,
            sauce_base,
        });

        await menu.save();
        ctx.body = menu;

        console.log("성공적으로 저장");

    } catch (e) {
        ctx.throw(500, e);
    };
};

export const testtest = () => {

}