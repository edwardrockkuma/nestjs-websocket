import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Post from "../posts/posts.entity";
import User from "../users/user.entity";
import Message from "../chat/message.entity";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('POSTGRES_HOST'),
                port: configService.get('POSTGRES_PORT'),
                username: configService.get('POSTGRES_USER'),
                password: configService.get('POSTGRES_PASSWORD'),
                database: configService.get('POSTGRES_DB'),
                entities: [Post , User ,Message],
                // entities: [
                //     __dirname + '/../src/**/*.entity.ts',
                // ],
                synchronize: true, // true is auto-generate 
            })
        }),
    ],
})
export class DatabaseModule {}