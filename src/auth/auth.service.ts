import { Injectable, NotFoundException } from '@nestjs/common';
import { DataQueryDto } from 'src/common/dto/data-query.dto/data-query.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { OrganisateurService } from 'src/organisateur/organisateur.service';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private organService: OrganisateurService,
        private jwtService: JwtService,
        private adminService: AdminService,
    ) { }
    private readonly Admin0 = [
        {
            id: 0,
            lastName: "SuperAdmin",
            firstName: "admin",
            mail: "superAdmin@gmail.com",
            pass: "SuperAdmin00",
            telephone: "0102538880"
        }]


    async resetPassword(body: DataQueryDto) {
        const { Pass, Mail } = body
        if (Mail == this.Admin0[0].mail) {

            this.Admin0[0].pass = Pass
        }
        else throw new NotFoundException(` #${this.Admin0[0].mail} not found`)
    }



    async validateSupAdmin(body: DataQueryDto): Promise<any> {
        const { Mail, Pass } = body
        if (Mail == this.Admin0[0].mail) {
            //const match = await bcrypt.compare(Pass, this.Admin0[0].pass);
            if (Pass == this.Admin0[0].pass) {
                const { pass, ...result } = this.Admin0[0];
                return result;
            }
            return null;

        }
    }

    async loginSupAdmin(body: DataQueryDto) {
        const User = await this.validateSupAdmin(body)
        if (User) {
            const payload = { username: User.mail, sub: User.id };

            return {
                access_token: this.jwtService.sign(payload), SuperAdmin: User
            };
        }
    }


    async validateUser(body: DataQueryDto): Promise<any> {
        const { Pass } = body
        const user = await this.userService.login(body);
        const match = await bcrypt.compare(Pass, user.pass);
        if (user.actif == "actif") {
            if (user && match) {
                const { pass, ...result } = user;
                return result;
            }
            return null;
        }
        else {
            throw new NotFoundException(`Sorry ${user.lastName} . your account is disable`)

        }
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

        if (organ.actif == "actif") {
            if (organ && match && organ.actif == "actif") {
                const { pass, ...result } = organ;
                return result;
            }
            return null;
        }
        else {
            throw new NotFoundException(`Sorry ${organ.name} . your account is disable`)

        }
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

    async validateAdmin(body: DataQueryDto): Promise<any> {
        const { Pass } = body
        const admin = await this.adminService.login(body);
        const match = await bcrypt.compare(Pass, admin.pass);

        if (admin && match) {
            const { pass, ...result } = admin;
            return result;
        }
        return null;

    }

    async loginAdmin(body: DataQueryDto) {
        const admin = await this.validateAdmin(body)
        if (admin) {
            const payload = { username: admin.mail, sub: admin.id };

            return {
                access_token: this.jwtService.sign(payload), admin: admin
            };
        }
    }
}

