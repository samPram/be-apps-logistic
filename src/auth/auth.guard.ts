import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      //   request to auth servicer over HTTP
      const { data } = await firstValueFrom(
        this.httpService
          .get(`${this.configService.get('app.auth_url')}/auth`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .pipe(
            catchError((err: AxiosError) => {
              throw new HttpException(err.message, err.response.status);
            }),
          ),
      );

      console.log(data);

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers

      // Remove sensitif data password

      request['user'] = data;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
