import { UserEntity } from 'src/user/user.entity';
export declare class TodoEntity {
    id: string;
    content: string;
    createdOn: Date;
    completed: boolean;
    author: UserEntity;
}
