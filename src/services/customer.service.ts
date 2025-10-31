import { injectable, inject } from "tsyringe";
import { Customer } from "../entities/customer.entity";
import { CustomerDAO } from "../dao/customer.dao";

@injectable()
export class CustomerService {
  constructor(@inject(CustomerDAO) private customerDAO: CustomerDAO) { }

  async createCustomer(data: Customer): Promise<Customer> {
    return await this.customerDAO.create(data);
  }
 
  async getCustomers(): Promise<Customer[]> {
    return await this.customerDAO.findAll();
  }

  async getCustomer(id: string): Promise<Customer | null> {
    return await this.customerDAO.findById(id);
  }

  async updateCustomer(id: string, data: Partial<Customer>): Promise<Customer | null> {
    return await this.customerDAO.update(id, data);
  }

  async deleteCustomer(id: string): Promise<boolean> {
    return await this.customerDAO.delete(id);
  }

}

