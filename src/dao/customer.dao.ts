import { injectable } from "tsyringe";
import { CustomerModel, Customer } from "../entities/customer.entity";

@injectable()
export class CustomerDAO {

    async create(data: Customer): Promise<Customer> {
        const customer = new CustomerModel(data);
        const saved = await customer.save();
        return this.toDomainModel(saved);
    }

    async findAll(): Promise<Customer[]> {
        const docs = await CustomerModel.find().lean();
        return docs.map(this.toDomainModel);
    }

    async findById(id: string): Promise<Customer | null> {
        const doc = await CustomerModel.findById(id).lean();
        return doc ? this.toDomainModel(doc) : null;
    }

    async update(id: string, data: Partial<Customer>): Promise<Customer | null> {
        const updated = await CustomerModel.findByIdAndUpdate(id, data, { new: true }).lean();
        return updated ? this.toDomainModel(updated) : null;
    }

    async delete(id: string): Promise<boolean> {
        const result = await CustomerModel.findByIdAndDelete(id);
        return !!result;
    }

    private toDomainModel(doc: any): Customer {
        return {
            id: doc._id.toString(),
            firstName: doc.firstName,
            lastName: doc.lastName,
            email: doc.email
        };
    }
}