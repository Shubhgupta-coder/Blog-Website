import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";
 
export class AuthService{
    // here we are making an new client
    client = new Client();
    // we declare only variable account here
    account;

    constructor()
    {
        // now whenever anyone create an object of AuthService  then our account is created and we hit end point through our client

        this.client
        .setEndpoint(conf.appwriteUrl)  
        .setProject(conf.appwriteProjectId);

        // yaha pr hamare client ka naya account ban gaya h              
        this.account=new Account(this.client)
    }

    async createAccount({email,password,name})
    {
        try{
            // here accountCreation is done
            //  it will return a promise
           //   create is a function of appwrite (documentation)
              const userAccount = await this.account.create(ID.unique(),email,password,name) ;

              if(userAccount){
                //    call another method
                // agar user ka account bana hua h toh direct logged in krlo
                return this.login({email,password})
              }
              else{
                return userAccount
              }
        }
        catch(error){
             throw error;
        }
    }

    async login({email,password}){

        try {
           return  await this.account. createEmailPasswordSession(email,password)
        } catch (error) {
            throw error
        }
    }

    // to check whether we are logged in or not
    // we can directly check it from account we made

    async getCurrentUser(){
          try{
            return await this.account.get();
          }
          catch(error){
            console.log("Appwrite service :: getCurrentUser :: error",error);   
          }
          return null ;
    } 

    // For log out

    async logout(){

            try {
                await this.account.deleteSessions();
            } catch (error) {
                console.log("Appwrite service :: logout:: error",error);   
            }
    }
}

// instead of directly eport this class we export this class by making an object of this class
const authservice = new AuthService()
export default authservice