// import AppHeader from "components/header";
// import SideBar from "components/sidebar";
import "@/assets/styles/App.scss";
import reduxStore from "@/modules/redux-store";
import router from "@/modules/router";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { fetchUserProfile } from "@/modules/redux-store/slices/user-data";
import { auth } from "@/modules/firebase";
import { onAuthStateChanged } from "firebase/auth";

new Promise((resolve) => {
	onAuthStateChanged(auth, (user) => {
		resolve(user);
	});
});

function App() {
	const unsubscribeAuthListener = onAuthStateChanged(auth, (user) => {
		if (user) {
			reduxStore.dispatch(fetchUserProfile());
		}
	});

	return (
		<Provider store={reduxStore}>
			<RouterProvider router={router} />
		</Provider>
	);
}

export default App;
