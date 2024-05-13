import { Controller, Body, Post, Get, Put, Param, Query } from '@nestjs/common';
import { UpdateUserRo, UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { UserRo, UserEntity } from './entity/user.entity';

@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userEntity: UserEntity,
  ) {}

  @Post('/create')
  async create(@Body() userDto: UserDto): Promise<UserRo> {
    const createdUser = await this.userService.create(userDto);
    return await this.userEntity.response(createdUser);
  }

  @Get('/get')
  async get(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<UserRo[]> {
    return this.userEntity.collection(await this.userService.get(page, limit));
  }

  @Put('/update')
  async update(@Body() body: UpdateUserRo): Promise<UserRo> {
    const updateUser = await this.userService.update(body);
    return this.userEntity.response(updateUser);
  }
}
