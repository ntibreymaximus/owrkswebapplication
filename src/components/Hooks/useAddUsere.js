import React ,{ useState ,useEffect} from "react";
import {arrayAdd, firestore,increment,timestamp} from '../../firebase';
import { useAuth } from "../Context/AuthContext";
// import { useAuth } from "../../../contexts/AuthContext";

async function AddUser(data,userID){
    let error = ''
    let id="";
    let code="";
    
        //references
        const createdAt = timestamp();
     
        var sfDocRef = firestore.collection("PC").doc("--Counter--");
        const product = firestore.collection('users')
        // const supplier = firestore.collection('suppliers').doc(data.supplierId)
        const admins = firestore.collection('admin').doc(userID);
       
        await firestore.runTransaction(async (transaction) => {
            var admin =  await transaction.get(admins);
            var EC =  await transaction.get(sfDocRef);
            
              if(!admin.exists){   
                        throw "User does not exist!";
                    }
             
                    // if(!supplier.exists){   
                    //     throw "Supplier does not exist!";
                    // }
              
                    
                    
                        var newCount = ( EC.data().UserCount||45578 ) + 1;
                        console.log(newCount)

                        code=newCount; 
                        id = newCount.toString();       

                        transaction.update(sfDocRef, { UserCount: newCount });
                        transaction.set(product.doc(id), {
                            ...data,
                            createdAt,
                            id,
                            code
                        })
                        console.log(newCount)

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

export default AddUser;