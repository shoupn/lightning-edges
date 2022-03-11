import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddEdgeInput } from '../dto/edges.dto';
import { Edge } from '../entities/edge.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class EdgesService {
  constructor(
    @InjectRepository(Edge) private edgeRepository: Repository<Edge>,
  ) {}

  async getEdges() {
    //TODO need to add a call to pg table to get all edges
    return await this.edgeRepository.find();
  }

  async getEdge(id: number) {
    //TODO make call to pg to get edge by id
    return await this.edgeRepository.findOne({ where: { id: id } });
  }

  async createEdge(input: AddEdgeInput): Promise<Edge[]> {
    const edge: Partial<Edge> = {
      node1Alias: input.node1Alias,
      node2Alias: input.node2Alias,
      createdAt: new Date(),
      updatedAt: new Date(),
      capacity: 10000,
    };

    await this.edgeRepository.insert(edge);
    return await this.getEdges();

    //TODO add to edges table in pg
    //send to rabbitmq
  }
}
