import {Body, Req, Controller, HttpCode, Post, UseGuards, Res, Get} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import RegisterDto from './dto/register.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import JwtAuthenticationGuard from "./jwt-authentication.guard";
import LogInDto from "./dto/login.dto";
import {ApiBody} from "@nestjs/swagger";
import {UsersService} from "../users/users.service";

@Controller("authentication")
export class AuthenticationController {
    constructor(
       private readonly authenticationService:AuthenticationService,
       private readonly usersService: UsersService,
    ) {}

    @Post('register')
    async register(@Body() registrationData: RegisterDto) {
        return this.authenticationService.register(registrationData);
    }

    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post('log-in')
    @ApiBody({ type: LogInDto })
    async logIn(@Req() request: RequestWithUser) {
        const { user } = request;
        const accessTokenCookie = this.authenticationService.getCookieWithJwtAccessToken(user.id);
        const {
            cookie: refreshTokenCookie,
            token: refreshToken
        } = this.authenticationService.getCookieWithJwtRefreshToken(user.id);

        await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

        request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);

        // if (user.isTwoFactorAuthenticationEnabled) {
        //     return;
        // }

        return user;
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('log-out')
    @HttpCode(200)
    async logOut(@Req() request: RequestWithUser) {
        request.res.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get()
    authenticate(@Req() request: RequestWithUser) {
        const user = request.user;
        user.password = undefined;
        return user;
    }
}