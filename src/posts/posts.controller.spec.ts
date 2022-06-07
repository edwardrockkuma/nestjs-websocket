import { Test } from "@nestjs/testing";
import PostsController  from '../posts/posts.controller';
import PostsService from "../posts/posts.service";
import Post from "./posts.entity";

describe("PostsController" , ()=>{
    let postsController: PostsController;
    let postsService:PostsService;
    const post1:Post = {id:1,content:'test' , title:'1'};
    const postArray:Post[] = [post1];
    
    beforeEach(async ()=>{
        const module = await Test.createTestingModule({
           controllers:[PostsController],
           providers:[
               {
                   provide: PostsService,
                   useValue:{
                       getAllPosts:jest.fn(()=> postArray ),
                       getPostById:jest.fn(()=> post1 )
                   }
               }
           ], 
        }).compile();

        postsService = module.get(PostsService);
        postsController = module.get(PostsController);
    });

    describe("getAll" , ()=>{
        it("should return an array of posts" , async ()=>{
            //jest.spyOn(postsService,"getAllPosts").mockReturnValue(Promise.resolve( result));
            
            expect(await postsController.getAllPosts()).toEqual(postArray);
        });
    });

    describe("getPostById" , ()=>{
        it("should return a post" , async ()=>{
            //jest.spyOn(postsService,"getPostById").mockReturnValue( Promise.resolve(result));

            expect(await postsController.getPostById('1')).toEqual(post1);
        });
    });
});