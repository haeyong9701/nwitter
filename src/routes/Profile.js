import React, { useState } from "react";
import { authService } from "../fbase";
import { useHistory } from "react-router-dom";
import { updateProfile } from "@firebase/auth";

// import {
//   collection,
//   getDocs,
//   query,
//   where,
//   orderBy,
// } from "@firebase/firestore";
// import { dbService } from "fbase";

const Profile = ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateProfile(await authService.currentUser, {
      displayName: newDisplayName,
    });
    refreshUser();
  };

  //   const getMyNweets = async () => {
  //     const nweets = query(
  //       collection(dbService, "nweets"),
  //       where("creatorId", "==", userObj.uid),
  //       orderBy("createdAt")
  //     );
  //     const querySnapshot = await getDocs(nweets);
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc.id, " => ", doc.data());
  //     });
  //   };

  //   useEffect(() => {
  //     getMyNweets();
  //   }, []);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          placeholder='"Display Name'
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
