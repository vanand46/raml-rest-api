import { injectable, inject } from "tsyringe";
import { Customer } from "../entities/customer.entity";
import { CustomerDAO } from "../dao/customer.dao";

@injectable()
export class CustomerService {
  constructor(@inject(CustomerDAO) private customerDAO: CustomerDAO) { }

  createCustomer(data: Omit<Customer, "id">): Customer {
    const allCustomers = this.customerDAO.findAll();
    const duplicate = allCustomers.find(c => c.email === data.email);

    if (duplicate) {
      throw new Error("Email already exists");
    }

    return this.customerDAO.create(data);
  }

  updateCustomer(id: number, data: Partial<Omit<Customer, "id">>): Customer | null {
    return this.customerDAO.update(id, data);
  }

  getCustomers(): Customer[] {
    return this.customerDAO.findAll();
  }

  getCustomerById(id: number): Customer | null {
    return this.customerDAO.findById(id);
  }

  deleteCustomer(id: number): boolean {
    return this.customerDAO.delete(id);
  }
}

