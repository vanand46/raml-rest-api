import { Router, RequestHandler } from "express";
import "reflect-metadata";

export function registerControllers(controllers: any[]): Router {
    const router = Router();

    controllers.forEach((ControllerClass) => {
        const controllerInstance = new ControllerClass();
        const basePath = Reflect.getMetadata("basePath", ControllerClass);
        const routes = Reflect.getMetadata("routes", ControllerClass) || [];

        routes.forEach((route: any) => {
            const fullPath = basePath + route.path;
            const handler = (controllerInstance as any)[route.handlerName].bind(controllerInstance);
            const middlewares: RequestHandler[] =
                Reflect.getMetadata("middlewares", ControllerClass, route.handlerName) || [];
            (router as any)[route.method](fullPath, ...middlewares, handler);
        });
    });

    return router;
}
