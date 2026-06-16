import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter product Name"],
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please Enter Product Description'],
        trim: true,
    },
    currency: {
        type: String,
        default: 'INR',
    },
    price: {
        type: Number,
        required: [true, "Please Enter The Product Price"],
        default: 0,
        min: [0, "Price can't be negative"],
        max: [999999, "Price can't exceed 6 digits"]
    },
    image: [{
        public_id: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        }
    }],
    category: {
        type: String,
        required: [true, 'Please enter product category']
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock count"],
        default: 0,
        min: [0, "Stock can't be negative"],
        max: [99999, "Stock can't exceed 5 digits"],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    numberOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});


export default mongoose.model('product', productSchema);


