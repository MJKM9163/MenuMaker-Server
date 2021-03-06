//import Joi from 'joi';
import User from '../../models/user';

export const register = async ctx => {
    const { username, password } = ctx.request.body;

    try {
        const findUserName = await User.findByUsername(username);
        if (findUserName) {
            console.log("이름 중복!");
            ctx.status = 409;
            return;
        };
        const user = new User({
            username,
        });

        await user.setPassword(password);
        await user.save();

        const data = user.toJSON();
        delete data.hashedPassword;
        ctx.body = data;

    } catch (e) {
        ctx.throw(500, e);
    };
    console.log(ctx.body);
};

export const login = async ctx => {
    const { username, password } = ctx.request.body;

    try {
        const findUser = await User.findByUsername(username);
        if (!findUser) {
            console.log("잘못된 아이디 입니다.");
            ctx.status = 401;
            return;
        };
        const passwordValid = await findUser.checkPassword(password);
        if (!passwordValid) {
            console.log("잘못된 비밀번호 입니다.");
            ctx.status = 401;
            return;
        }

        const data = findUser.toJSON();
        delete data.hashedPassword;
        ctx.body = data;

        const token = findUser.generateToken();
        ctx.cookies.set('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
        });

    } catch (e) {
        ctx.throw(500, e);
    };
    console.log("로그인 성공")
};

export const check = async ctx => {
    const { user } = ctx.state;
    console.log(user);
    if (!user) {
        ctx.status = 401;
        return;
    };
    ctx.body = user;
};

export const logout = async ctx => {
    ctx.cookies.set('access_token', null, {
        maxAge: 0,
        httpOnly: true,
    });
    ctx.status = 204;
    console.log("쿠키 제거")
};