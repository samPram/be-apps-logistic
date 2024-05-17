import { Controller, Get, Param, Query } from '@nestjs/common';
import { LogisticService } from './logistic.service';
import { PaginationQueryDto } from 'src/common/dto/pagination.dto';

@Controller('logistic')
export class LogisticController {
  constructor(private readonly logisticService: LogisticService) {}

  @Get('courier-rate')
  async getCourier(@Query() query: any) {
    const { origin, destination } = query;
    return await this.logisticService.getCourierRoute(origin, destination);
  }

  @Get('courier/route')
  async getCourierRoute(@Query() query: PaginationQueryDto) {
    return await this.logisticService.getAllCourier(query);
  }
}
