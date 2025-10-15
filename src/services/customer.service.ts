import { Customer } from "../entities/customer.entity";

// In-memory database
const customerDB = new Map<number, Customer>();
let idCounter = 0;

export const createNewCustomer = (
  customerData: Omit<Customer, "id">
): Customer => {
  idCounter++;
  const newCustomer = new Customer(
    customerData.firstName,
    customerData.lastName,
    customerData.email
  );
  newCustomer.id = idCounter;
  customerDB.set(newCustomer.id, newCustomer);
  console.log("Current Database State:", Array.from(customerDB.values()));
  return newCustomer;
};

export const updateCustomerById = (
  id: number,
  updateData: Partial<Omit<Customer, "id">>
): Customer | null => {
  const existingCustomer = customerDB.get(id);

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

  customerDB.set(id, existingCustomer); // Save updated customer
  return existingCustomer;
};

export const findAllCustomers = (): Customer[] => {
  return Array.from(customerDB.values());
};

export const findCustomer = (id: number): Customer | null => {
  const customer = customerDB.get(id);
  if (!customer) {
    return null;
  }
  return customer;
};

export const deleteCustomerById = (id: number): boolean => {
  return customerDB.delete(id);
};

