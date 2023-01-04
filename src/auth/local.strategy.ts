import { DataQueryDto } from 'src/common/dto/data-query.dto/data-query.dto';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(body: DataQueryDto): Promise<any> {
        const user = await this.authService.validateUser(body);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}