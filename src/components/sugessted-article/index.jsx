import { Component } from "react";
import "./style.scss";

export default class SuggestedArticle extends Component {
	render() {
		return (
			<div
				className="article-card"
				style={{
					flexDirection: this.props.isLeft ? "row" : "row-reverse",
				}}
			>
				<img src={this.props.imgThumbSrc} alt="article card thumb" />
				<div className="card-info">
					<span className="tags">Travel</span>
					<h3>{this.props.title}</h3>
					<div className="author">
						<img src={this.props.author.img} alt="author pfp" />
						<span>{this.props.author.name}</span>
					</div>
				</div>
			</div>
		);
	}
}
