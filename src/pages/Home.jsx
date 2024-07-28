import React,{useState,useEffect} from 'react'
import appwriteService from "../appwrite/config";
import { Container,PostCard } from '../components'

function Home() {

    const [posts,setPosts]=useState([])
    useEffect(()=>{
        appwriteService.getPosts().then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])
 
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (

        // Inside each div, there’s a PostCard component. The {...post} syntax spreads all the properties of the post object as props to the PostCard component. This means if post has properties like title, content, author, etc., they will be passed as individual props to PostCard.
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
