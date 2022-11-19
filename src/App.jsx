// import AppHeader from "components/header";
// import SideBar from "components/sidebar";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./App.scss";

function App() {
	return <RouterProvider router={router} />;
}

export default App;
