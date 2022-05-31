import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import PostsService from './posts.service';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
 
@Controller("posts")
export default class PostsController {
    constructor(
        private readonly postsService:PostsService
    ) {}

    @Get()
    getAllPosts(){
        return this.postsService.getAllPosts();
    }
    
}

