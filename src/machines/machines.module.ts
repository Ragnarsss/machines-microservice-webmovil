import { Module } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { MachinesController } from './machines.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Machine, MachineSchema } from './entities/machine.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Machine.name,
        schema: MachineSchema,
      },
    ]),
  ],
  controllers: [MachinesController],
  providers: [MachinesService],
})
export class MachinesModule {}
