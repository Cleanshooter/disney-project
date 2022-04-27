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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const todo_entity_1 = require("../todo/todo.entity");
let UserEntity = class UserEntity {
    constructor() {
        this.hashPassword = async () => {
            this.password = await bcryptjs_1.hash(this.password, 8);
        };
        this.comparePassword = async (attempt) => {
            return await bcryptjs_1.compare(attempt, this.password);
        };
        this.sanitizeObject = (options) => {
            const { id, createdOn, email, token } = this;
            const responseObj = { id, createdOn, email };
            if (options === null || options === void 0 ? void 0 : options.withToken) {
                Object.assign(responseObj, { token });
            }
            return responseObj;
        };
    }
    get token() {
        const { id, email } = this;
        return jsonwebtoken_1.sign({
            id,
            email,
        }, process.env.SECRET, { expiresIn: '3d' });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        unique: true,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], UserEntity.prototype, "createdOn", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Object)
], UserEntity.prototype, "hashPassword", void 0);
__decorate([
    typeorm_1.OneToMany(type => todo_entity_1.TodoEntity, todo => todo.author),
    __metadata("design:type", Array)
], UserEntity.prototype, "todos", void 0);
UserEntity = __decorate([
    typeorm_1.Entity('user')
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map