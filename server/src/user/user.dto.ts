import { IsEmail, MinLength } from 'class-validator';
import { GroupEntity } from '../group/group.entity';

export class UserDTO {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  groups: []
}

export type UserSO = {
  id: string;
  createdOn: Date;
  email: string;
  groups: GroupEntity[],
  token?: string;
};
