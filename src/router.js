import {
	createBrowserRouter,
	useLocation,
	useNavigate,
	useParams,
} from "react-router-dom";
import Article from "routes/article";
import Auth from "routes/auth";
import Write from "routes/write";

export function withRouter(Component) {
	function ComponentWithRouterProp(props) {
		let location = useLocation();
		let navigate = useNavigate();
		let params = useParams();
		return <Component {...props} router={{ location, navigate, params }} />;
	}

	return <ComponentWithRouterProp />;
}

export default createBrowserRouter([
	{
		path: "/",
		element: <div>Home under construction 🔨</div>,
	},
	{
		path: "/write",
		element: <Write />,
	},
	{
		path: "/article/:id",
		element: <Article />,
	},
	{
		path: "/auth/:type",
		element: withRouter(Auth),
	},
]);
