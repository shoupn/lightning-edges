import { Module } from '@nestjs/common';
import { EdgesService } from './edges.service';
import { EDGES } from 'src/mock/edges.mock';
import { Edge } from 'src/models/edge.model';
import { AddEdgeInput } from 'src/dto/edges.dto';
@Module({
  providers: [EdgesService]
})
export class EdgesModule {

}
