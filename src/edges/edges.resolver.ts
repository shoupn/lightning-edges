import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { EdgesService } from './edges.service';
import { EdgeModel } from 'src/models/edge.model';
import { AddEdgeInput } from 'src/dto/edges.dto';
@Resolver('edges')
export class EdgesResolver {
  constructor(private readonly edgesService: EdgesService) {}

  @Query(() => [EdgeModel])
  async getEdges() {
    return await this.edgesService.getEdges();
  }

  @Query((type) => EdgeModel)
  async getEdge(@Args('id') id: number) {
    return await this.edgesService.getEdge(id);
  }

  @Mutation((type) => [EdgeModel])
  async createEdge(@Args('input') input: AddEdgeInput) {
    return await this.edgesService.createEdge(input);
  }
}