import { injectable } from "tsyringe";
import { Customer } from "../entities/customer.entity";

@injectable()
export class CustomerDAO {
    private customerDB = new Map<number, Customer>();
    private idCounter = 0;

    create(customerData: Omit<Customer, "id">): Customer {
        this.idCounter++;
        const newCustomer = new Customer(
            customerData.firstName,
            customerData.lastName,
            customerData.email
        );
        newCustomer.id = this.idCounter;
        this.customerDB.set(newCustomer.id, newCustomer);
        return newCustomer;
    }

    update(id: number, updateData: Partial<Omit<Customer, "id">>): Customer | null {
        const existingCustomer = this.customerDB.get(id);
        if (!existingCustomer) {
            return null;
        }
        if (updateData.firstName !== undefined) {
            existingCustomer.firstName = updateData.firstName;
        }
        if (updateData.lastName !== undefined) {
            existingCustomer.lastName = updateData.lastName;
        }
        if (updateData.email !== undefined) {
            existingCustomer.email = updateData.email;
        }
        this.customerDB.set(id, existingCustomer);
        return existingCustomer;
    }

    findAll(): Customer[] {
        return Array.from(this.customerDB.values()) || [];
    }

    findById(id: number): Customer | null {
        return this.customerDB.get(id) ?? null;
    }

    delete(id: number): boolean {
        return this.customerDB.delete(id) ?? false;
    }
}