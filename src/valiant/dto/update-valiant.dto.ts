import { PartialType } from '@nestjs/mapped-types';
import { CreateValiantDto } from './create-valiant.dto';

export class UpdateValiantDto extends PartialType(CreateValiantDto) {}
