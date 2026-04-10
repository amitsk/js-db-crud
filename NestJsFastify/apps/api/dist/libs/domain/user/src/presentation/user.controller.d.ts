import { UserService } from "../application/user.service"
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
  UsersListResponseDto,
} from "./user.dto"
export declare class UserController {
  private readonly userService
  constructor(userService: UserService)
  findAll(query: any): Promise<UsersListResponseDto>
  findById(id: string): Promise<UserResponseDto | null>
  create(createUserDto: CreateUserDto): Promise<UserResponseDto>
  update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto | null>
  delete(id: string): Promise<{
    success: boolean
  }>
}
