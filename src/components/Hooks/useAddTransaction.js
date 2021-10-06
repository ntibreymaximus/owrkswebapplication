import React ,{ useState ,useEffect} from "react";
import {arrayAdd, decreaseBy, firestore,increment,timestamp} from '../../firebase';
import { useAuth } from "../Context/AuthContext";
// import { useAuth } from "../../../contexts/AuthContext";
import Hashids from 'hashids'



<<<<<<< HEAD
  var sfDocRef = firestore.collection("PC").doc("--Counter--");
  const transactionsRef = firestore.collection("transactions");
  const paymentRef = firestore.collection("payments");
  const admins = firestore.collection("admin").doc(userID);
  const users = firestore.collection("users").doc(data.userId.toString());
  const suppliers = firestore
    .collection("suppliers")
    .doc(data.supplierId.toString());
  const products = firestore
    .collection("products")
    .doc(data.productId.toString());
=======
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
              
                    
                    
                        var newCount = ( EC.data().TransactionCount|| 44576) + 1;
                        // console.log(newCount)
>>>>>>> parent of ead132c (formatting update)

                        code=newCount; 
                        id = newCount.toString();       

                        transaction.update(sfDocRef, { transactionCount: newCount });
                        transaction.set(transactionsRef.doc(id), {
                            ...data,
                            product: product.data().name,
                            productId: product.data().id,
                            supplier : supplier.data().name,
                            supplierId : supplier.data().id,
                            createdBy:userID,
                            createdAt,
                            id,
                            code
                        })
                        console.log(newCount)

                        transaction.update(users, {
                            myTransactionsCount: increment,
                            myTransactions: arrayAdd.arrayUnion(id),
                            myProductsCount: increment,
                            myProducts: arrayAdd.arrayUnion(product.data().id),
                            
                        });
                        transaction.update(products, {
                            inStock: decreaseBy(data.quantity),
                            transactionsCount: increment,
                            transactions: arrayAdd.arrayUnion(id)
                        });
>>>>>>> parent of ead132c (formatting update)

                    return code;

      transaction.update(sfDocRef, { TransactionCount: newCount ,paymentCount:paymentidnum });
      transaction.set(transactionsRef.doc(id), {
        ...data,
        product: product.data().name,
        productId: product.data().id,
        supplier: supplier.data().name,
        supplierId: supplier.data().id,
        payments:arrayAdd.arrayUnion(paymentid),
        price : parseFloat(product.data().unitPrice * data.quantity),
        amountPaid:parseFloat(data.amountPaid),
        balance :parseFloat((product.data().unitPrice * data.quantity) - data.amountPaid),
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
        amountPaid:parseFloat(data.amountPaid),
        costumerId:user.data().id,
        createdAt,
        id:paymentid
       
      });
      // console.log(newCount);
=======
                
>>>>>>> parent of ead132c (formatting update)

                // }else{
                //     error = "you have more than 3 Transactions and you are not pro"
                    
                //     throw error;
                // } 
            }).catch((err) => {
                    error = err;
                    console.error("Error adding Transaction: ", error);
                    return error;
                });
        


       
    return {error,code}

}

export default AddTransaction;