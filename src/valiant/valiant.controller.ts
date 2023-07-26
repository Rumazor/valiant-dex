import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ValiantService } from './valiant.service';
import { CreateValiantDto } from './dto/create-valiant.dto';
import { UpdateValiantDto } from './dto/update-valiant.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('valiant')
export class ValiantController {
  constructor(private readonly valiantService: ValiantService) {}

  @Post()
  create(@Body() createValiantDto: CreateValiantDto) {
    return this.valiantService.create(createValiantDto);
  }

  @Get()
  findAll() {
    return this.valiantService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.valiantService.findOne(term);
  }

  @Patch(':term')
  update(
    @Param('term') term: string,
    @Body() updateValiantDto: UpdateValiantDto,
  ) {
    return this.valiantService.update(term, updateValiantDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.valiantService.remove(id);
  }
}
