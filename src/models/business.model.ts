import { Schema, model, Document } from 'mongoose';

interface IBusiness extends Document {
  businessName: string;
  country: string;
  state: string;
  city: string;
  address: string;
  openingTime: string;
  closingTime: string;
  email: string;
  mobile: string;
  image?: string;
  isVerified: boolean;
    verifyCodeExpiry: Date;
    verifyCode: string;

}

const BusinessSchema = new Schema<IBusiness>({
  businessName: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  openingTime: { type: String, required: true },
  closingTime: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, length: 10 },
  image: { type: String },
  verifyCode: {
    type: String,
    required: [true, 'Verify Code is required'],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, 'Verify Code Expiry is required'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

export default model<IBusiness>('Business', BusinessSchema);