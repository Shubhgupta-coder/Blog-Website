import conf from '../conf/conf.js'
import { Client, Account, ID , Databases , Storage, Query } from "appwrite";

export class Service{
   client = new Client();
   databases;
   bucket ;

   constructor()
   {
       this.client 
       .setEndpoint(conf.appwriteUrl)  
       .setProject(conf.appwriteProjectId)

       this.databases = new Databases(this.client); 
       this.bucket    = new Storage(this.client);         
    } 

    // yaha pr featured image m hm file ki id hi pass krenge
    async  createPost({title,slug,content,featuredImage,status,userId}){
         try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,  //here we take slug as our document id
                // this object contain any further info which we want
                {
                    title,
                    content,
                    featuredImage ,
                    status,
                    userId
                }
            )
         } catch (error) { 
            console.log("Appwrite service :: createPost :: error",error);   
         }
    }

    // yaha pr jis post ko hme update krna h hme us post koi id chaiye yaha pr hmne id ->slug ko derakhi h to islie hmne slug ko object se bahar rakha h  (for easy access)

    async updatePost(slug,{title,content,featuredImage,status}){
          try {
                return await this.databases.updateDocument(
                    conf.appwriteDatabaseId,  //database_id
                    conf.appwriteCollectionId, //collection_id
                    slug,                       //document_id       
                    {
                        title,
                        content,
                        featuredImage,
                        status
                    }
                )
          } catch (error) {
            console.log("Appwrite service :: updatePost :: error",error);   
          }
    }
    
    // No need to return in deletePost . We  can simply return true or false in deletePost .... .... .... .... .... .... .... .... .... .... .... .... .... .... .... ...

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite service ::deletePost :: error",error);   
            return false;
        }
    }

    // Here we get a single post
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug    
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error",error);   
            return false;
        }
    }

    // here we get all posts
    // yaha pr mujhe wo saari post chaiye jinke andar status active hona chaiye
    // Here we use query wala syntax which is given in query part of appwriyte document
    // Here queries is just a variable name and in this we are passing array
    // yaha pr hme status active chaiye
    async getPosts(queries=[Query.equal("status","active")]){
          try {
              return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
              )
          } catch (error) {
            console.log("Appwrite service :: getPosts :: error",error);   
            return false;
          }
    }

    // File Upload Services
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error",error);   
            return false;
        }
    }

    // Delete file
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error",error);   
            return false;
        }
    }

    // getFilePreview(fileId){
    //     return this.bucket.getFilePreview(
    //         conf.appwriteBucketId,
    //         fileId
    //     )
    // }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service  = new Service();
export default service;