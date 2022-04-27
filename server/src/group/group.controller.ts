import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';

import { GroupService } from './group.service';
import { GroupDTO } from './group.dto';
import { AuthGuard } from '../shared/auth.guard';

@Controller('group')
@UseGuards(new AuthGuard())
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get('/all')
  getAllGroups(@Req() req) {
    return this.groupService.getAllGroups();
  }

  @Post('/create')
  createGroup(
    @Req() req,
    @Body('name') name: Extract<GroupDTO, 'name'>,
  ) {
    return this.groupService.createGroup(name);
  }

  @Patch('/update')
  updateGroup(
    @Query('id') id: string,
    @Req() req,
    @Body() data: Partial<GroupDTO>,
  ) {
    const userId = req.user.id;
    return this.groupService.updateGroup(userId, id, data);
  }

  @Delete('/delete')
  deleteGroup(@Req() req, @Query('id') id: string) {
    const userId = req.user.id;
    return this.groupService.deleteGroup(userId, id);
  }
}
