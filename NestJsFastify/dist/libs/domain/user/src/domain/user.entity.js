export class User {
    constructor(id, email, password, name, role, createdAt, updatedAt) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static fromDb(user) {
        return new User(user.id, user.email, user.passwordHash, user.name, user.role, user.createdAt, user.updatedAt);
    }
    toDb() {
        return {
            id: this.id,
            email: this.email,
            passwordHash: this.password,
            name: this.name,
            role: this.role,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
//# sourceMappingURL=user.entity.js.map