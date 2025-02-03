import { Schema, model, Document } from 'mongoose';

interface IOwner extends Document {
  fullName: string;
  country: string;
  state: string;
  city: string;
  address: string;
  email: string;
  mobile: string;
  profilePic?: string;
  isOwnerVerified: boolean;
    ownerVerifyCodeExpiry: Date;
    ownerVerifyCode: string;

}

const OwnerSchema = new Schema<IOwner>({
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

export default model<IOwner>('Owner', OwnerSchema);