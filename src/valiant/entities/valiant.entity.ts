import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Valiant extends Document {
  //id: string  // mongo me lo crea solo
  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  @Prop({
    unique: true,
    index: true,
  })
  number: number;
}

export const ValiantSchema = SchemaFactory.createForClass(Valiant);
