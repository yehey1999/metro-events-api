import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Request } from './entities/request.entity';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateRequestDto } from './dto/create-request-dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class MetroService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    @InjectRepository(Request)
    private requestsRepository: Repository<Request>,
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}
  
  async loginUser(loginUserDto: LoginUserDto): Promise<User> {
    const { email, password } = loginUserDto;
    const user = await this.usersRepository.findOne({ where: { email }, relations: ["createdEvents", "events", "sentRequests"] });
    // const user = await this.usersRepository.findOne({ where: { email } });
    if (user?.email === email && user?.password === password) {
      return user;
    }
    else {
      throw new BadRequestException('Credentials do not exists.');
    }
  }

  /////// users:start
  // 
  // create user
  // get all users
  // get user by id
  // update user
  // get user sent requests

  getUsers(): Promise<User[]> {
    return this.usersRepository.find({ relations: ["createdEvents", "sentRequests", "events"] });
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  getUser(userId: number): Promise<User> {
    return  this.usersRepository.findOne({ where: { id: userId }, relations: ["createdEvents", "events", "sentRequests"] });
  }

  async getUserSentRequests(userId: number): Promise<Request[]> {
    const user = await this.usersRepository.findOne({ where: { id: userId }, relations: ["sentRequests", "sentRequests.sender", "sentRequests.eventRequested"] });
    return user.sentRequests;
  }

  async getUserCreatedEvents(userId: number): Promise<Event[]> {
    const user = await this.usersRepository.findOne({ where: { id: userId }, relations: ["createdEvents", "createdEvents.requests", "createdEvents.requests.sender", "createdEvents.requests.eventRequested"] });
    return user.createdEvents;
  }

  async updateUser(userId: number, updateUser: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: userId }, relations: ["createdEvents", "events"] });
    const { type } = updateUser;
    user.type = type;
    return this.usersRepository.save(user);
  }
  /////// users:end


  /////// requests:start
  //
  // get all requests
  // create request (join event, request to admin/organizer)
  // update request (join event, request to admin/organizer)

  getRequests(): Promise<Request[]> {
    return  this.requestsRepository.find({relations: ["sender", "eventRequested"] });
  };

  async createJoinEventRequest(createRequestDto: CreateRequestDto): Promise<Request> {
    const { event, sender } = createRequestDto;
    const eventToJoin = await this.eventsRepository.findOne({ id: event });
    const senderUser = await this.usersRepository.findOne(sender);
    delete createRequestDto["event"];
    delete createRequestDto["sender"];
    const request = await this.requestsRepository.create({ 
      title: createRequestDto.title, 
      details: createRequestDto.details,
      type: createRequestDto.type
    });
    request.sender = senderUser;
    request.eventRequested = eventToJoin;
    return this.requestsRepository.save(request);
  }

  async createUpgradeAccountRequest(createUpgradeRequestDto: CreateRequestDto): Promise<Request> {
    const { sender } = createUpgradeRequestDto;
    const senderUser = await this.usersRepository.findOne(sender);
    const request = await this.requestsRepository.create({ 
      title: createUpgradeRequestDto.title, 
      details: createUpgradeRequestDto.details,
      type: createUpgradeRequestDto.type
    });
    request.sender = senderUser;
    return this.requestsRepository.save(request);
  }
  
  async updateRequest(id: number, updateRequestDto: UpdateRequestDto): Promise<Request> {
    const { type, status } = updateRequestDto;
    const request = await this.requestsRepository.findOne({where: { id: id }, relations: ['sender', 'eventRequested']});
    switch(type) {
      case 'join event':
        request.status = status;
        if (status === "accepted") {
          const eventToJoin = await this.eventsRepository.findOne({ where: { id: request.eventRequested.id }, relations: ['participants'] });
          const participant = await this.usersRepository.findOne({ id: request.sender.id });
          eventToJoin.participants.push(participant);
          await this.eventsRepository.save(eventToJoin);
        }
        break;
        case "request to organizer":
        case "request to admin":
          request.status = status;
          const user = await this.usersRepository.findOne({ id: request.sender.id });
          user.type = type === "request to organizer" ? "organizer" : "admin";
          await this.usersRepository.save(user);
          break; 
        default:
          break;
    } 
    return this.requestsRepository.save(request);
  }
  /////// requests:end
  

  /////// events:start
  //
  // get all events
  // get event information
  // get all request for specific event
  // create event
  // delete event

  getAllEvents(): Promise<Event[]>  {
    return this.eventsRepository.find({ relations: ["createdBy", "participants", "requests", "reviews"] });
  }

  getEvent(eventId: number): Promise<Event> {
    return  this.eventsRepository.findOne({ where: { id: eventId }, relations: ["createdBy", "participants", "requests", "requests.sender", "reviews"] });
  }

  async getEventRequests(eventId: number): Promise<Request[]> {
    const event = await this.eventsRepository.findOne({ where: { id: eventId }, relations: ["createdBy", "participants", "requests", "requests.sender"] });
    return event.requests;
  }

  async getEventParticipants(eventId: number): Promise<User[]> {
    const event = await this.eventsRepository.findOne({ where: { id: eventId }, relations: ["participants"] });
    return event.participants;
  }

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    let { createdByUserId } = createEventDto;
    const user = await this.usersRepository.findOne(createdByUserId);
    delete createEventDto['createdByUserId'];
    const event = this.eventsRepository.create({ ...createEventDto });
    event.createdBy = user;
    return this.eventsRepository.save(event);
  }

  async updateEvent(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    const { status } = updateEventDto;
    const event = await this.eventsRepository.findOne({where: { id: id }});
    event.status = status; 
    console.log(event);
    return this.eventsRepository.save(event);
  }

  async deleteEvent(eventId: number): Promise<Event> {
    const _event = this.eventsRepository.findOne({ id: eventId });
    await this.eventsRepository.delete({ id: eventId });
    return _event;
  }
  /////// events:end


  /////// review:start
  // 
  // get all event reviews
  // create event review
  async getEventReview(eventId: number): Promise<Review[]> {
    const event = await this.eventsRepository.findOne({ where: { id: eventId }, relations: ['reviews', 'reviews.user']});
    return event.reviews;
  }
  
  async createEventReview(eventId: number, createReviewDto: CreateReviewDto): Promise<Review> {
    const event = await this.eventsRepository.findOne({ id: eventId});
    const user = await this.usersRepository.findOne(createReviewDto.user);
    const review = this.reviewsRepository.create({
      comment: createReviewDto.comment,
    });
    review.event = event;
    review.user = user;
    return this.reviewsRepository.save(review);
  }
  /////// review:end 

}