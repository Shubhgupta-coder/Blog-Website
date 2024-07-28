import React from 'react'
import appwriteService from '../appwrite/config'
import {Link} from 'react-router-dom'

// since ye sb info hm appwrite se le rahe h aur waha pr id ko issi tarah access krte h
function PostCard({$id , title , featuredImage}) {
  return (
    // yaha pe hm generally ${id} ko iss tarh acces krte h props se but appwrite k through iska naam $id thata why hm aise likh rahe h 
   // ${$id}
   <Link to={`/post/${$id}`}>
          <div className='w-full bg-gray-100 rounded-xl p-4 '>
            <div className='w-full justify-center mb-4'>

{/* getfilepreview jo hmne appwrite m ek feature dia tha wo hme direct url deta h  to hmne usme featurediage daldi to hme image ka url mil jaaega . FeaturedImage m hamari id h */}
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl' />

            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
          </div>
   </Link>
  ) 
}

export default PostCard
