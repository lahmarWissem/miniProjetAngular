import { User } from "./user.model";
export class UserWrapper{
_embedded!: { users: User[]};
}