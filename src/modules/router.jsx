import App from "@/App";
import { db } from "@/modules/firebase";
import Story from "@/routes/article";
import Auth from "@/routes/auth";
import ErrorDevelopmentPage from "@/routes/error-dev";
import Home from "@/routes/home";
import Settings from "@/routes/settings";
import Account from "@/routes/settings/account";
import Write from "@/routes/write";
import { doc, getDoc } from "firebase/firestore";
import {
	createBrowserRouter,
	redirect,
	useLoaderData,
	useLocation,
	useNavigate,
	useParams,
} from "react-router-dom";

export default createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: withRouter(Home),
			},
			{
				path: "/story/:id",
				element: <Story />,
				loader: async ({ params }) => {
					const docRef = doc(db, "stories", params.id);
					const docSnapshot = await getDoc(docRef);
					const data = docSnapshot.data();

					// TODO : remove later after testing
					data.is_published = true;

					if (data === undefined || !data.is_published) {
						throw new Response("", {
							status: 404,
							statusText: "Story doesn't exist",
						});
					}

					return { story: data };
				},
			},
			{
				path: "/story/:id/edit",
				element: <Write edit={true} />,
				loader: async ({ params }) => {
					const docRef = doc(db, "stories", params.id);
					const docSnapshot = await getDoc(docRef);
					const data = docSnapshot.data();

					if (data === undefined) {
						throw new Response("", {
							status: 404,
							statusText: "Story doesn't exist",
						});
					}

					return { story: data };
				},
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
				loader: () => {
					// const history = useHis
					const uid = localStorage.getItem("firebase-uid");
					console.log(uid);
					if (!uid)
						throw redirect(
							`/auth/login?redirect=${encodeURIComponent("/settings")}`
						);
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
		errorElement:
			process.env.NODE_ENV === "development" ? <ErrorDevelopmentPage /> : null,
	},
]);

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

// http://localhost:3000/story/qCw1Qqs5A3ikIL023KXA
