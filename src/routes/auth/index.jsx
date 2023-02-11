import { auth, analytics, db } from "@/modules/firebase";
import { logEvent } from "firebase/analytics";
import { FirebaseError } from "firebase/app";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import {
  Link,
  matchPath,
  redirect,
  useLocation,
  useNavigate,
} from "react-router-dom";
import LoginForm from "./login";
import RegisterForm from "./register";
import "./style.scss";

function useActiveTab() {
  const location = useLocation();
  const match = matchPath("/auth/:type", location.pathname);

  useEffect(() => {}, [match]);

  return match.params.type;
}

const AUTH_TABS = ["login", "register"];

export default function Auth() {
  // state variables
  const [isLoading, setLoading] = useState(false);
  const activeTab = useActiveTab();

  // refs and other hooks
  const resizeObserverRef = useRef();
  const tabRef = useRef();
  const formRef = useRef();

  const navigate = useNavigate();

  // functions
  const switchTab = (tab) => {
    const timeline = gsap.timeline();

    const tabIndex = AUTH_TABS.findIndex((val) => val === tab);
    const observer = resizeObserverRef.current;

    const prevTab = tabRef.current;
    tabRef.current = document.querySelector(`.form-tab-content .${activeTab}`);

    // un-observe previously active form
    if (formRef.current) {
      observer.unobserve(formRef.current);
    }
    formRef.current = tabRef.current.querySelector("form");

    const tabLength = 100 / AUTH_TABS.length;
    gsap.to(".line", {
      ease: "expo.out",
      left: `${tabIndex * tabLength}%`,
    });

    // fade out active tab
    if (prevTab) {
      timeline.to(prevTab, {
        opacity: 0,
        duration: 0.05,
        onComplete: () => {
          // remove active class from all tabs
          prevTab.classList.remove("active-tab-content");
          // add active class to current tab
          tabRef.current.classList.add("active-tab-content");
        },
      });
    }

    // animate height of container
    timeline.to(".form-tab-content", {
      height: formRef.current.offsetHeight,
      onComplete: () => {
        // observer for the current form to animate height changes
        observer.observe(formRef.current);
      },
    });

    // fade in current tab
    timeline.to(tabRef.current, { opacity: 1, duration: 0.15 });
  };

  const loginUser = async (data, shouldRemember) => {
    setLoading(true);
    try {
      if (shouldRemember) {
        await setPersistence(auth, browserLocalPersistence);
      } else {
        await setPersistence(auth, browserSessionPersistence);
      }

      const result = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(result);
      logEvent(analytics, "login", {
        method: "email",
      });

      navigate("/settings/account");
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/too-many-requests":
            console.log(
              "You have exceeded the number of login attempts. Please reset your password or try again later."
            );
            break;
          case "auth/wrong-password":
            console.log("Your password in incorrect");
            break;
          default:
            break;
        }
      }
      console.error(error);
      console.log(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    }
    setLoading(false);
  };

  const registerUser = async (data) => {
    setLoading(true);
    try {
      console.log(data);
      // create new user
      const credentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      logEvent(analytics, "sign_up", {
        method: "email",
      });
      console.log(credentials);

      // add document to authors collection
      const docRef = doc(db, "authors", credentials.user.uid);
      await setDoc(docRef, {
        name: data.name,
      });

      redirect("/settings/account");
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error.code, error.name, error.message);
      }
      console.error(error);
    }
    setLoading(false);
  };

  // Component Mount
  useEffect(() => {
    resizeObserverRef.current = new ResizeObserver((entries) => {
      const form = formRef.current;
      const entry = entries.find((entry) => entry.target === form);
      if (!entry) return;
      // console.log(entry);
      gsap.to(".form-tab-content", {
        height: entry.borderBoxSize[0].blockSize,
        ease: "expo.out",
        duration: 0.3,
      });
    });

    switchTab(activeTab);

    // Component Unmount
    return () => {
      resizeObserverRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    switchTab(activeTab);
  }, [activeTab]);

  return (
    <div className="form-container">
      <ul className="form-tabs">
        <li>
          <Link to="/auth/login">Login</Link>
        </li>
        <li>
          <Link to="/auth/register">Register</Link>
        </li>
        <div className="line"></div>
      </ul>

      <ul className="form-tab-content">
        <li className="login active-tab-content">
          <LoginForm login={loginUser} loading={isLoading} />
        </li>
        <li className="register">
          <RegisterForm register={registerUser} loading={isLoading} />
        </li>
      </ul>
    </div>
  );
}
