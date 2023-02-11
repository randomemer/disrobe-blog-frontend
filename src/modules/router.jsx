import App from "@/App";
import { auth, currentUser } from "@/modules/firebase";
import Story from "@/routes/article";
import storyRouteLoader from "@/routes/article/loader";
import Auth from "@/routes/auth";
import ErrorDevelopmentPage from "@/routes/error-dev";
import Home from "@/routes/home";
import Settings from "@/routes/settings";
import Account from "@/routes/settings/account";
import settingsRouteLoader from "@/routes/settings/loader";
import Write from "@/routes/write";
import writeRouteLoader from "@/routes/write/loader";
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
    loader: async () => {
      console.log("from app");
      const start = Date.now();
      await currentUser;
      console.log("app load time : ", Date.now() - start);
    },
    element: <App />,
    children: [
      {
        index: true,
        element: withRouter(Home),
      },
      {
        path: "story/:id",
        element: <Story />,
        loader: storyRouteLoader,
      },
      {
        path: "story/:id/edit",
        element: <Write edit={true} />,
        loader: writeRouteLoader,
      },
      {
        path: "about",
        element: <></>,
      },
      {
        path: "auth",
        element: <Auth />,
        loader: ({ request }) => {
          if (/\/auth(\/)?$/gm.test(request.url)) {
            throw redirect("/auth/login");
          }
        },
        children: [
          {
            path: "login",
            element: <></>,
          },
          {
            path: "register",
            element: <></>,
          },
        ],
      },
      {
        path: "author/:id",
        element: <></>,
      },
      // private routes
      {
        path: "write",
        element: <Write />,
      },
      {
        path: "my-space",
        element: <></>,
        children: [
          {
            path: "stories",
            element: <></>,
          },
          {
            path: "stats",
            element: <></>,
          },
        ],
      },
      {
        path: "settings",
        element: <Settings />,
        loader: settingsRouteLoader,
        children: [
          {
            path: "account",
            element: <Account />,
          },
          {
            path: "notifications",
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
