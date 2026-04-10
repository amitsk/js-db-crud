"use strict"
//# sourceMappingURL=user.service.js.map
Object.defineProperty(exports, "__esModule", { value: true })
exports.UserService = void 0
const tslib_1 = require("tslib")
const common_1 = require("@nestjs/common")
const user_repository_1 = require("../infrastructure/user.repository")
let UserService = class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }
  async findAll(limit, offset) {
    return this.userRepository.findAll(limit, offset)
  }
  async findById(id) {
    return this.userRepository.findById(id)
  }
  async findByEmail(email) {
    return this.userRepository.findByEmail(email)
  }
  async create(userData) {
    return this.userRepository.create(userData)
  }
  async update(id, userData) {
    return this.userRepository.update(id, userData)
  }
  async delete(id) {
    return this.userRepository.delete(id)
  }
}
exports.UserService = UserService
exports.UserService = UserService = tslib_1.__decorate(
  [
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [user_repository_1.UserRepository]),
  ],
  UserService,
)
