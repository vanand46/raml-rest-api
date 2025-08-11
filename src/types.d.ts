import { Customer } from "./modelClasses/customer";

declare global {
    namespace Express {
        export interface Request {
            customer?: Customer;
        }
    }
}