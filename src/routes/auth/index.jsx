import { db } from "@/modules/firebase";
import { FirebaseError } from "firebase/app";
import {
	browserLocalPersistence,
	browserSessionPersistence,
	createUserWithEmailAndPassword,
	getAuth,
	setPersistence,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import gsap from "gsap";
import { Component } from "react";
import { Link, redirect } from "react-router-dom";
import LoginForm from "./login";
import RegisterForm from "./register";
import "./style.scss";
// import { delay } from "utils";

class Auth extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tab: props.router.params.type,
			isProcessing: false,
		};

		this.tabIndices = {
			login: 0,
			register: 1,
		};
	}

	componentDidMount() {
		this.tabContent = document.querySelector(".form-tab-content");
		this.tabs = document.querySelectorAll(".form-tab-content li");

		this.resizeObserver = new ResizeObserver((entries) => {
			this.adjustFormHeight(entries);
		});

		this.switchTabs(this.state.tab);
	}

	componentWillUnmount() {
		this.resizeObserver.disconnect();
	}

	componentDidUpdate(prevProps) {
		const prevTab = prevProps.router.params.type;
		const curTab = this.props.router.params.type;

		if (prevTab !== curTab) {
			this.setState({ tab: curTab });
			this.switchTabs(curTab);
		}
	}

	render() {
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
						<LoginForm
							login={this.loginUser}
							loading={this.state.isProcessing}
						/>
					</li>
					<li className="register">
						<RegisterForm
							register={this.registerUser}
							loading={this.state.isProcessing}
						/>
					</li>
				</ul>
			</div>
		);
	}

	registerUser = async (data) => {
		this.setState({ isProcessing: true });
		try {
			console.log(data);
			// create new user
			const auth = getAuth();
			const credentials = await createUserWithEmailAndPassword(
				auth,
				data.email,
				data.password
			);
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
		this.setState({ isProcessing: false });
	};

	loginUser = async (data, shouldRemember) => {
		this.setState({ isProcessing: true });
		try {
			const auth = getAuth();

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
			const res = this.props.router.navigate("/settings/account");

			console.log(res);
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
		this.setState({ isProcessing: false });
	};

	switchTabs(tab) {
		const timeline = gsap.timeline();

		const tabIndex = this.tabIndices[tab];
		const previous = this.getTabByName(this.state.tab);
		const current = this.getTabByName(tab);

		// un-observe previously active form
		this.resizeObserver.unobserve(previous.querySelector("form"));

		const tabLength = 100 / this.tabs.length;
		gsap.to(".line", {
			ease: "expo.out",
			left: `${tabIndex * tabLength}%`,
		});

		// fade out active tab
		timeline.to(previous, {
			opacity: 0,
			duration: 0.05,
			onComplete: () => {
				// remove active class from all tabs
				for (const tab of this.tabs) {
					tab.classList.remove("active-tab-content");
				}
				// add active class to current tab
				current.classList.add("active-tab-content");
			},
		});

		const form = current.querySelector("form");
		// animate height of container
		timeline.to(this.tabContent, {
			height: form.offsetHeight,
			onComplete: () => {
				// observer for the current form to animate height changes
				this.resizeObserver.observe(form);
			},
		});

		// fade in current tab
		timeline.to(current, { opacity: 1, duration: 0.15 });
	}

	adjustFormHeight(entries) {
		const form = this.currentForm();
		const entry = entries.find((entry) => entry.target === form);
		if (!entry) return;
		// console.log(entry);
		gsap.to(this.tabContent, {
			height: entry.borderBoxSize[0].blockSize,
			ease: "expo.out",
			duration: 0.3,
		});
	}

	// helpers
	getTabByName(name) {
		return this.tabs[this.tabIndices[name]];
	}

	currentTab() {
		return this.tabs[this.tabIndices[this.state.tab]];
	}

	currentForm() {
		const tab = this.currentTab();
		return tab.querySelector("form");
	}
}

export default Auth;
