import Coment from "../../models/coment";
import Joi from 'joi';

export const comentCreate = async ctx => {
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
        const listCall = await Coment.find().exec();
        ctx.body = listCall;
    } catch (e) {
        ctx.throw(500, e);
    };
};

export const comentUpdate = async ctx => {
    const { idValue } = ctx.request.body;

    const schema = Joi.object().keys({
        body: Joi.string().min(1).required(),
        idValue: Joi.string().alphanum(),
    });

    const result = schema.validate(ctx.request.body);
    if (result.error) {
        console.log("Joi 검증에 통과하지 못했어요!");
        ctx.status = 400;
        ctx.body = "수정할 내용이 없어요";
        return;
    };

    try {
        const index = await Coment.findByIdAndUpdate(idValue, ctx.request.body, {
            new: true,
        }).exec();

        if (!index) {
            ctx.status = 404;
            return;
        };
        ctx.body = index;
        console.log(index);
    } catch (e) {
        ctx.throw(500, e);
    };
};