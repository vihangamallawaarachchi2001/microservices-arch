import mongoose, { Schema, Document } from "mongoose";


export enum CategoryNames {
    FRUITS = "Fruits",
    VEGETABLES = "Vegetables",
    DAIRY = "Dairy",
    MEAT = "Meat",
    POULTRY = "Poultry",
    SEAFOOD = "Seafood",
    GRAINS = "Grains",
    BEVERAGES = "Beverages",
    SNACKS = "Snacks",
    SWEETS = "Sweets",
    LEGUMES = "Legumes",
    SPICES = "Spices",
    OILS = "Oils",
    NUTS = "Nuts"
}

export interface ICategory extends Document {
    name: CategoryNames;  
}

const CategoriesSchema: Schema = new Schema({
    name: { 
        type: String, 
        required: true, 
        enum: Object.values(CategoryNames) 
    }
}, { timestamps: true });

const Categories = mongoose.model<ICategory>("Categories", CategoriesSchema);

export default Categories;
