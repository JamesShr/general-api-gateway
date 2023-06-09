import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { BetaService } from './beta.service';
import { OkInterceptor } from '@/modules/common/interceptors/ok.interceptor';
import { ApiTags } from "@nestjs/swagger";

@Controller('beta')
@ApiTags('beta')
@UseInterceptors(OkInterceptor)
export class BetaController {
  constructor(private readonly betaService: BetaService) {}
  @Get('/rpc')
  async getHello() {
    return this.betaService.rpcSend();
  }

  @Get('/rpc-async')
  async getHelloAsync() {
    return this.betaService.rpcSendAsync();
  }

  @Get('/publish-event')
  async publishEvent() {
    this.betaService.rpcEmit();
  }

  @Get('/mq')
  async sendMessageQueue() {
    this.betaService.mq();
  }
}
