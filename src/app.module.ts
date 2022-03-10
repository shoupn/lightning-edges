import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EdgesResolver } from './edges/edges.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { EdgesModule } from './edges/edges.module';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { EdgesService } from './edges/edges.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
    }),
    EdgesModule,
    EdgesService
  ],
  controllers: [AppController],
  providers: [AppService, EdgesResolver, EdgesService],
})
export class AppModule {}
