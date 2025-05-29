import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../common/db/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async findOne(options: Partial<User>): Promise<User | null> {
    // Todo: findOne은 어떤 조건이 들어올지 몰라도 where절에 options를 통해 데이터를 조회해야 합니다.
    return this.userRepository.findOne({ where: options });
  }

  findAll(): Promise<User[]> {
    // Todo: findAll은 전체 데이터를 조회해야 합니다.
    return this.userRepository.find();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Todo: create은 유저 데이터를 생성해야 합니다.
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async countAll(): Promise<number> {
    // Todo: countAll은 전체 데이터의 개수를 조회해야 합니다.
    return this.userRepository.count();
  }

  async existsByUserId(userId: string): Promise<boolean> {
    // Todo: existsByUserId은 userId로 유저의 정보가 있는지 확인해야 합니다. 리턴은 boolean으로 해주세요.
    return this.userRepository.exists({ where: { userId } });
  }

  async update(
    userId: string,
    updateUserDto: Partial<CreateUserDto>
  ): Promise<User> {
    // Todo: update은 userId로 유저의 정보를 수정해야 합니다.
    const oldUser = await this.userRepository.findOne({ where: { userId } });
    if (!oldUser) {
      throw new Error('User not found');
    }

    await this.userRepository.update(oldUser.id, {
      email: updateUserDto.email,
    });

    const updatedUser = await this.userRepository.findOne({ where: { userId } });
    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser;
  }

  async delete(userId: string): Promise<void> {
    // Todo: delete은 userId로 유저의 정보를 삭제해야 합니다.
    await this.userRepository.delete({ userId });
  }
}
