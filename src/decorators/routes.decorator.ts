import "reflect-metadata";

interface RouteDefinition {
    path: string;
    method: string;
    handlerName: string;
}

const defineRoute = (method: string, path: string): MethodDecorator => {
    return (target, propertyKey) => {
        const routes: RouteDefinition[] = Reflect.getMetadata("routes", target.constructor) || [];
        routes.push({ method, path, handlerName: propertyKey as string });
        Reflect.defineMetadata("routes", routes, target.constructor);
    }
}

export const Get = (path: string) => defineRoute("get", path);
export const Post = (path: string) => defineRoute("post", path);
export const Put = (path: string) => defineRoute("put", path);
export const Delete = (path: string) => defineRoute("delete", path);