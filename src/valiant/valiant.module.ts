import { Module } from '@nestjs/common';
import { ValiantService } from './valiant.service';
import { ValiantController } from './valiant.controller';
import { Valiant, ValiantSchema } from './entities/valiant.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [ValiantController],
  providers: [ValiantService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Valiant.name, schema: ValiantSchema }]),
  ],
  exports: [MongooseModule],
})
export class ValiantModule {}
