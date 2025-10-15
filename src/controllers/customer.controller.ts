import { Request, Response, NextFunction } from "express";
import * as customerService from "../services/customer.service";

export const createCustomer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email } = req.body;
    const newCustomer = customerService.createNewCustomer({
      firstName,
      lastName,
      email,
    });
    res.status(201).json(newCustomer);
  } catch (error) {
    next(error); // Pass errors to the central error handler
  }
};

export const getCustomers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allCustomers = customerService.findAllCustomers();
    res.status(200).json(allCustomers);
  } catch (error) {
    next(error);
  }
};

export const getCustomer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = parseInt(req.params.id, 10);
    const customer = customerService.findCustomer(customerId);

    if (!customer) {
      res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
};

export const updateCustomer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = parseInt(req.params.id, 10);
    const { firstName, lastName, email } = req.body;

    const updatedCustomer = customerService.updateCustomerById(customerId, {
      firstName,
      lastName,
      email,
    });

    if (!updatedCustomer) {
      res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json(updatedCustomer);
  } catch (error) {
    next(error);
  }
};

export const deleteCustomer = (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = parseInt(req.params.id, 10);
    const deleted = customerService.deleteCustomerById(customerId);

    if (!deleted) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.status(204).send(); 
  } catch (error) {
    next(error);
  }
};

