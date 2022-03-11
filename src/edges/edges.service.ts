import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddEdgeInput } from '../dto/edges.dto';
import { Edge } from '../entities/edge.entity';
import { Not, Repository } from 'typeorm';
import { AmqpConnection, Nack, RabbitRPC, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class EdgesService {
  constructor(
    @InjectRepository(Edge) private edgeRepository: Repository<Edge>,
    private readonly amqpConnection: AmqpConnection
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
    exchange: 'exchange1',
    routingKey: 'rpc-route',
    queue: 'rpc-queue',
  })
  public async pubSubHandler(msg: {}) {
    console.log(`Received message: ${JSON.stringify(msg)}`);
  }


  async createEdge(input: AddEdgeInput): Promise<Edge[]> {
    const edge: Partial<Edge> = {
      node1Alias: input.node1Alias,
      node2Alias: input.node2Alias,
      createdAt: new Date(),
      updatedAt: new Date(),
      capacity: 10000,
    };
    this.amqpConnection.publish('exchange1', 'rpc-route', { msg: edge });
    await this.edgeRepository.insert(edge);
    return await this.getEdges();

    //TODO add to edges table in pg
    //send to rabbitmq
  }
}
