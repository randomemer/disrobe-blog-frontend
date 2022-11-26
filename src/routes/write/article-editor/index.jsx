import { useEffect } from "react";
import { Editable, useSlate } from "slate-react";
import { renderLeaf, renderElement } from "./modules/rendering";

export default function ArticleEditable() {
	const slate = useSlate();

	useEffect(() => {
		console.log(slate);
	});

	return (
		<Editable
			className="slate-editor"
			onChange={(ev) => console.log(ev)}
			renderElement={renderElement}
			renderLeaf={renderLeaf}
		/>
	);
}
