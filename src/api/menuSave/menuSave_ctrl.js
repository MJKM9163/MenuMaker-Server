import Joi from 'joi';
import Menu from '../../models/menu';
import PriceNumber from '../../models/priceNumber';

export const register = async ctx => {
    const schema = Joi.object().keys({
        menuname: Joi.string().required(),
        main: Joi.boolean().required(),
        description: Joi.string().required(),
        main_ingredient: Joi.string().required(),
        main_ingredient_weight: Joi.number().required(),
        ingredientArray: Joi.array().items(Joi.string()).unique().required(),
        ingredientWeightArray: Joi.array().items(Joi.number()).required(),
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
    const { menuname,
            main,
            description,
            main_ingredient,
            main_ingredient_weight,
            ingredientArray,
            ingredientWeightArray,
            category,
            cook_type,
            sauce_base,
            country } = ctx.request.body;
    try {
        const exists = await Menu.findByMenuname(menuname)
        if (exists) {
            ctx.status = 409;
            return;
        }
        const menu = new Menu({
            menuname,
            main,
            description,
            main_ingredient,
            main_ingredient_weight,
            ingredient: ingredientArray,
            ingredient_weight: ingredientWeightArray,
            category,
            cook_type,
            sauce_base,
            country
        });
        await menu.save();
        ctx.body = menu;
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