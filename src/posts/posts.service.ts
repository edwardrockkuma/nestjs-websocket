import { HttpException , HttpStatus , Injectable } from '@nestjs/common';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
import Post from './posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import PostEntity from "./posts.entity";
import { Repository, In } from 'typeorm';

@Injectable()
export default class PostsService {
    //private lastPostId = 0;
    //private posts: Post[] = [];
    
    constructor(
        @InjectRepository(Post)
        private postsRepository: Repository<PostEntity>
    ) {}

    getAllPosts() {
        return this.postsRepository.find();
    }

    async getPostById(id: number) {
        const post = await this.postsRepository.findOne({where:{id:id}});
        if (post) {
            return post;
        }
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    
    async updatePost(id: number, post: UpdatePostDto) {
        await this.postsRepository.update(id, post);
        
        const updatedPost = await this.postsRepository.findOne({where:{id:id}});
        if (updatedPost) {
            return updatedPost
        }
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    async createPost(post: CreatePostDto) {
        const newPost = await this.postsRepository.create(post);
        await this.postsRepository.save(newPost);
        return newPost;
    }

    async deletePost(id: number) {
        const deleteResponse = await this.postsRepository.delete(id);
        if (!deleteResponse.affected) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
    }
}
