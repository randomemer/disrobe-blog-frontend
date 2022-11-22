import "@/assets/styles/App.scss";
import { auth } from "@/modules/firebase";
import reduxStore from "@/modules/redux-store";
import { fetchUserProfile } from "@/modules/redux-store/slices/user-data";
import router from "@/modules/router";
import { onAuthStateChanged } from "firebase/auth";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

function App() {
	const currentUserID = localStorage.getItem("firebase-uid");
	if (currentUserID) reduxStore.dispatch(fetchUserProfile(currentUserID));

	// setup listener for auth state changes
	onAuthStateChanged(auth, (user) => {
		if (user) {
			localStorage.setItem("firebase-uid", user.uid);
			reduxStore.dispatch(fetchUserProfile(user.uid));
		} else {
			localStorage.removeItem("firebase-uid");
			// TODO : also set null value in redux store

			// Logout of any private route
		}
	});

	return (
		<Provider store={reduxStore}>
			<RouterProvider router={router} />
		</Provider>
	);
}

export default App;
