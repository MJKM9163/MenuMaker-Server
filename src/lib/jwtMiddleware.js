import jwt from "jsonwebtoken";

const jwtMiddleware = (ctx, next) => {
    const token = ctx.cookies.get('access_token');
    if (!token) {
        return next();
    };
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        ctx.state.user = {
            _id: verify._id,
            username: verify.username,
        };
        return next();
    } catch (e) {
        return next();
    };
};

export default jwtMiddleware;