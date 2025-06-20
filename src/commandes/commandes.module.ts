import { Module } from '@nestjs/common';
import { CommandesService } from './commandes.service';
import { CommandesController } from './commandes.controller';
import { PrismaService } from '../config/prisma.service';
import { MenuModule } from '../menu/menu.module';

@Module({
  imports: [MenuModule],
  controllers: [CommandesController],
  providers: [CommandesService, PrismaService],
  exports: [CommandesService],
})
export class CommandesModule {}
