import { Schema, model, Document } from "mongoose";

export interface Customer {
    firstName: string;
    lastName: string;
    email: string;
    id?: string;
}

export interface CustomerDocument extends Document {
    firstName: string;
    lastName: string;
    email: string
}

const customerSchema = new Schema<CustomerDocument>(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

export const CustomerModel = model<CustomerDocument>("Customer", customerSchema);