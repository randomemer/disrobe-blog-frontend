import humanizeDuration from "humanize-duration";
import { useMemo } from "react";
import { Node } from "slate";
import { useSlate } from "slate-react";

const readTimeHumanizer = humanizeDuration.humanizer({
	language: "short_en",
	languages: {
		short_en: {
			m: () => "min",
			s: () => "sec",
		},
	},
	units: ["m", "s"],
	round: true,
});

export default function useWordCount() {
	const editor = useSlate();

	// const hasChanged =

	const info = useMemo(() => {
		const WORD_REGEX = /\b\w+\b/gm;
		const content = editor.children.map((node) => Node.string(node)).join("\n");

		let wordCount = 0;
		let match;
		while ((match = WORD_REGEX.exec(content)) !== null) {
			if (match.index === WORD_REGEX.lastIndex) {
				WORD_REGEX.lastIndex++;
			}
			wordCount += match.length;
		}

		return {
			wordCount,
			readTime: readTimeHumanizer(wordCount * 300),
		};
	}, [editor.children]);

	return info;
}
