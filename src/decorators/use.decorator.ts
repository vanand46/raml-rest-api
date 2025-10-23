import "reflect-metadata";
import { RequestHandler } from "express";

export const Use = (middlewares: RequestHandler[]): MethodDecorator => {
    return (target, propertyKey) => {
        const existingMiddlewares =
            Reflect.getMetadata("middlewares", target.constructor, propertyKey as string) || [];
        Reflect.defineMetadata(
            "middlewares",
            [...existingMiddlewares, ...middlewares],
            target.constructor,
            propertyKey as string
        );
    };
}