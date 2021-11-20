import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateRequestDto } from './dto/create-request-dto';
import { MetroService } from './metro.service';
import { UpdateRequestDto } from './dto/update-request.dto';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('metro')
export class MetroController {
  constructor(private readonly metroService: MetroService){}

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    const user = await this.metroService.loginUser(loginUserDto);
    return user;
  }
  
  /////// users:start
  // 
  // create user
  // get all users
  // get user by id
  // update user
  // get user sent requests

  @Get('users')
  async getUsers() {
    const users = await this.metroService.getUsers();
    return users;
  }

  @Get('users/:id/requests')
  async getUserRequests(@Param('id') id) {
    const requests = await this.metroService.getUserSentRequests(id);
    return requests;
  }

  @Get('users/:id/created-events')
  async getUserCreatedEvents(@Param('id') id) {
    const requests = await this.metroService.getUserCreatedEvents(id);
    return requests;
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
  /////// users:end


  /////// requests:start
  //
  // get all requests
  // create request (join event, request to admin/organizer)
  // update request (join event, request to admin/organizer)

  @Get('requests')
  async getRequests() {
    const requests = await this.metroService.getRequests();
    return requests;
  }

  @Post('requests')
  async createRequest(@Body() createRequestDto: CreateRequestDto) {
    const { type } = createRequestDto;
    let request = null;
    switch (type) {
      case "join event":
        request = this.metroService.createJoinEventRequest(createRequestDto);
        break;
      case "request to organizer":
      case "request to admin":
        request = this.metroService.createUpgradeAccountRequest(createRequestDto);
        break; 
      default:
        break;
    }
    return request;
  }

  @Patch('requests/:id')
  async updateRequest(@Param('id') id, @Body() updateRequestDto: UpdateRequestDto) {
    const user = await this.metroService.updateRequest(id, updateRequestDto);
    return user;
  }
  /////// requests:end


  /////// events:start
  //
  // get all events
  // get event information
  // get all request for specific event
  // create event

  @Get('events')
  async getAllEvents() {
    const events = await this.metroService.getAllEvents();
    return events;
  }

  @Get('events/:id/requests')
  async getEventRequests(@Param('id') id) {
    const event = await this.metroService.getEventRequests(id);
    return event;
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
  
  @Delete('events/:id')  
  async deleteEvent(@Param('id') id) {
    const event = await this.metroService.deleteEvent(id);
    return event;
  }
  /////// events:end


  /////// review:start
  // 
  // get all event reviews
  // create event review
  @Get('reviews/events/:id')
  async getEventReviews(@Param('id') id) {
    const reviews = await this.metroService.getEventReview(id);
    return reviews;
  }

  @Post('reviews/events/:id')
  async createEventReview(@Param('id') id, @Body() createReviewDto: CreateReviewDto) {
    const review = await this.metroService.createEventReview(id, createReviewDto);
    return review;
  }
  /////// review:end 
  
}
