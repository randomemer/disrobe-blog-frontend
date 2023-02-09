import App from "@/App";
import { auth, currentUser, db } from "@/modules/firebase";
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
        loader: async ({ params }) => {
          const docRef = doc(db, "stories", params.id);
          const docSnapshot = await getDoc(docRef);
          const story = docSnapshot.data();

          // TODO : remove later after testing
          story.is_published = true;

          if (story === undefined || !story.is_published) {
            throw new Response("", {
              status: 404,
              statusText: "Story doesn't exist",
            });
          }

          const authorDocRef = doc(db, "authors", story.author);
          const authorDocSnap = await getDoc(authorDocRef);
          const author = authorDocSnap.data();

          return { story, author };
        },
      },
      {
        path: "story/:id/edit",
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

          if (data.author !== auth.currentUser.uid) {
            throw new Response("", {
              status: 401,
              statusText: "This is not your Story!",
            });
          }

          return { story: data };
        },
      },
      {
        path: "about",
        element: <></>,
      },
      {
        path: "auth",
        element: withRouter(Auth),
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
        loader: async ({ request }) => {
          await currentUser;

          if (auth.currentUser == null) {
            throw redirect(
              `/auth/login?redirect=${encodeURIComponent("/settings")}`
            );
          }

          if (/\/settings(\/)?$/gm.test(request.url)) {
            throw redirect("/settings/account");
          }
        },
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

// http://localhost:3000/story/qCw1Qqs5A3ikIL023KXA
