import { Injectable } from '@nestjs/common';
import { DataQueryDto } from 'src/common/dto/data-query.dto/data-query.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { OrganisateurService } from 'src/organisateur/organisateur.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private organService: OrganisateurService,
        private jwtService: JwtService
    ) { }


    async validateUser(body: DataQueryDto): Promise<any> {
        const { Pass } = body
        const user = await this.userService.login(body);
        const match = await bcrypt.compare(Pass, user.pass);
        if (user && match) {
            const { pass, ...result } = user;
            return result;
        }
        return null;
    }

    async loginUser(user: DataQueryDto) {
        const User = await this.validateUser(user)
        if (User) {
            const payload = { username: User.mail, sub: User.id };

            return {
                access_token: this.jwtService.sign(payload), user: User
            };
        }
    }

    async validateOrgan(body: DataQueryDto): Promise<any> {
        const { Pass } = body
        const organ = await this.organService.login(body);
        const match = await bcrypt.compare(Pass, organ.pass);

        if (organ && match) {
            const { pass, ...result } = organ;
            return result;
        }
        return null;
    }

    async loginOrgan(organ: DataQueryDto) {
        const Organ = await this.validateOrgan(organ)
        if (Organ) {
            const payload = { username: Organ.mail, sub: Organ.id };

            return {
                access_token: this.jwtService.sign(payload), organisateur: Organ
            };
        }
    }
}

