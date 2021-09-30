import React, { useState, useEffect } from "react";
import { arrayAdd, firestore, increment, timestamp } from "../../firebase";

import Hashids from "hashids";

async function SetLive(userID, currentProduct) {
  let error = "";
  let success = false;

  //references
  const createdAt = timestamp();

  // Create a reference to the SF doc.
  var MainCounters = firestore.collection("PC").doc("--Counter--");
  var product = firestore.collection("products").doc(currentProduct.id);
  const users = firestore.collection("users").doc(userID);

  await firestore
    .runTransaction(async (transaction) => {
      var user = await transaction.get(users);
      var ilect = await transaction.get(product);
      var EC = await transaction.get(MainCounters);

      if (!user.exists) {
        throw "User does not exist!";
      }
      if (!ilect.exists) {
        throw "product does not exist!";
      }
      if (ilect.data().userId !== userID) {
        throw "You are not admin for this product";
      }

      console.log(ilect.data());

      var newCount = (EC.data().liveProductCount || 0) + 1;

      transaction.update(MainCounters, { liveProductCount: newCount });

      transaction.update(product, {
        live: true,
      });
      success = true;
    })
    .then((success) => {
      console.log("Transaction successfully committed!");
      return success;
    })
    .catch((err) => {
      error = err;
      console.error("Error adding product: ", error);
      return error;
    });

  return { error, success };
}

export default SetLive;
