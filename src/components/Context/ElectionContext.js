import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
const publicIp = require("public-ip");

const ElectionContext = React.createContext();

export function useElectionContext() {
  return useContext(ElectionContext);
}

export const ElectionContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [currentElection, setElection] = useState();
  const [voter, setVoter] = useState();
  const [voterName, setVoterName] = useState();
  const myhistory = useHistory();

  const getIP = async () => {
    const userIP = await publicIp.v4();
    console.log();
    //=> '46.5.21.123'
    setVoter(userIP);
    // console.log(await publicIp.v6());
    //=> 'fe80::200:f8ff:fe21:67cf'
  };

  const RedirectMe = () => {
    if (currentElection) {
      var path = "/election";

      myhistory.push(path);
    }
  };

  const RedirectMePro = () => {
    if (currentElection) {
      var path = "/portfolio";

      myhistory.push(path);
    }
  };

  const setCurrentElection = async (data) => {
    setLoading(true);
    setElection(data);
    setTimeout(() => {
      RedirectMe();
    }, 3000);

    setLoading(false);
  };
  const setCurrentVoter = async () => {
    setLoading(true);
    getIP();
    setTimeout(() => {
      RedirectMePro();
    }, 3000);

    //RedirectMe();
    setLoading(false);
  };
  const setCurrentVoterPro = (data, name) => {
    setVoter(data);
    setVoterName(name);
  };

  const setNewElection = (data) => {
    setElection(data);
  };

  const value = {
    currentElection,
    voterName,
    voter,
    setCurrentVoter,
    setCurrentVoterPro,
    setCurrentElection,
    setNewElection,
  };
  return (
    <ElectionContext.Provider value={value}>
      {!loading && children}
    </ElectionContext.Provider>
  );
};
