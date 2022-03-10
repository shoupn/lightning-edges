import { Injectable } from '@nestjs/common';
import { AddEdgeInput } from 'src/dto/edges.dto';
import { EDGES } from 'src/mock/edges.mock';
import { Edge } from 'src/models/edge.model';

@Injectable()
export class EdgesService {
    edges=EDGES;

    getEdges() {
      //TODO need to add a call to pg table to get all edges
      return this.edges;

    }
    
    getEdge(id: number) {
      //TODO make call to pg to get edge by id
      return this.edges.find(edge => edge.id === id);
    }
  
    async createEdge(input: AddEdgeInput): Promise<Edge[]> {
      const lastEdge = this.edges.slice(-1).pop();
      const edge: Edge = {
        id: lastEdge.id + 1,
        node1Alias: input.node1Alias,
        node2Alias: input.node2Alias,
        createdAt: new Date(),
        updatedAt: new Date(),
        capacity: 10000
      };
  
      //TODO add to edges table in pg
      //send to rabbitmq
      this.edges.push(edge);
      return this.edges;
    }
}
