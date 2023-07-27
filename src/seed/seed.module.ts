import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ValiantModule } from 'src/valiant/valiant.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [ValiantModule],
})
export class SeedModule {}
