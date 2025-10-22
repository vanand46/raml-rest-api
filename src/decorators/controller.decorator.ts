import "reflect-metadata";

export const Controller = (basePath: string): ClassDecorator => {
    return (target: any) => {
        Reflect.defineMetadata("basePath", basePath, target);
        if(!Reflect.hasMetadata("routes", target)) {
            Reflect.defineMetadata("routes", [], target);
        }
    };  
}
