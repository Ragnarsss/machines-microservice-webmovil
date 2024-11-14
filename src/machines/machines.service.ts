import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { Machine } from './entities/machine.entity';

@Injectable()
export class MachinesService {
  constructor(
    @InjectModel(Machine.name) private machineModel: Model<Machine>,
  ) {}
  create(createMachineDto: CreateMachineDto) {
    try {
      const machine = new this.machineModel(createMachineDto);
      return machine.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Machine already exists');
      }
      throw new InternalServerErrorException('Machine not created');
    }
  }

  findAll() {
    try {
      return this.machineModel.find();
    } catch (error) {
      throw new ConflictException('No machines found');
    }
  }

  findOne(id: number) {
    try {
      const machine = this.machineModel.findById(id);
      if (!machine) {
        throw new ConflictException('Machine not found');
      }
    } catch (error) {
      throw new InternalServerErrorException('Machine not found');
    }
  }

  update(id: number, updateMachineDto: UpdateMachineDto) {
    try {
      const machine = this.machineModel.findByIdAndUpdate(id, updateMachineDto);
      if (!machine) {
        throw new ConflictException('Machine not found');
      }
    } catch (error) {
      throw new InternalServerErrorException('Machine not found');
    }
  }

  remove(id: number) {
    try {
      const machine = this.machineModel.findByIdAndDelete(id);
      if (!machine) {
        throw new ConflictException('Machine not found');
      }
    } catch (error) {
      throw new InternalServerErrorException('Machine not found');
    }
  }
}
