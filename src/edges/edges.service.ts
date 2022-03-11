import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddEdgeInput } from '../dto/edges.dto';
import { Edge } from '../entities/edge.entity';
import { Not, Repository } from 'typeorm';
import {
  AmqpConnection,
  Nack,
  RabbitRPC,
  RabbitSubscribe,
} from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class EdgesService {
  constructor(
    @InjectRepository(Edge) private edgeRepository: Repository<Edge>,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  async getEdges() {
    //TODO need to add a call to pg table to get all edges
    return await this.edgeRepository.find();
  }

  async getEdge(id: number) {
    //TODO make call to pg to get edge by id
    return await this.edgeRepository.findOne({ where: { id: id } });
  }

  @RabbitSubscribe({
    exchange: 'edges-exchange',
    routingKey: 'edges-route',
    queue: 'rpc-queue',
  })
  public async pubSubHandler(msg: any) {
    await this.edgeRepository.save({
      id: msg.edge.id,
      node1Alias: `${msg.edge.node1Alias}-updated`,
      node2Alias: `${msg.edge.node2Alias}-updated`,
    });

    console.log(`New channel between ${msg.edge.node1Alias} and
    ${msg.edge.node2Alias}  with a capacity of ${msg.edge.capacity} has been created.`);
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
    this.amqpConnection.publish('edges-exchange', 'edges-route', {
      edge: edge,
    });
    return await this.getEdges();
  }
}
