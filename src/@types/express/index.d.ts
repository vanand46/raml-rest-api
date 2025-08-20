import { Customer } from '../../entities/customer.entity';

declare global {
    namespace Express {
        export interface Request {
            customer?: Customer;
        }
    }
}

// This empty export is crucial to treat this file as a module.
export { };