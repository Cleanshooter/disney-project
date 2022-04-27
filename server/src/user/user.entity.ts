import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  OneToMany,
  ManyToMany,
  JoinTable
} from 'typeorm';

import { GroupEntity } from '../group/group.entity';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { TodoEntity } from '../todo/todo.entity';
import { UserSO } from './user.dto';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @Column('text')
  password: string;

  @CreateDateColumn()
  createdOn: Date;

  @BeforeInsert()
  hashPassword = async () => {
    this.password = await hash(this.password, 8);
  };

  @OneToMany(
    type => TodoEntity,
    todo => todo.author,
  )
  todos: TodoEntity[];

  @ManyToMany(() => GroupEntity)
  @JoinTable()
  groups: GroupEntity[];

  comparePassword = async (attempt: string) => {
    return await compare(attempt, this.password);
  };

  sanitizeObject = (options?: SanitizeUserOptions): UserSO => {
    const { id, createdOn, email, groups, token } = this;
    const responseObj = { id, createdOn, email, groups };
    if (options?.withToken) {
      Object.assign(responseObj, { token });
    }
    return responseObj;
  };

  private get token() {
    const { id, email } = this;
    return sign(
      {
        id,
        email,
      },
      process.env.SECRET,
      { expiresIn: '3d' },
    );
  }
}

type SanitizeUserOptions = {
  withToken?: boolean;
};
