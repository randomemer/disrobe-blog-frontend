import AppHeader from "components/header";
import SideBar from "components/sidebar";
import "./App.scss";

function App() {
	return (
		<>
			<AppHeader />
			<div id="app">
				<SideBar />
			</div>
		</>
	);
}

export default App;
