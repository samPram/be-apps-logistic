import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LogisticService } from './logistic.service';
import { PaginationQueryDto } from 'src/common/dto/pagination.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ResponseTransformInterceptor } from 'src/common/interceptor/response.interceptor';
import {
  ApiBearerAuth,
  ApiHeaders,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SuccessResponse } from 'src/common/dto/success-response.dto';
import { ErrorResponse } from 'src/common/dto/error-response.dto';

@ApiTags('Logistic')
@UseGuards(AuthGuard)
@UseInterceptors(ResponseTransformInterceptor)
@Controller('logistic')
export class LogisticController {
  constructor(private readonly logisticService: LogisticService) {}

  /* Get all Courier-rate */
  @ApiResponse({
    status: 200,
    description: 'Success Get Courier Rate by origin and destination',
    type: SuccessResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Data not found',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorize',
    type: ErrorResponse,
  })
  @ApiBearerAuth()
  @ApiQuery({
    name: 'destination',
    type: String,
    description: 'Destination name',
  })
  @ApiQuery({
    name: 'origin',
    type: String,
    description: 'Origin name',
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      description: 'Bearer jwt token',
    },
  ])
  @Get('courier-rate')
  async getCourier(@Query() query: any) {
    const { origin, destination } = query;
    return await this.logisticService.getCourierRoute(origin, destination);
  }

  /* Get All Courier Data */
  @ApiResponse({
    status: 200,
    description: 'Success Get All Courier',
    type: SuccessResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorize',
    type: ErrorResponse,
  })
  @ApiBearerAuth()
  @ApiHeaders([
    {
      name: 'Authorization',
      description: 'Bearer jwt token',
    },
  ])
  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'Current page number',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    description: 'Limit data per page 1 - 100',
  })
  @ApiQuery({
    name: 'column',
    type: String,
    description: 'Column / field sorting',
  })
  @ApiQuery({
    name: 'sort',
    type: String,
    description: 'Sorting option DESC or ASC',
  })
  @ApiQuery({
    name: 'search',
    type: String,
    description: 'searching by logistic name',
  })
  @Get('courier/route')
  async getCourierRoute(@Query() query: PaginationQueryDto) {
    return await this.logisticService.getAllCourier(query);
  }
}
