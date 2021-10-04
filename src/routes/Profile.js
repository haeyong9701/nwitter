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
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          onChange={onChange}
          placeholder='"Display Name'
          value={newDisplayName}
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />{" "}
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;
