import React, { useState, useEffect } from "react";
import {
  arrayAdd,
  decreaseBy,
  firestore,
  increaseBy,
  increment,
  timestamp,
} from "../../firebase";
import { useAuth } from "../Context/AuthContext";
// import { useAuth } from "../../../contexts/AuthContext";
import Hashids from "hashids";

async function AddPayment(data, userID) {
  const hashids = new Hashids("", 5);
  const longhashids = new Hashids("alphaStats", 15);
  let error = "";
  let id = "";
  let code = "";

  //references
  const createdAt = timestamp();

  var sfDocRef = firestore.collection("PC").doc("--Counter--");
  const transactionsRef = firestore.collection("transactions").doc(data.id);
  const paymentRef = firestore.collection("payments");
  const admins = firestore.collection("admin").doc(userID);
  const users = firestore.collection("users").doc(data.userId.toString());
  const suppliers = firestore
    .collection("suppliers")
    .doc(data.supplierId.toString());
  const products = firestore
    .collection("products")
    .doc(data.productId.toString());

  await firestore
    .runTransaction(async (transaction) => {
      var admin = await transaction.get(admins);
      var user = await transaction.get(users);
      var supplier = await transaction.get(suppliers);
      var product = await transaction.get(products);
      var EC = await transaction.get(sfDocRef);

      if (!admin.exists) {
        throw "Admin does not exist!";
      }
      if (!supplier.exists) {
        throw "Supplier does not exist!";
      }
      if (!product.exists) {
        throw "Product does not exist!";
      }
      if (!user.exists) {
        throw "User does not exist!";
      }

      var newCount = (EC.data().paymentCount || 10000) + 1;
      // console.log(newCount)
  

      code = newCount;
      id = newCount.toString();

      transaction.update(sfDocRef, { paymentCount: newCount});
     
      transaction.update(transactionsRef, {
     
        payments:arrayAdd.arrayUnion(id),
        amountPaid:increaseBy(data.amount),
        balance :decreaseBy(data.amount),
        lastUpdatedAt: createdAt,
      });
      transaction.set(paymentRef.doc(id), {
        product: product.data().name,
        transactionId:data.id,
        productId: product.data().id,
        supplier: supplier.data().name,
        supplierId: supplier.data().id,
        amountPaid:parseFloat(data.amount).toFixed(2),
        costumerId:user.data().id,
        createdAt,
        id
       
      });
      // console.log(newCount);

      transaction.update(users, {
        myPaymentsCount: increment,
        myPayments: arrayAdd.arrayUnion(id),
      
      });
    

      return code;

      // }else{
      //     error = "you have more than 3 Payments and you are not pro"

      //     throw error;
      // }
    })
    .catch((err) => {
      error = err;
      console.error("Error adding Payment: ", error);
      return error;
    });

  return { error, code };
}

export default AddPayment;
