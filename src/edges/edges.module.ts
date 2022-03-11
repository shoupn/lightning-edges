import { Module } from '@nestjs/common';
import { EdgesService } from './edges.service';
import { Edge } from 'src/models/edge.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  providers: [EdgesService],
  imports:[
    TypeOrmModule.forFeature([Edge]),
  ],
  exports:[TypeOrmModule, EdgesService]
})
export class EdgesModule {

}
