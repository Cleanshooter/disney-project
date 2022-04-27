"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const todo_entity_1 = require("./todo.entity");
const user_entity_1 = require("../user/user.entity");
let TodoService = class TodoService {
    constructor(todoRepository, userRepository) {
        this.todoRepository = todoRepository;
        this.userRepository = userRepository;
        this.responseOject = (todo) => {
            return Object.assign(Object.assign({}, todo), { author: todo.author.sanitizeObject() });
        };
        this.verifyOwnership = (todo, userId) => {
            if (todo.author.id !== userId) {
                throw new common_1.HttpException('Incorrect User', common_1.HttpStatus.UNAUTHORIZED);
            }
        };
        this.getAllTodos = async (userId) => {
            const user = await this.userRepository.findOne({ where: { id: userId } });
            const todos = await this.todoRepository.find({
                where: { author: user },
                order: { createdOn: 'DESC' },
                relations: ['author'],
            });
            return todos.map(todo => {
                this.verifyOwnership(todo, userId);
                return this.responseOject(todo);
            });
        };
        this.createTodo = async (userId, content) => {
            const user = await this.userRepository.findOne({ where: { id: userId } });
            const newTodo = this.todoRepository.create({
                content,
                author: user,
            });
            await this.todoRepository.save(newTodo);
            return this.responseOject(newTodo);
        };
        this.updateTodo = async (userId, id, data) => {
            const todo = await this.todoRepository.findOne({ id }, { relations: ['author'] });
            if (!todo)
                throw new common_1.HttpException('Item not found', common_1.HttpStatus.NOT_FOUND);
            this.verifyOwnership(todo, userId);
            if (data.hasOwnProperty('completed')) {
                await this.todoRepository.update({ id }, { completed: data.completed });
            }
            if (data.content) {
                await this.todoRepository.update({ id }, { content: data.content });
            }
            return this.responseOject(todo);
        };
        this.deleteTodo = async (userId, id) => {
            const todo = await this.todoRepository.findOne({ id }, { relations: ['author'] });
            if (!todo)
                throw new common_1.HttpException('Item not found', common_1.HttpStatus.NOT_FOUND);
            this.verifyOwnership(todo, userId);
            await this.todoRepository.remove(todo);
            return this.responseOject(todo);
        };
    }
};
TodoService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(todo_entity_1.TodoEntity)),
    __param(1, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TodoService);
exports.TodoService = TodoService;
//# sourceMappingURL=todo.service.js.map