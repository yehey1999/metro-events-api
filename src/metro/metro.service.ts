import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class MetroService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
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
  
  getAllEvents(): Promise<Event[]>  {
    return this.eventsRepository.find({ relations: ["createdBy", "participants"] });
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