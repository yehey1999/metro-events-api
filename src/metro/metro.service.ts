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

@Injectable()
export class MetroService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    @InjectRepository(Request)
    private requestsRepository: Repository<Request>,
  ) {}

  getUsers(): Promise<User[]> {
    return this.usersRepository.find({ relations: ["createdEvents"] });
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<User> {
    const { email, password } = loginUserDto;
    const user = await this.usersRepository.findOne({ where: { email }, relations: ["createdEvents", "events"] });
    if (user?.email === email && user?.password === password) {
      return user;
    }
    else {
      throw new BadRequestException('Credentials do not exists.');
    }
  }

  getUser(userId: number): Promise<User> {
    return  this.usersRepository.findOne({ where: { id: userId }, relations: ["createdEvents", "events"] });
  };

  async updateUser(userId: number, updateUser: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: userId }, relations: ["createdEvents", "events"] });
    const { type } = updateUser;
    user.type = type;
    return this.usersRepository.save(user);
  }

  getRequests(): Promise<Request[]> {
    return  this.requestsRepository.find({relations: ["sender", "event"] });
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
    request.event = eventToJoin;
    // eventToJoin.requests.push(request);
    return this.requestsRepository.save(request);
  }
  
  getAllEvents(): Promise<Event[]>  {
    return this.eventsRepository.find({ relations: ["createdBy", "participants", "requests"] });
  }

  getEvent(eventId: number): Promise<Event> {
    return  this.eventsRepository.findOne({ where: { id: eventId }, relations: ["createdBy", "participants"] });
  }

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    let { createdByUserId } = createEventDto;
    const user = await this.usersRepository.findOne(createdByUserId);
    delete createEventDto['createdByUserId'];
    const event = this.eventsRepository.create({ ...createEventDto });
    event.createdBy = user;
    return this.eventsRepository.save(event);
  }

}