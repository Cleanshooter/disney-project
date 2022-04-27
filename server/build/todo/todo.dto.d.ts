import { UserSO } from 'src/user/user.dto';
export declare class TodoDTO {
    content: string;
    completed: boolean;
}
export declare type TodoSO = {
    id: string;
    createdOn: Date;
    completed: boolean;
    author: UserSO;
    token?: string;
};
