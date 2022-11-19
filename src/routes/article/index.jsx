import { Component } from "react";
import "./style.scss";

// images
import thumbnail from "@/assets/images/article-images/IMG-20221112-WA0006.jpg";
import image0 from "@/assets/images/article-images/IMG-20221112-WA0002.jpg";

export default class Article extends Component {
	constructor(props) {
		super(props);
		console.log(props);
	}

	render() {
		return (
			<main className="app-main">
				<h1 className="article-heading">
					Blade Runner 2049 : A Movie Review
				</h1>

				<img
					className="article-thumb image"
					src={thumbnail}
					alt="article thumbnail"
					height={400}
				/>

				<p>
					When Officer KD6-3.7, a Nexus-9 replicant built for the sole
					purpose of hunting down and "retiring'' rogue replicants,
					learns that his memory involving a wooden horse, which is
					supposedly artificial (like any other memory fragments
					implanted into the brain of a replicant), is, in-fact, real,
					he screams from existential frustration. It makes him
					question everything about himself.
				</p>

				<p>
					Hidden behind his frustration, however, lies a tinge of
					hope. Officer K leads a fairly lonely life, his only company
					being a hologram that is overtly cheerful and who he is, as
					strange as it sounds, in love with. His job of destroying
					replicants has made him distant from his own life.
				</p>

				<p>
					He is loyal to his cold, human manager; he follows all her
					orders blindly until he realizes that there's a chance that
					he wasn't built and assembled,that he was birthed out of
					love and affection.
				</p>

				<p>
					He feels alive in a way he never has before. The hologram
					pushes him to believe that he has always mattered and that
					it always knew he was special.
				</p>

				<p>
					The hope, however, disappears when he realizes that the
					memory that was implanted in him, although real, was never
					his; that it was just a cruel mistake on life’s part. He was
					never the miraculous child born to a replicant and a human.
					The constant optimism that his hologram companion kept
					feeding him was just a corporate algorithm programmed to
					spew what its master wants to hear and feel. It was just
					another machine doing what it was designed to do.
				</p>

				<p>
					He, however, soars in spite of life's betrayal. Although his
					birth and the purpose assigned to him by his corporate
					masters isn't special or right, he realizes that it's up to
					him to change it by performing something human and selfless,
					irrespective of how dangerous it is. It isn't too late to
					redeem himself, to raise himself to someone of value.
				</p>

				<p>
					He risks his own life to save someone else's, for the
					happiness of the actual "Chosen One", for a revolution. He
					makes himself important to someone, expecting nothing in
					return.
				</p>

				<img src={image0} alt="lying dowm" />

				<p>
					As he lies down in the snow, covered in wounds, he is
					drained, but for the first time in his life, he feels
					satisfied with his actions, even though he ends up being a
					mere cog in the machine.
				</p>
			</main>
		);
	}
}
