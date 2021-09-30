import React, { useState, useEffect } from "react";
import { arrayAdd, firestore, increment, timestamp } from "../../firebase";
import { useAuth } from "../Context/AuthContext";
// import { useAuth } from "../../../contexts/AuthContext";

async function AddProduct(data, userID) {
  let error = "";
  let id = "";
  let code = "";

  //references
  const createdAt = timestamp();

  var sfDocRef = firestore.collection("PC").doc("--Counter--");
  const product = firestore.collection("products");
  const supplier = firestore.collection("suppliers").doc(data.supplierId);
  const admins = firestore.collection("admin").doc(userID);

  await firestore
    .runTransaction(async (transaction) => {
      var admin = await transaction.get(admins);
      var suppliers = await transaction.get(supplier);
      var EC = await transaction.get(sfDocRef);

      if (!admin.exists) {
        throw "User does not exist!";
      }

      if (!suppliers.exists) {
        throw "Supplier does not exist!";
      }

      var newCount = (EC.data().ProductCount || 45578) + 1;
      console.log(newCount);

      code = newCount;
      id = newCount.toString();

      transaction.update(sfDocRef, { ProductCount: newCount });
      transaction.set(product.doc(id), {
        ...data,
        supplier: suppliers.data().name,
        quantity: parseInt(data.quantity),
        inStock: parseInt(data.quantity),
        transaction: [],
        createdBy: userID,
        createdAt,
        id,
        code,
      });
      console.log(newCount);

      transaction.update(supplier, {
        myProductsCount: increment,
        myProducts: arrayAdd.arrayUnion(id),
      });

      return code;

      // }else{
      //     error = "you have more than 3 Products and you are not pro"

      //     throw error;
      // }
    })
    .catch((err) => {
      error = err;
      console.error("Error adding Product: ", error);
      return error;
    });

  return { error, code };
}

export default AddProduct;
