import Joi from 'joi';
import Menu from '../../models/menu';
import PriceNumber from '../../models/priceNumber';

export const register = async ctx => {

    const schema = Joi.object().keys({
        menuname: Joi.string().required(),
        main: Joi.boolean().required(),
        description: Joi.string().required(),
        main_ingredient: Joi.string().required(),
        ingredientArray: Joi.array().items(Joi.string()).unique().required(),
        category: Joi.string().required(),
        cook_type: Joi.required(),
        sauce_base: Joi.required(),
        country: Joi.required(),

    })

    const result = schema.validate(ctx.request.body);
    if (result.error) {
        console.log("Joi 검증에 통과하지 못했어요!");
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }
    console.log("request", ctx.request.body);

    const { menuname,
            main,
            description,
            main_ingredient,
            ingredientArray,
            category,
            cook_type,
            sauce_base,
            country } = ctx.request.body;
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
            ingredient: ingredientArray,
            category,
            cook_type,
            sauce_base,
            country
        });

        await menu.save();
        ctx.body = menu;

        console.log("성공적으로 저장");

    } catch (e) {
        ctx.throw(500, e);
    };
};

export const namesave = async ctx => {
    const { name, number, detailNumber } = ctx.request.body;

    try {
        const priceSave = new PriceNumber({
            name,
            number,
            detailNumber
        });

        await priceSave.save();
        ctx.body = priceSave;
    } catch (e) {
        ctx.throw(500, e);
    };
};