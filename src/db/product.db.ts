import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, "Enter product name"] },
        quantity: { type: Number, required: true, default: 0 },
        price: { type: Number, required: true, default: 0 },
        image: { type: String, required: false },
    },
    {
        timestamps: true,
    }
);

const ProductModel = mongoose.model("Product", ProductSchema);

export const getProducts = () => ProductModel.find();
export const getProductById = (id: string) => ProductModel.findById(id);
export const createProduct = (values: Record<string, any>) =>
    new ProductModel(values).save().then((Product) => Product.toObject());

export const deleteProductById = (id: string) =>
    ProductModel.findOneAndDelete({ _id: id });

export const updateProductById = (id: string, values: Record<string, any>) =>
    ProductModel.findByIdAndUpdate(id, values);
