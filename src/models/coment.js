import mongoose, { Schema } from 'mongoose';

const ComentSchema = new Schema ({
    username: String,
    body: String,
    publishedDate: {
        type: Date,
        default: Date.now,
    },
    user: {
        _id: mongoose.Types.ObjectId,
        username: String,
    },
});

const Coment = mongoose.model('coment', ComentSchema);

export default Coment;