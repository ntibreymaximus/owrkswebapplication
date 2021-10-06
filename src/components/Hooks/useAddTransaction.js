import React ,{ useState ,useEffect} from "react";
import {arrayAdd, decreaseBy, firestore,increment,timestamp} from '../../firebase';
import { useAuth } from "../Context/AuthContext";
// import { useAuth } from "../../../contexts/AuthContext";
import Hashids from 'hashids'



  

    async function AddTransaction(data,userID){
    const hashids = new Hashids('',5)
    const longhashids = new Hashids('alphaStats',15)
    let error = ''
    let id="";
    let code="";
    
    
    
        //references
        const createdAt = timestamp();
     
        var sfDocRef = firestore.collection("PC").doc("--Counter--");
        const transactionsRef = firestore.collection('transaction')
        const admins = firestore.collection('admin').doc(userID);
        const users = firestore.collection('users').doc(data.userId.toString());
        const suppliers = firestore.collection('suppliers').doc(data.supplierId.toString());
        const products = firestore.collection('products').doc(data.productId.toString());
        const paymentRef = firestore.collection("payments");

        await firestore.runTransaction(async (transaction) => {
            var admin =  await transaction.get(admins);
            var user =  await transaction.get(users);
            var supplier =  await transaction.get(suppliers);
            var product =  await transaction.get(products);
            var EC =  await transaction.get(sfDocRef);
            
              if(!admin.exists){   
                        throw "Admin does not exist!";
                    }
              if(!supplier.exists){   
                        throw "Supplier does not exist!";
                    }
              if(!product.exists){   
                        throw "Product does not exist!";
                    }
              if(!user.exists){   
                        throw "User does not exist!";
                    }
              
                    
                    
                     

      var newCount = (EC.data().TransactionCount || 44576) + 1;
      // console.log(newCount)
      var paymentidnum = (EC.data().paymentCount || 44576) + 1;
      var paymentid = paymentidnum.toString()


      transaction.update(sfDocRef, { TransactionCount: newCount ,paymentCount:paymentidnum });
      transaction.set(transactionsRef.doc(id), {
        ...data,
        product: product.data().name,
        productId: product.data().id,
        supplier: supplier.data().name,
        supplierId: supplier.data().id,
        payments:arrayAdd.arrayUnion(paymentid),
        price : parseFloat(product.data().unitPrice * data.quantity).toFixed(2),
        amountPaid:parseFloat(data.amountPaid).toFixed(2),
        balance :parseFloat((product.data().unitPrice * data.quantity) - data.amountPaid).toFixed(2),
        createdAt,
        id,
        code,
      });
      transaction.set(paymentRef.doc(paymentid), {
        transactionId:id,
        product: product.data().name,
        productId: product.data().id,
        supplier: supplier.data().name,
        supplierId: supplier.data().id,
        amountPaid:parseFloat(data.amountPaid).toFixed(2),
        costumerId:user.data().id,
        createdAt,
        id:paymentid
       
      });
      return code;
      
      }).catch((err) => {
                    error = err;
                    console.error("Error adding Transaction: ", error);
                    return error;
                });
        


       
    return {error,code}

}

export default AddTransaction;