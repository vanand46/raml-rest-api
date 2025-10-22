import { Request, Response, NextFunction } from "express";
import { autoInjectable } from "tsyringe";
import { CustomerService } from "../services/customer.service";
import { Controller } from "../decorators/controller.decorator";
import { Get, Post, Put, Delete } from "../decorators/routes.decorator";

@autoInjectable()
@Controller("/customers")
export class CustomController {

  constructor(private customerService?: CustomerService) { }

  @Get("/")
  getCustomers(req: Request, res: Response, next: NextFunction) {
    try {
      const customers = this.customerService!.getCustomers();
      res.status(201).json({ data: customers });
    } catch (error) {
      next(error);
    }
  }

  @Get("/:id")
  getCustomer(req: Request, res: Response, next: NextFunction) {
    const customer = this.customerService!.getCustomerById(Number(req.params.id));
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.json({ data: customer });
  }

  @Post("/")
  create(req: Request, res: Response, next: NextFunction) {
    try {
      const newCustomer = this.customerService!.createCustomer(req.body);
      res.status(201).json({ data: newCustomer });
    } catch (err) {
      next(err);
    }
  }

  @Put("/:id")
  update(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = this.customerService!.updateCustomer(Number(req.params.id), req.body);
      if (!updated) return res.status(404).json({ message: "Customer not found" });
      res.json({ data: updated });
    } catch (err) {
      next(err);
    }
  }

  @Delete("/:id")
  delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = this.customerService!.deleteCustomer(Number(req.params.id));
      if (!deleted) return res.status(404).json({ message: "Customer not found" });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}



