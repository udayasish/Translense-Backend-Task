import { Schema, model } from 'mongoose';
const OwnerSchema = new Schema({
    fullName: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, length: 10 },
    profilePic: { type: String },
    ownerVerifyCode: {
        type: String,
        required: [true, 'Verify Code is required'],
    },
    ownerVerifyCodeExpiry: {
        type: Date,
        required: [true, 'Verify Code Expiry is required'],
    },
    isOwnerVerified: {
        type: Boolean,
        default: false,
    },
});
export default model('Owner', OwnerSchema);
