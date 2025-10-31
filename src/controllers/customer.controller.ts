import { Request, Response, NextFunction } from "express";
import { autoInjectable, inject } from "tsyringe";
import { CustomerService } from "../services/customer.service";
import { Controller } from "../decorators/controller.decorator";
import { Get, Post, Put, Delete } from "../decorators/routes.decorator";
import { Use } from "../decorators/use.decorator";
import { createCustomerDto } from "../dto/create-customer.dto";
import { handleValidation } from "../middlewares/validation.middleware";

@autoInjectable()
@Controller("/customers")
export class CustomerController {

  constructor(@inject(CustomerService) private customerService: CustomerService) { }

  @Get("/")
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const customers = await this.customerService.getCustomers();
      res.status(201).json({ data: customers });
    } catch (error) {
      next(error);
    }
  }

  @Get("/:id")
  async getById(req: Request, res: Response, next: NextFunction) {
    const customer = await this.customerService.getCustomer(req.params.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.json({ data: customer });
  }

  @Post("/")
  @Use([...createCustomerDto, handleValidation])
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newCustomer = await this.customerService.createCustomer(req.body);
      res.status(201).json({ data: newCustomer });
    } catch (err) {
      next(err);
    }
  }

  @Put("/:id")
  @Use([...createCustomerDto, handleValidation])
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await this.customerService.updateCustomer(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: "Customer not found" });
      res.json({ data: updated });
    } catch (err) {
      next(err);
    }
  }

  @Delete("/:id")
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await this.customerService.deleteCustomer(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Customer not found" });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}



