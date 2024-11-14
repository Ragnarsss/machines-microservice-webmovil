import { Body, Controller, Param } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MachineMSG } from 'src/common/constants';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { MachinesService } from './machines.service';

@Controller('machines')
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  @MessagePattern(MachineMSG.CREATE)
  create(@Body() createMachineDto: CreateMachineDto) {
    return this.machinesService.create(createMachineDto);
  }

  @MessagePattern(MachineMSG.FIND_ALL)
  findAll() {
    return this.machinesService.findAll();
  }

  @MessagePattern(MachineMSG.FIND_ONE)
  findOne(@Param('id') id: string) {
    return this.machinesService.findOne(+id);
  }

  @MessagePattern(MachineMSG.UPDATE)
  update(@Param('id') id: string, @Body() updateMachineDto: UpdateMachineDto) {
    return this.machinesService.update(+id, updateMachineDto);
  }

  @MessagePattern(MachineMSG.DELETE)
  remove(@Param('id') id: string) {
    return this.machinesService.remove(+id);
  }
}
