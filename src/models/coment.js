import mongoose, { Schema } from 'mongoose';

const ComentSchema = new Schema ({
    username: String,
    body: String,
    publishedDate: {
        type: Date,
        default: Date.now,
    },
});

const Coment = mongoose.model('coment', ComentSchema);

export default Coment;