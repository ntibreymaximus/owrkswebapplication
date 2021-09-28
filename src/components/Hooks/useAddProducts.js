import React ,{ useState ,useEffect} from "react";
import {arrayAdd, firestore,increment,timestamp} from '../../firebase';
import { useAuth } from "../Context/AuthContext";
// import { useAuth } from "../../../contexts/AuthContext";
import Hashids from 'hashids'



async function AddProduct(data,img,userID){
    const hashids = new Hashids('',5)
    const longhashids = new Hashids('alphaStats',15)
    let error = ''
    let id="";
    let code="";
    
    
    
        //references
        const createdAt = timestamp();
     
        var sfDocRef = firestore.collection("PC").doc("--Counter--");
        const product = firestore.collection('products')
        const users = firestore.collection('users').doc(userID);
        // let promise = await admin.firestore().runTransaction(transaction => {
        //     var post = transaction.get(docRef);
        //     var anotherPost = transaction.get(anotherDocRef);
          
        //     if (post.exists && anotherPost.exists) {
        //       var newLikes = (post.data().likes || 0) + 1;
        //       await transaction.update(docRef, { likes: newLikes });
        //       newLikes = (anotherPost.data().likes || 0) + 1;
        //       await transaction.update(anotherdocRef, { likes: newLikes });
        //     }
        //   })
        await firestore.runTransaction(async (transaction) => {
            var ilect =  await transaction.get(users);
            var EC =  await transaction.get(sfDocRef);
            
              if(!ilect.exists){   
                        throw "User does not exist!";
                    }
                console.log(ilect.data())
                console.log(ilect.data().myProductsCount)
                var newProductCount = (ilect.data().myProductsCount || 0 ) +1;  
                // if (ilect.data().pro || newProductCount <= 3) {
                 
                
                    
                    
                        var newCount = EC.data().Count + 1;
                        console.log(newCount)

                        code=hashids.encode(newCount); 
                        id = longhashids.encode(newCount);    

                        transaction.update(sfDocRef, { Count: newCount });
                        transaction.set(product.doc(id), {
                            ...data,
                            img,
                            ended:false,
                            state:2,
                            quantity: parseInt(data.type),
                            inProgress:false,
                            transaction:[],
                            userId:userID,
                            createdAt,
                            id,
                            code
                        })
                        console.log(newCount)

                        transaction.update(users, {
                            myProductsCount: increment,
                            myProducts: arrayAdd.arrayUnion(id)
                        });

                    return code;

                

                // }else{
                //     error = "you have more than 3 Products and you are not pro"
                    
                //     throw error;
                // } 
            }).catch((err) => {
                    error = err;
                    console.error("Error adding Product: ", error);
                    return error;
                });
        


       
    return {error,code}

}

export default AddProduct;