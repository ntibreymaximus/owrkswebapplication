import React ,{ useState ,useEffect} from "react";
import {arrayAdd, firestore,increment,timestamp} from '../../firebase';
import { useAuth } from "../Context/AuthContext";
// import { useAuth } from "../../../contexts/AuthContext";
import Hashids from 'hashids'



async function AddSupplier(data,userID){

    let error = ''
    let id="";
    let code="";
    
    
    
        //references
        const createdAt = timestamp();
     
        var sfDocRef = firestore.collection("PC").doc("--Counter--");
        const supplier = firestore.collection('suppliers')
        const users = firestore.collection('admin').doc(userID);
     
        await firestore.runTransaction(async (transaction) => {
            var ilect =  await transaction.get(users);
            var EC =  await transaction.get(sfDocRef);
            
              if(!ilect.exists){   
                        throw "Admin does not exist!";
                    }
               
                // if (ilect.data().pro || newSupplierCount <= 3) {
                 
                
                    
                    
                        var newCount = ( EC.data().SupplierCount||43578 ) + 1;
                        // console.log(newCount)
                        code=newCount; 
                        id = newCount.toString();       

                        transaction.update(sfDocRef, { SupplierCount: newCount });
                        transaction.set(supplier.doc(id), {
                            ...data,
                            products:[],
                            createdBy:userID,
                            createdAt,
                            id,
                            code
                        })
                        console.log(newCount)

                        transaction.update(users, {
                            mySuppliersCount: increment,
                            mySuppliers: arrayAdd.arrayUnion(id)
                        });

                    return code;

                

                // }else{
                //     error = "you have more than 3 Suppliers and you are not pro"
                    
                //     throw error;
                // } 
            }).catch((err) => {
                    error = err;
                    console.error("Error adding Supplier: ", error);
                    return error;
                });
        


       
    return {error,code}

}

export default AddSupplier;