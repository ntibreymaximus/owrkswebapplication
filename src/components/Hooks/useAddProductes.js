import React ,{ useState ,useEffect} from "react";
import { useAuth } from "../../../contexts/AuthContext";
import {firestore,timestamp,AddArrayField} from '../../../firebase';
import AddFile from "./useAddFile";
import {storage} from '../../../firebase';



export default function AddProduct (data,setLoading,setProductId,userID){
    let error = ''
    let newdata = ''
    let progress ='';
    let loadingStatus =false;
    let id="";
  
   // const {newUrl } =AddFile(data.preview,'videos');

    let tutorId = userID
    
    
        //references
        const createdAt = timestamp();
        const product = firestore.collection('products')
            product.add({
            
                name: data.name,
                inStock: data.quatity,
                quantity: data.duration,
                price: data.price,
                sold: data.sold,
                leaseState:data.leaseState,
                supplierId:data.supplierId,
                supplier:data.supplier,
                transactions:[],
                createdAt
            }).then((docRef) => {
                id = docRef.id;
                product.doc(id).update({id})
    
                //this function adds the product id to the tutors products
                AddArrayField('tutors',"products",id,tutorId)
    
                console.log("Document written with ID: ", docRef.id);
                setLoading(false);
                setProductId(id);
            })
            .catch((err) => {
                error = err
                console.error("Error adding document: ", error);
            });
            
}

// export default AddProduct;