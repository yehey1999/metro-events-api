import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateRequestDto } from './dto/create-request-dto';
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

  @Get('users/:id')
  async getUser(@Param('id') id) {
    const user = await this.metroService.getUser(id);
    return user;
  }

  @Post('users')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.metroService.createUser(createUserDto);
    return user;
  }

  @Patch('users/:id')
  async updateUser(@Param('id') id, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.metroService.updateUser(id, updateUserDto);
    return user;
  }

  @Get('requests')
  async getRequests() {
    const requests = await this.metroService.getRequests();
    return requests;
  }

  @Post('requests')
  async createRequest(createRequestDto: CreateRequestDto) {
    const { type, sender, event } = createRequestDto;
    switch (type) {
      case "join event":
        
        break;
      case "request to organizer":
        break;
      case "request to admin":
        break; 
      default:
        break;
    }
    // const requests = await this.metroService.createRequest();
  }

  @Get('events')
  async getAllEvents() {
    const events = await this.metroService.getAllEvents();
    return events;
  }

  @Get('events/:id')
  async getEvent(@Param('id') id) {
    const event = await this.metroService.getEvent(id);
    return event;
  }

  @Post('events')
  async createEvent(@Body() createEventDto: CreateEventDto) {
    const user = await this.metroService.createEvent(createEventDto);
    return user;
  }
  
}
