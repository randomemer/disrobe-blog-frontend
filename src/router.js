import {
	createBrowserRouter,
	useLocation,
	useNavigate,
	useParams,
} from "react-router-dom";
import Article from "routes/article";
import Auth from "routes/auth";
import Settings from "routes/settings";
import Profile from "routes/settings/profile";
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
	{
		path: "/settings",
		element: withRouter(Settings),
		children: [
			{
				path: "/settings/profile",
				element: withRouter(Profile),
			},
			{
				path: "/settings/account",
				element: withRouter(Profile),
			},
			{
				path: "/settings/posts",
				element: withRouter(Profile),
			},
			{
				path: "/settings/notifications",
				element: withRouter(Profile),
			},
		],
	},
]);
