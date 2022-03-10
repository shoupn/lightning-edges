
import { Args, Mutation, Resolver, Query} from '@nestjs/graphql';
import { EdgesService } from './edges.service';
import { Edge } from 'src/models/edge.model';
import { AddEdgeInput } from 'src/dto/edges.dto';
@Resolver('edges')
export class EdgesResolver {
    constructor(
        private readonly edgesService: EdgesService
      ) {}

      @Query(() => [Edge])
      async getEdges() {
        return this.edgesService.getEdges();
      }

      @Query(type => Edge)
      async getEdge(
        @Args('id') id: number,
      ) {
        return this.edgesService.getEdge(id);
      }
    
      @Mutation(type => [Edge])
      async createEdge(
        @Args('input') input: AddEdgeInput,
      ) {
        return this.edgesService.createEdge(input);
      }

}
