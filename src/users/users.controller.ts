import { Controller, Get, Post, Body, Param, Redirect } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): User {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Get('ab*cd')
  findAllWithWildcard(): string {
    return 'This route uses a wildcard';
  }

  @Get('redirect')
  @Redirect('https://nestjs.com', 301)
  redirect() {
    return 'This route will redirect to https://nestjs.com';
  }

  @Get(':id')
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} user`;
  }
}
