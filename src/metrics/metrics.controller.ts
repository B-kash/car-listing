import { Controller, Get, Res } from '@nestjs/common';
import { PrometheusController } from '@willsoto/nestjs-prometheus';
import { Response } from 'express';
import logger from 'src/commons/logger';

@Controller()
export class MetricsController extends PrometheusController {
  @Get()
  async index(@Res({ passthrough: true }) response: Response) {
    // We are only creating this rest controller if we need to do some stuffs on metrics endpoint
    logger.debug('In metrics logger');
    return super.index(response);
  }
}
