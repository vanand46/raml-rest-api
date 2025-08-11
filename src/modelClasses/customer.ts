export class Customer {
    public id: number;
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string
    ) {
        this.id = 0;
    }
}