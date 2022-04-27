import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupEntity } from './group.entity';
import { GroupDTO, GroupSO } from './group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private groupRepository: Repository<GroupEntity>,
  ) {}

  private responseOject = (group: GroupEntity): GroupSO => {
    return {
      ...group,
    };
  };


  getAllGroups = async (): Promise<GroupSO[]> => {
    const groups = await this.groupRepository.find({});
    return groups.map(group => {
      return this.responseOject(group);
    });
  };

  createGroup = async (name: string): Promise<GroupSO> => {
    console.log("name: ", name);
    let group = await this.groupRepository.findOne({ name });
    if (group) {
      throw new HttpException('Group already exists', HttpStatus.BAD_REQUEST);
    } else {
      group = await this.groupRepository.create({ name });
      await this.groupRepository.save(group);
      return this.responseOject(group);
    }
  };

  updateGroup = async (
    groupId: string,
    id: string,
    data: Partial<GroupDTO>,
  ): Promise<GroupSO> => {
    const group = await this.groupRepository.findOne({ id });
    if (!group) throw new HttpException('Item not found', HttpStatus.NOT_FOUND);

    if (data.name) {
      await this.groupRepository.update({ id }, { name: data.name });
    }

    return this.responseOject(group);
  };

  deleteGroup = async (groupId: string, id: string): Promise<GroupSO> => {
    const group = await this.groupRepository.findOne({ id });
    if (!group) throw new HttpException('Item not found', HttpStatus.NOT_FOUND);

    await this.groupRepository.remove(group);

    return this.responseOject(group);
  };
}
