import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MachineDocument = HydratedDocument<Machine>;

@Schema({
  timestamps: true,
  _id: true,
})
export class Machine {
  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  manufacturer: string;

  @Prop({ required: true })
  plaque: string;
}

export const MachineSchema = SchemaFactory.createForClass(Machine);
