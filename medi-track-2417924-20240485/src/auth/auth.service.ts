import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {


  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
    private readonly jwtService: JwtService
  ) { }
 

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ name: username });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
      username:  user.username,
    };
  }

  async register(createUserDto: CreateUserDto) {

    // Check if username already exists
    const existingUser = await this.userRepository.findOneBy({ name: createUserDto.name });
    if (existingUser) {
      throw new BadRequestException('Username is already taken');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);


    const newUser = {
      name: createUserDto.name,
      password: hashedPassword,
    };


    const user = new User({
      ...newUser
    });
    return this.entityManager.save(user);
  }
}
