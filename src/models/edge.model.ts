import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Edge {
  
  @Field(() => ID)
  id: number;

  @Field()
  updatedAt: Date;

  @Field()
  createdAt: Date;

  @Field()
  capacity: number;

  @Field()
  node1Alias: string;

  @Field()
  node2Alias: string;

}