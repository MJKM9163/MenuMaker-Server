import mongoose, { Schema } from 'mongoose';

const PriceNumberSchema = new Schema ({
    name: String,
    number: String,
    detailNumber: String,
});

const PriceNumber = mongoose.model('priceNumber', PriceNumberSchema);

export default PriceNumber;