import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from "@nestjs/common"
import { UserService } from "../application/user.service"
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
  UsersListResponseDto,
} from "./user.dto"
import { getPaginationOptions } from "../../../../core/src"

@Controller("api/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query() query: any): Promise<UsersListResponseDto> {
    const { limit, offset } = getPaginationOptions(query)
    const users = await this.userService.findAll(limit, offset)

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
    }
  }

  @Get(":id")
  async findById(@Param("id") id: string): Promise<UserResponseDto | null> {
    const user = await this.userService.findById(parseInt(id))
    if (!user) return null

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.userService.create({
      email: createUserDto.email,
      passwordHash: createUserDto.password,
      name: createUserDto.name,
      role: createUserDto.role,
    } as any)
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto | null> {
    const user = await this.userService.update(parseInt(id), updateUserDto)
    if (!user) return null

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<{ success: boolean }> {
    const success = await this.userService.delete(parseInt(id))
    return { success }
  }
}
