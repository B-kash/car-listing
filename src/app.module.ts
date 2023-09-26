import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CarsModule } from './cars/cars.module';
import { ConfigModule } from '@nestjs/config';
import {
  METRICS_PLUGIN_KEY,
  MetricsModule,
  TRACING_PLUGIN_KEY,
} from './metrics/metrics.module';
import { ApolloServerPlugin } from '@apollo/server';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CarsModule,
    MetricsModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [MetricsModule],
      useFactory: (
        tracingPlugin: ApolloServerPlugin,
        metricsPlugin: ApolloServerPlugin,
      ) => ({
        autoSchemaFile: 'schema.gql',
        plugins: [tracingPlugin, metricsPlugin],
        introspection: true,
        playground: true,
      }),
      inject: [TRACING_PLUGIN_KEY, METRICS_PLUGIN_KEY],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
