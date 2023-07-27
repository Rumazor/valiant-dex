import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ValiantService } from './valiant.service';
import { CreateValiantDto } from './dto/create-valiant.dto';
import { UpdateValiantDto } from './dto/update-valiant.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('valiant')
export class ValiantController {
  constructor(private readonly valiantService: ValiantService) {}

  @Post()
  create(@Body() createValiantDto: CreateValiantDto) {
    return this.valiantService.create(createValiantDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.valiantService.findAll(paginationDto);
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
