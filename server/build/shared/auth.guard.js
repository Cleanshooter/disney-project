"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
let AuthGuard = class AuthGuard {
    constructor() {
        this.canActivate = async (context) => {
            const request = context.switchToHttp().getRequest();
            if (!request.headers.autorization)
                return false;
            request.user = await this.verifyToken(request.headers.autorization);
            return true;
        };
        this.verifyToken = async (auth) => {
            const authHeader = auth.split(' ');
            if (authHeader[0] !== 'Bearer') {
                throw new common_1.HttpException('Unauthorized token', common_1.HttpStatus.UNAUTHORIZED);
            }
            try {
                const token = authHeader[1];
                const decode = await jsonwebtoken_1.verify(token, process.env.SECRET);
                return decode;
            }
            catch (err) {
                const message = 'Token error: ' + (err.message || err.name);
                throw new common_1.HttpException(message, common_1.HttpStatus.UNAUTHORIZED);
            }
        };
    }
};
AuthGuard = __decorate([
    common_1.Injectable()
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map