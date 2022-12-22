import { ImageUser } from "./imageUser.model";
import { Role } from "./role.model";
export class User{
    user_id!:number;
    username!:string ;
    password!: string ;// 
    enabled!: Boolean;
    roles !:Role[];
    image !: ImageUser;
   
}
    