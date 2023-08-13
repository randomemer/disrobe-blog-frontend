const { v4 } = require("uuid");
const snapshots = require("./data/story-snapshot.json");
const stories = require("./data/story.json");
const { Element, Node } = require("slate");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("StorySettings").del();

  const records = stories.map((story) => {
    const draft = snapshots.find((snap) => snap.story_id === story.id);

    const titleEnd = " | Disrobe";

    const truncatedTitle =
      draft.title.length + titleEnd.length > 60
        ? `${draft.title.slice(
            0,
            draft.title.length - titleEnd.length - 3
          )}...` + titleEnd
        : draft.title + titleEnd;

    const truncatedDesc = getStoryGist(draft.content, 147);

    const thumbnail = getStoryThumb(draft.content);
    const metaImg = thumbnail?.url ?? null;

    return {
      id: v4(),
      story_id: story.id,
      meta_title: truncatedTitle,
      meta_desc: truncatedDesc,
      meta_img: metaImg,
    };
  });

  await knex("StorySettings").insert(records);
};

function getStoryThumb(content) {
  return content.find(
    (node) => Element.isElement(node) && node.type === "image"
  );
}

function getStoryGist(children, limit = 245) {
  const content = getContentString(children);
  const trimmed = content.slice(0, limit) + "...";
  return trimmed;
}

function getContentString(content) {
  return content.map((node) => Node.string(node)).join("\n ");
}
