import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ObjectType()
export class Edge {
  @IsOptional()
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
