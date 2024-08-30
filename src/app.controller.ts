import { Controller, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Req() req: Request, @Res() res: Response) {
    const data = await this.authService.login(req.user); // Must be "user" due to Passport setup

    res.cookie("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none", // Set to "strict" when in production
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res.send({
      token: data.accessToken,
      user: data.user, 
    });
  }
}
