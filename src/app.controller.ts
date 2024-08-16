import { Controller, HttpCode, Post, Request, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Request() req, @Res() res) {
    const accessToken = await this.authService.login(req.user); // Must be "user" due to Passport setup
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.send({ message: "Login successful" });
  }
}
