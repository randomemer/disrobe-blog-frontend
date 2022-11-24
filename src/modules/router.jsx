import {
	createBrowserRouter,
	Outlet,
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
import Home from "@/routes/home";

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
		element: <Outlet />,
		children: [
			{
				index: true,
				element: withRouter(Home),
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
				loader: (p) => {
					console.log(p);
					const uid = localStorage.getItem("firebase-uid");
					if (!uid) throw redirect("/auth/login");
					// else throw redirect("/settings/account");
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
		],
	},
]);
