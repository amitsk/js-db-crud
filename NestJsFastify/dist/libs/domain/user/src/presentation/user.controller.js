import { __decorate, __param } from "tslib";
import { Controller, Get, Post, Put, Delete, Body, Param, Query, } from "@nestjs/common";
import { getPaginationOptions } from "../../../../core/src";
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async findAll(query) {
        const { limit, offset } = getPaginationOptions(query);
        const users = await this.userService.findAll(limit, offset);
        return {
            data: users.map((user) => ({
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            })),
            total: users.length, // In real app, you'd have a count query
            limit,
            offset,
        };
    }
    async findById(id) {
        const user = await this.userService.findById(parseInt(id));
        if (!user)
            return null;
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
    async create(createUserDto) {
        const user = await this.userService.create({
            email: createUserDto.email,
            passwordHash: createUserDto.password,
            name: createUserDto.name,
            role: createUserDto.role,
        });
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
    async update(id, updateUserDto) {
        const user = await this.userService.update(parseInt(id), updateUserDto);
        if (!user)
            return null;
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
    async delete(id) {
        const success = await this.userService.delete(parseInt(id));
        return { success };
    }
};
__decorate([
    Get(),
    __param(0, Query())
], UserController.prototype, "findAll", null);
__decorate([
    Get(":id"),
    __param(0, Param("id"))
], UserController.prototype, "findById", null);
__decorate([
    Post(),
    __param(0, Body())
], UserController.prototype, "create", null);
__decorate([
    Put(":id"),
    __param(0, Param("id")),
    __param(1, Body())
], UserController.prototype, "update", null);
__decorate([
    Delete(":id"),
    __param(0, Param("id"))
], UserController.prototype, "delete", null);
UserController = __decorate([
    Controller("api/users")
], UserController);
export { UserController };
//# sourceMappingURL=user.controller.js.map