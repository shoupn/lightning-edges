import { Module } from '@nestjs/common';
import { EdgesService } from './edges.service';
import { Edge } from '../entities/edge.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  providers: [EdgesService],
  imports:[
    TypeOrmModule.forFeature([Edge]),
  ],
})
export class EdgesModule {

}
