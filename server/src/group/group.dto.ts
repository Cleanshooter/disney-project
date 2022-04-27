import { IsString, IsBoolean } from 'class-validator';

export class GroupDTO {
  @IsString()
  name: string;
}

export type GroupSO = {
  id: string;
  createdOn: Date;
  name: string;
};
