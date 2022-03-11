import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { Edge } from './entities/edge.entity';


import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { EdgesService } from './edges/edges.service';
import { EdgesResolver } from './edges/edges.resolver';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { EdgesRabbitMQModule } from './edges/edges.rabbitmq.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Edge]),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
    }),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'exchange1',
          type: 'topic',
        },
      ],
      uri: 'amqp://guest:guest@localhost:5672',
      channels: {
        'channel-1': {
          prefetchCount: 15,
          default: true,
        },
        'channel-2': {
          prefetchCount: 2,
        },
      },
    }),
    EdgesRabbitMQModule,
  ],
  controllers: [AppController],
  providers: [AppService, EdgesResolver, EdgesService],
})
export class AppModule {}
