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
exports.TodoController = void 0;
const common_1 = require("@nestjs/common");
const todo_service_1 = require("./todo.service");
const auth_guard_1 = require("../shared/auth.guard");
let TodoController = class TodoController {
    constructor(todoService) {
        this.todoService = todoService;
    }
    getAllTodos(req) {
        const userId = req.user.id;
        return this.todoService.getAllTodos(userId);
    }
    createTodo(req, content) {
        const userId = req.user.id;
        return this.todoService.createTodo(userId, content);
    }
    updateTodo(id, req, data) {
        const userId = req.user.id;
        return this.todoService.updateTodo(userId, id, data);
    }
    deleteTodo(req, id) {
        const userId = req.user.id;
        return this.todoService.deleteTodo(userId, id);
    }
};
__decorate([
    common_1.Get('/all'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "getAllTodos", null);
__decorate([
    common_1.Post('/create'),
    __param(0, common_1.Req()),
    __param(1, common_1.Body('content')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "createTodo", null);
__decorate([
    common_1.Patch('/update'),
    __param(0, common_1.Query('id')),
    __param(1, common_1.Req()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "updateTodo", null);
__decorate([
    common_1.Delete('/delete'),
    __param(0, common_1.Req()), __param(1, common_1.Query('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "deleteTodo", null);
TodoController = __decorate([
    common_1.Controller('todo'),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __metadata("design:paramtypes", [todo_service_1.TodoService])
], TodoController);
exports.TodoController = TodoController;
//# sourceMappingURL=todo.controller.js.map