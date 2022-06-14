import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import {ConfigModule} from "@nestjs/config";
import * as Joi from "@hapi/joi";
import {DatabaseModule} from "./database/database.module";
import {AuthenticationModule} from "./authentication/authentication.module";
import {UsersModule} from "./users/users.module";
import {ChatModule} from "./chat/chat.module";

@Module({
  imports: [
      ConfigModule.forRoot({
        validationSchema: Joi.object({
            POSTGRES_HOST: Joi.string().required(),
            POSTGRES_PORT: Joi.number().required(),
            POSTGRES_USER: Joi.string().required(),
            POSTGRES_PASSWORD: Joi.string().required(),
            POSTGRES_DB: Joi.string().required(),
            PORT: Joi.number(), 
            JWT_SECRET: Joi.string().required(),
            JWT_EXPIRATION_TIME: Joi.string().required(),
        })
      }),
      DatabaseModule,
      PostsModule , AuthenticationModule , UsersModule , ChatModule ,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
