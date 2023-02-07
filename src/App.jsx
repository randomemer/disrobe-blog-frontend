import "@/assets/styles/App.scss";
import AppHeader from "@/components/header";
import { auth } from "@/modules/firebase";
import reduxStore from "@/modules/redux-store";
import { fetchUserProfile } from "@/modules/redux-store/slices/user-data";
import "@/utils/modal-utils";
import { onAuthStateChanged } from "firebase/auth";
import { Fragment, useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function App() {
  const currentUserID = localStorage.getItem("firebase-uid");
  if (currentUserID) reduxStore.dispatch(fetchUserProfile(currentUserID));

  useEffect(() => {
    // setup listener for auth state changes
    onAuthStateChanged(auth, (user) => {
      const {
        user_profile: { value, status },
      } = reduxStore.getState();

      if (user && status === "idle" && value === null) {
        localStorage.setItem("firebase-uid", user.uid);
        reduxStore.dispatch(fetchUserProfile(user.uid));
      } else {
        localStorage.removeItem("firebase-uid");
        // TODO : also set null value in redux store

        // Logout of any private route
      }
    });
  }, []);

  return (
    <Fragment>
      <AppHeader />
      <div className="app-container">
        <Outlet />
      </div>
    </Fragment>
  );
}
