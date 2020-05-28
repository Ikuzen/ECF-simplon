export interface User {
    _id?: string;
    password?: string;
    username: string;
    email: string;
    birthDate: Date;
    register_date?: Date;
}