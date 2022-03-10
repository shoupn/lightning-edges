import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class AddEdgeInput {
  @Field()
  @IsNotEmpty()
  node1Alias: string;

  @Field()
  @IsNotEmpty()
  node2Alias: string;
}