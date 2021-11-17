import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { LoginUserDto } from './dto/login-user.dto';

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
    const user = await this.usersRepository.findOne({ where: { email }, relations: ["createdEvents"] });
    if (user?.email === email && user?.password === password) {
      return user;
    }
    else {
      throw new BadRequestException('Credentials do not exists.');
    }
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