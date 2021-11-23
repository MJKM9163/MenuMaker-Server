import Coment from "../../models/coment";
import Joi from 'joi';

export const comentCreate = async ctx => {
    console.log(ctx.request.body);
    const { username, body } = ctx.request.body;

    const schema = Joi.object().keys({
        username: Joi.string().max(8).required(),
        body: Joi.string().max(200).required(),
    });

    const result = schema.validate(ctx.request.body);
    if (result.error) {
        console.log("Joi 검증에 통과하지 못했어요!");
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const coment = new Coment({
        username,
        body,
    });

    try {
        await coment.save();
        ctx.body = coment;
    } catch (e) {
        ctx.throw(500, e);
    };

};

export const comentList = async ctx => {
    try {
        const listCall = await Coment.find();
        ctx.body = listCall;
    } catch (e) {
        ctx.throw(500, e);
    };
    console.log(ctx.body);
};