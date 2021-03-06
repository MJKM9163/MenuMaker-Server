import mongoose, { Schema } from 'mongoose';

const MenuSchema = new Schema ({
    menuname: String,
    image: Buffer,
    main: Boolean,
    description: String,
    main_ingredient: String,
    main_ingredient_weight: Number,
    ingredient: Array,
    ingredient_weight: Array,
    category: String,
    cook_type: String,
    sauce_base: String,
    country: String,
});

MenuSchema.statics.findByMenuname = function(menuname) {
    return this.findOne({ menuname });
}

const Menu = mongoose.model('menu-items', MenuSchema);

export default Menu;