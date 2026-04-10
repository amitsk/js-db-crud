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
import { OrderService } from "../application/order.service"
import {
  CreateOrderDto,
  UpdateOrderDto,
  OrderResponseDto,
  OrdersListResponseDto,
} from "./order.dto"
import { getPaginationOptions } from "../../../../core/src"

@Controller("api/orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findAll(@Query() query: any): Promise<OrdersListResponseDto> {
    const { limit, offset } = getPaginationOptions(query)
    const orders = await this.orderService.findAll(limit, offset)

    return {
      data: orders.map((order) => ({
        id: order.id,
        userId: order.userId,
        totalAmount: order.totalAmount,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      })),
      total: orders.length,
      limit,
      offset,
    }
  }

  @Get(":id")
  async findById(@Param("id") id: string): Promise<OrderResponseDto | null> {
    const order = await this.orderService.findById(parseInt(id))
    if (!order) return null

    return {
      id: order.id,
      userId: order.userId,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }
  }

  @Post()
  async create(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<OrderResponseDto> {
    const order = await this.orderService.create({
      userId: createOrderDto.userId,
      totalAmount: createOrderDto.totalAmount.toString(),
    })
    return {
      id: order.id,
      userId: order.userId,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<OrderResponseDto | null> {
    const updateData: any = { ...updateOrderDto }
    if (updateOrderDto.totalAmount !== undefined) {
      updateData.totalAmount = updateOrderDto.totalAmount.toString()
    }

    const order = await this.orderService.update(parseInt(id), updateData)
    if (!order) return null

    return {
      id: order.id,
      userId: order.userId,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<{ success: boolean }> {
    const success = await this.orderService.delete(parseInt(id))
    return { success }
  }
}
