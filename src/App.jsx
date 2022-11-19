// import AppHeader from "components/header";
// import SideBar from "components/sidebar";
import "@/assets/styles/App.scss";
import reduxStore from "@/modules/redux-store";
import router from "@/modules/router";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

function App() {
	return (
		<Provider store={reduxStore}>
			<RouterProvider router={router} />
		</Provider>
	);
}

export default App;
