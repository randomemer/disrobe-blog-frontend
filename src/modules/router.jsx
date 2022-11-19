import { auth, db } from "@/modules/firebase";
import { doc, getDoc } from "firebase/firestore";
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
import Profile from "@/routes/settings/profile";
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

async function privateRouteLoader() {
	const user = auth.currentUser;
	if (!user) throw redirect("/auth/login");

	const userDoc = await getDoc(doc(db, "authors", user.uid));
	console.log(userDoc);

	return { userDoc };
}

export default createBrowserRouter([
	// public routes
	{
		path: "/",
		element: <div>Home under construction 🔨</div>,
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
			const user = auth.currentUser;
			if (!user) throw redirect("/auth/login");

			const userDoc = await getDoc(doc(db, "authors", user.uid));
			console.log(userDoc);

			return { userDoc };
		},
		element: withRouter(Settings),
		children: [
			{
				path: "/settings/account",
				element: withRouter(Profile),
			},
			{
				path: "/settings/notifications",
				element: withRouter(Profile),
			},
		],
	},
]);
