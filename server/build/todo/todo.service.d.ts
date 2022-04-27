import { Repository } from 'typeorm';
import { TodoEntity } from './todo.entity';
import { TodoDTO, TodoSO } from './todo.dto';
import { UserEntity } from 'src/user/user.entity';
export declare class TodoService {
    private todoRepository;
    private userRepository;
    constructor(todoRepository: Repository<TodoEntity>, userRepository: Repository<UserEntity>);
    private responseOject;
    private verifyOwnership;
    getAllTodos: (userId: string) => Promise<TodoSO[]>;
    createTodo: (userId: string, content: Extract<TodoDTO, 'content'>) => Promise<TodoSO>;
    updateTodo: (userId: string, id: string, data: Partial<TodoDTO>) => Promise<TodoSO>;
    deleteTodo: (userId: string, id: string) => Promise<TodoSO>;
}
