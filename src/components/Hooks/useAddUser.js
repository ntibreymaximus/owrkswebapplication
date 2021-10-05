import React ,{ useState ,useEffect} from "react";
import {arrayAdd, firestore,increment,timestamp} from '../../firebase';




async function AddUser(data,userID){
    let error = ''
    let id;
    let success='';
    
    
        //references
        const createdAt = timestamp();
        
        // Create a reference to the SF doc.
        var MainCounters = firestore.collection("PC").doc("--Counter--");
        var usersRef = firestore.collection('users')
        var getAdmin = firestore.collection("admin").doc(userID);

        await firestore.runTransaction(async (transaction) => {

            var admin =  await transaction.get(getAdmin);
            var EC =  await transaction.get(MainCounters);
           
              if(!admin.exists){   
                        throw "Admin does not exist!";
                    }
                        var newCount = (EC.data().userCount || 46570) + 1;

                        id = newCount.toString();       

                        transaction.update(MainCounters, { userCount: newCount });
                        transaction.set(usersRef.doc(id),{  
                            ...data,
                            createdAt,
                            id,
                        })
                     success = id

                    return success;
 
            }).catch((err) => {
                    error = err;
                    console.error("Error adding User: ", error);
                    return error;
                });
        


       
    return {error,success}

}

export default AddUser;