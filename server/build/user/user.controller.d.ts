import { UserService } from './user.service';
import { UserDTO } from './user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    login(data: UserDTO): Promise<import("./user.dto").UserSO>;
    register(data: UserDTO): Promise<import("./user.dto").UserSO>;
    getProfile(req: any): Promise<any>;
}
