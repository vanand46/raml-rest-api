import { injectable } from "tsyringe";
import { CustomerDocument, CustomerModel, Customer } from "../entities/customer.entity";

@injectable()
export class CustomerDAO {
    
    async create(data: Customer): Promise<Customer> {
       const customer = new CustomerModel(data);
       const saved = await customer.save();
       return this.toDomain(saved)
    }

    async findAll(): Promise<CustomerDocument[]>{
        return await CustomerModel.find().lean();
    }

    
}