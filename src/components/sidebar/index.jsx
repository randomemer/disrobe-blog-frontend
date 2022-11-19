import { Component } from "react";
import SuggestedArticle from "components/sugessted-article";
import "./style.scss";

const props = [
	{
		imgThumbSrc:
			"https://plus.unsplash.com/premium_photo-1666432045848-3fdbb2c74531?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
		author: {
			img: "https://images.unsplash.com/photo-1667375947428-935b0c6354d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDgwfHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
			name: "Karl Hedin",
		},
		title: "7 Tips to travel in the desert",
	},
	{
		imgThumbSrc:
			"https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=410&q=80",
		title: "Upgrade your meal prep with these tips",
		author: {
			img: "https://images.unsplash.com/profile-1518156163490-947fb5399aa6?dpr=1&auto=format&fit=crop&w=32&h=32&q=60&crop=faces&bg=fff",
			name: "Joseph Gonzalez",
		},
	},
];

export default class SideBar extends Component {
	render() {
		return (
			<aside className="side-bar">
				<h3>More on this</h3>
				{props.map((prop, i) => (
					<SuggestedArticle isLeft={i % 2 === 0} {...prop} key={i} />
				))}
			</aside>
		);
	}
}
