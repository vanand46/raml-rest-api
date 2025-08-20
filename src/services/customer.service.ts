import { Customer } from '../entities/customer.entity';

// In-memory database
const customerDB = new Map<number, Customer>();
let idCounter = 0;

export const createNewCustomer = (customerData: Omit<Customer, 'id'>): Customer => {
    idCounter++;
    const newCustomer = new Customer(
        customerData.firstName,
        customerData.lastName,
        customerData.email
    );
    newCustomer.id = idCounter;
    customerDB.set(newCustomer.id, newCustomer);
    console.log('Current Database State:', Array.from(customerDB.values()));
    return newCustomer;
};

export const findAllCustomers = (): Customer[] => {
    return Array.from(customerDB.values());
};