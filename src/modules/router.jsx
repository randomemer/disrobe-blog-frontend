import {
	createBrowserRouter,
	redirect,
	useLoaderData,
	useLocation,
	useNavigate,
	useParams,
} from "react-router-dom";
import Article from "@/routes/article";
import Auth from "@/routes/auth";
import Settings from "@/routes/settings";
import Account from "@/routes/settings/account";
import Write from "@/routes/write";

export function withRouter(Component) {
	function ComponentWithRouterProp(props) {
		let location = useLocation();
		let navigate = useNavigate();
		let params = useParams();
		let loaderData = useLoaderData();
		return (
			<Component
				{...props}
				router={{ location, navigate, params, loaderData }}
			/>
		);
	}

	return <ComponentWithRouterProp />;
}

export default createBrowserRouter([
	// public routes
	{
		path: "/",
		element: <div>Home under construction 🔨</div>,
		// children: {},
	},
	{
		path: "/story/:id",
		element: <Article />,
	},
	{
		path: "/about",
		element: <></>,
	},
	{
		path: "/auth/:type",
		element: withRouter(Auth),
	},
	{
		path: "/author/:id",
		element: <></>,
	},
	// private routes
	{
		path: "/write",
		element: <Write />,
	},
	{
		path: "/my-space",
		element: <></>,
		children: [
			{
				path: "/my-space/stories",
				element: <></>,
			},
			{
				path: "/my-space/stats",
				element: <></>,
			},
		],
	},
	{
		path: "/settings",
		loader: async () => {
			const uid = localStorage.getItem("firebase-uid");
			if (!uid) throw redirect("/auth/login");
		},
		element: withRouter(Settings),
		children: [
			{
				path: "/settings/account",
				index: true,
				element: withRouter(Account),
			},
			{
				path: "/settings/notifications",
				element: withRouter(Account),
			},
		],
	},
]);
