import { Module } from '@nestjs/common';
import { ValiantService } from './valiant.service';
import { ValiantController } from './valiant.controller';
import { Valiant, ValiantSchema } from './entities/valiant.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [ValiantController],
  providers: [ValiantService],
  imports: [
    MongooseModule.forFeature([{ name: Valiant.name, schema: ValiantSchema }]),
  ],
})
export class ValiantModule {}
