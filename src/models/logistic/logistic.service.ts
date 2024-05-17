import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { CourierEntity } from './entity/courier.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination.dto';
import { paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class LogisticService {
  constructor(
    @InjectRepository(CourierEntity)
    private courierRepository: Repository<CourierEntity>,
  ) {}

  /* Get Courier Rotue By origin and destination */
  async getCourierRoute(origin: string, destination: string) {
    return await this.courierRepository
      .findOne({
        where: {
          origin_name: origin,
          destination_name: destination,
        },
        select: {
          logistic_name: true,
          origin_name: true,
          destination_name: true,
          duration: true,
        },
      })
      .then((res) => res)
      .catch((err) => {
        throw new HttpException(
          'Internal server error!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  /* Get All Data Courier */
  async getAllCourier(query?: PaginationQueryDto) {
    const where_conds: FindOptionsWhere<CourierEntity> = {};
    if (query.search) {
      where_conds.logistic_name = ILike(`%${query.search}%`);
    }

    return await paginate(this.courierRepository, query, {
      where: where_conds,
      order: { [query.column]: query.column },
      transaction: true,
    })
      .then((res) => res)
      .catch((err) => {
        throw new HttpException(
          'Internal server error!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }
}
