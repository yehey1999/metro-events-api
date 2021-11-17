import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { MetroService } from './metro.service';

@Controller('metro')
export class MetroController {
  constructor(private readonly metroService: MetroService){}

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    const user = await this.metroService.loginUser(loginUserDto);
    return user;
  }
  
  @Get('users')
  async getUsers() {
    const users = await this.metroService.getUsers();
    return users;
  }

  @Post('users')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.metroService.createUser(createUserDto);
    return user;
  }

  @Post('events')
  async createEvent(@Body() createEventDto: CreateEventDto) {
    const user = await this.metroService.createEvent(createEventDto);
    return user;
  }
  
}
