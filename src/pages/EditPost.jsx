import React,{useEffect,useState} from 'react'
import { Container,PostForm } from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post,setPosts]=useState(null)
    // we  also needed slug here to edit post and slug is available from URL , so we use Useparams 
    // slug is basically an id  
    const {slug}=useParams();
    const navigate = useNavigate()


    useEffect(()=>{
        if(slug){
          // if we have slug then we will setpost , otherwise we will navigate the user
          // here we get single oost 
               appwriteService.getPost(slug).then((post)=>{
                if(post){
                  setPosts(post);
                }
               })
        }
        else{
          navigate('/')
        }
    },[slug,navigate])
  return (
    post? 
    (
      <div className='py-8'>
          <Container>
            <PostForm post={post}/>

          </Container>
      </div>
    )
    :
    null
  )
}

export default EditPost
