import { 
  Controller, 
  Post, 
  Get,
  Patch,
  Delete, 
  Body, 
  UseGuards, 
  Req,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { AuthGuard } from '../shared/auth.guard';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  login(@Body() data: UserDTO) {
    return this.userService.login(data);
  }

  @Post('register')
  register(@Body() data: UserDTO) {
    return this.userService.register(data);
  }

  @Get('profile')
  @UseGuards(new AuthGuard())
  getProfile(@Req() req) {
    const userEmail = req.user.email;
    return this.userService.getProfile(userEmail);
  }

  @Get('/user/all')
  @UseGuards(new AuthGuard())
  getAllUsers(@Req() req) {
    return this.userService.getAllUsers();
  }

  @Post('/user/create')
  @UseGuards(new AuthGuard())
  createUser(
    @Req() req,
    @Body('email') email: Extract<UserDTO, 'email'>,
  ) {
    return this.userService.createUser(email);
  }

  @Patch('/user/update')
  @UseGuards(new AuthGuard())
  updateUser(
    @Query('id') id: string,
    @Req() req,
    @Body() data: Partial<UserDTO>,
  ) {
    return this.userService.updateUser(id, data);
  }

  @Delete('/user/delete')
  @UseGuards(new AuthGuard())
  deleteUser(@Req() req, @Query('id') id: string) {
    const userId = req.user.id;
    return this.userService.deleteUser(userId, id);
  }
}
