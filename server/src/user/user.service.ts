import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { UserEntity } from './user.entity';
import { GroupEntity } from '../group/group.entity';
import { UserDTO, UserSO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(GroupEntity)
    private groupRepository: Repository<GroupEntity>,
  ) {}

  login = async (data: UserDTO): Promise<UserSO> => {
    const { email, password } = data;
    const user = await this.userRepository.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user.sanitizeObject({ withToken: true });
  };

  register = async (data: UserDTO): Promise<UserSO> => {
    const { email } = data;
    let user = await this.userRepository.findOne({ email });
    if (user) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    } else {
      user = await this.userRepository.create(data);
      await this.userRepository.save(user);
      return user.sanitizeObject({ withToken: true });
    }
  };

  getProfile = async (email: string): Promise<any> => {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user)
      throw new HttpException('Email does not exists', HttpStatus.NOT_FOUND);
    return user.sanitizeObject({ withToken: true });
  };

  getAllUsers = async (): Promise<UserSO[]> => {
    const users = await this.userRepository.find({ relations: [ "groups" ]});
    return users.map(user => {
      return user.sanitizeObject({ withToken: false });
    });
  };

  createUser = async (data: UserDTO): Promise<UserSO> => {
    const { email } = data;
    let user = await this.userRepository.findOne({ email });
    if (user) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    } else {
      user = await this.userRepository.create(data);
      await this.userRepository.save(user);
      return user.sanitizeObject({ withToken: false });
    }
  };

  updateUser = async (
    id: string,
    data: Partial<UserDTO>,
  ): Promise<UserSO> => {
    console.log(data);
    let user = await this.userRepository.findOne({ id });
    if (!user) throw new HttpException('Item not found', HttpStatus.NOT_FOUND);

    if (data.email) {
      await this.userRepository.update({ id }, { email: data.email });
    }

    if (data.groups) {
      const groups = await this.groupRepository.find({
        where: {id: In(data.groups)}
      });
      console.log(groups);
      user.groups = groups;
      await this.userRepository.save({
        id: user.id,
        groups
      });
    }


    return user.sanitizeObject({ withToken: false });
  };

  deleteUser = async (userId: string, id: string): Promise<UserSO> => {
    if (userId === id) throw new HttpException('You can\'t delete yourself while logged in.', HttpStatus.BAD_REQUEST);
    
    const user = await this.userRepository.findOne({ id });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    await this.userRepository.remove(user);

    return user.sanitizeObject({ withToken: false });
  };
}
