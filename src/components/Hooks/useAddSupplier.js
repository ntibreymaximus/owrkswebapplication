import React ,{ useState ,useEffect} from "react";
import {arrayAdd, firestore,increment,timestamp} from '../../firebase';
import { useAuth } from "../Context/AuthContext";
// import { useAuth } from "../../../contexts/AuthContext";
import Hashids from 'hashids'



async function AddSupplier(data,userID){
    const hashids = new Hashids('',5)
    const longhashids = new Hashids('alphaStats',15)
    let error = ''
    let id="";
    let code="";
    
    
    
        //references
        const createdAt = timestamp();
     
        var sfDocRef = firestore.collection("PC").doc("--Counter--");
        const supplier = firestore.collection('suppliers')
        const users = firestore.collection('users').doc(userID);
     
        await firestore.runTransaction(async (transaction) => {
            var ilect =  await transaction.get(users);
            var EC =  await transaction.get(sfDocRef);
            
              if(!ilect.exists){   
                        throw "User does not exist!";
                    }
                console.log(ilect.data())
                console.log(ilect.data().mySuppliersCount)
                var newSupplierCount = (ilect.data().mySuppliersCount || 0 ) +1;  
                // if (ilect.data().pro || newSupplierCount <= 3) {
                 
                
                    
                    
                        var newCount = ( EC.data().SupplierCount||0 ) + 1;
                        // console.log(newCount)

                        code=hashids.encode(newCount); 
                        id = longhashids.encode(newCount);    

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