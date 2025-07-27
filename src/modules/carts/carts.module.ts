import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        CartsController,],
    providers: [
        CartsService,],
})
export class CartsModule { }
