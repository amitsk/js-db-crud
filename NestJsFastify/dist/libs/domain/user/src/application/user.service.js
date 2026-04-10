import { __decorate } from "tslib";
import { Injectable } from "@nestjs/common";
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findAll(limit, offset) {
        return this.userRepository.findAll(limit, offset);
    }
    async findById(id) {
        return this.userRepository.findById(id);
    }
    async findByEmail(email) {
        return this.userRepository.findByEmail(email);
    }
    async create(userData) {
        return this.userRepository.create(userData);
    }
    async update(id, userData) {
        return this.userRepository.update(id, userData);
    }
    async delete(id) {
        return this.userRepository.delete(id);
    }
};
UserService = __decorate([
    Injectable()
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map