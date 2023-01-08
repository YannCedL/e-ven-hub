import { Controller, Get, Post, Request, Patch, Param, Delete, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { DataQueryDto } from 'src/common/dto/data-query.dto/data-query.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/user')
    async loginUser(@Body() Body: DataQueryDto) {
        return this.authService.loginUser(Body)
    }

    @Post('/organisateur')
    async loginOrganisateur(@Body() Body: DataQueryDto) {
        return this.authService.loginOrgan(Body)
    }

    @Post('/admin')
    async loginAdmin(@Body() Body: DataQueryDto) {
        return this.authService.loginAdmin(Body)
    }
}
