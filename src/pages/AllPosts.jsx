import React,{useState,useEffect} from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'

function AllPosts() {
    // iske andar hm saarui ki saari post lenge
    // getposts will gave us an array int   that array we got all our posts and we set our posts using setPost
    const [posts,setPosts]=useState([])
    useEffect(()=>{},[])
    // since app.getpost() except query from us but since we didnot have any query so we pass empty arrau
    // getpost will return us an array
    // here we get multiple post
    appwriteService.getPosts([]).then((posts)=>{
        if(posts){
           setPosts(posts.documents);
        }

    })
  return (
    <div className='w-full py-8'> 
      <Container>
        {/* hm yaha pr return nhi kre h isliye oparanthesis use kia h  */}
        <div className='flex flex-wrap'>
            {posts.map((post)=>( 
                <div key={post.$id} className="p-2 w-1/4">
                      <PostCard {...post} />
                </div>
            ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts
