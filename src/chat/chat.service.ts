import { Injectable } from '@nestjs/common';
import { AuthenticationService } from '../authentication/authentication.service';
import { Socket } from 'socket.io';
import { parse } from 'cookie';
import { WsException } from '@nestjs/websockets';
import { InjectRepository } from '@nestjs/typeorm';
import Message from './message.entity';
import User from '../users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
    constructor(
        private readonly authenticationService: AuthenticationService,
        @InjectRepository(Message)
        private messageRepository: Repository<Message>,
    ) {}
    
    async saveMessage(content: string , author: User){
        const message = await this.messageRepository.create({
            content,
            author
        });
        
        await this.messageRepository.save(message);
        return message;
    }
    
    async getAllMessages(){
        return this.messageRepository.find({
            relations: ['author']
        });
    }
    
    async getUserFromSocket(socket: Socket){
        const cookie = socket.handshake.headers.cookie;
        const { Authentication: authenticationToken } = parse(cookie);
        const user = await this.authenticationService.getUserFromAuthenticationToken(authenticationToken);
        
        if(!user){
            throw new WsException('Invalid authenticationToken!');
        }
        
        return user;
    }
}