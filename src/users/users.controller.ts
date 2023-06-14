import { Controller, Get, Req, Post, HttpCode, Header, Redirect, Param } from '@nestjs/common';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  @Post()
  create(): string {
    return 'This action adds a new user';
  }

  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all users';
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
