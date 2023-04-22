/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("StorySnapshot").del();
  await knex("StorySnapshot").insert(data);
};

const data = [
  {
    id: "1f2b778a-2b2f-457b-babe-8c49fce8f30d",
    story_id: "TyR97YTzbK",
    title: "BladeRunner 2049 : A Movie Review",
    content: JSON.stringify([
      {
        type: "paragraph",
        children: [
          {
            text: 'When Officer KD6-3.7, a Nexus-9 replicant built for the sole purpose of hunting down and "retiring" rogue replicants, learns that his memory involving a wooden horse, which is supposedly artificial (like any other memory fragments implanted into the brain of a replicant), is, in-fact, real, he screams from existential frustration. It makes him question everything about himself.',
          },
        ],
      },
      {
        url: "/src/assets/images/article-images/IMG-20221112-WA0005.jpg",
        type: "image",
        caption: "",
        children: [
          {
            text: "",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "Hidden behind his frustration, however, lies a tinge of hope. Officer K leads a fairly lonely life, his only company being a hologram that is overtly cheerful and who he is, as strange as it sounds, in love with. His job of destroying replicants has made him distant from his own life.",
          },
        ],
      },
      {
        url: "/src/assets/images/article-images/IMG-20221112-WA0004.jpg",
        type: "image",
        caption: "",
        children: [
          {
            text: "",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "He is loyal to his cold, human manager; he follows all her orders blindly until he realizes that there's a chance that he wasn't built and assembled,that he was birthed out of love and affection.",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "He feels alive in a way he never has before. The hologram pushes him to believe that he has always mattered and that it always knew he was special.",
          },
        ],
      },
      {
        url: "/src/assets/images/article-images/IMG-20221112-WA0006.jpg",
        type: "image",
        caption: "",
        children: [
          {
            text: "",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "The hope, however, disappears when he realizes that the memory that was implanted in him, although real, was never his; that it was just a cruel mistake on life’s part. He was never the miraculous child born to a replicant and a human. The constant optimism that his hologram companion kept feeding him was just a corporate algorithm programmed to spew what its master wants to hear and feel. It was just another machine doing what it was designed to do.",
          },
        ],
      },
      {
        url: "/src/assets/images/article-images/IMG-20221112-WA0008.jpg",
        type: "image",
        caption: "",
        children: [
          {
            text: "",
          },
        ],
      },
      {
        url: "/src/assets/images/article-images/IMG-20221112-WA0001.jpg",
        type: "image",
        caption: "",
        children: [
          {
            text: "",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "He, however, soars in spite of life's betrayal. Although his birth and the purpose assigned to him by his corporate masters isn't special or right, he realizes that it’s up to him to change it by performing something human and selfless, irrespective of how dangerous it is. It isn't too late to redeem himself, to raise himself to someone of value.",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: 'He risks his own life to save someone else\'s, for the happiness of the actual "Chosen One", for a revolution. He makes himself important to someone, expecting nothing in return. ',
          },
        ],
      },
      {
        url: "/src/assets/images/article-images/IMG-20221112-WA0002.jpg",
        type: "image",
        caption: "self reflection",
        children: [
          {
            text: "",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "As he lies down in the snow, covered in wounds, he is drained, but for the first time in his life, he feels satisfied with his actions, even though he ends up being a mere cog in the machine.",
          },
        ],
      },
    ]),
    timestamp: new Date(1673936117813),
  },
  {
    id: "aa7d6aad-f6bd-4399-8e8e-89cadb0aa47c",
    story_id: "AQYAqicxqM",
    title: "Testing Slade Editor",
    content: JSON.stringify([
      {
        type: "paragraph",
        children: [
          {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n",
          },
          {
            bold: true,
            text: "bold\n",
          },
          {
            text: "italic\n",
            italic: true,
          },
          {
            text: "strikethrough\n",
            strikethrough: true,
          },
          {
            text: "underlined\n",
            underline: true,
          },
          {
            code: true,
            text: "variableFoo\n",
          },
          {
            url: "https://www.slatejs.org/examples/images",
            type: "link",
            children: [
              {
                text: "Link text. ",
              },
              {
                bold: true,
                text: "Bold text inside link",
              },
            ],
          },
          {
            text: "",
          },
        ],
      },
      {
        url: "https://images2.alphacoders.com/870/thumb-1920-870886.jpg",
        type: "image",
        caption: "A still from Blade Runner 2049",
        children: [
          {
            text: "",
          },
        ],
      },
      {
        type: "h2",
        children: [
          {
            text: "How to Basic",
          },
        ],
      },
      {
        type: "numbered-list",
        children: [
          {
            type: "list-item",
            children: [
              {
                text: "Take an egg",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                text: "Smash it against a wall",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                text: 'Congrats, you are now "how to basic"',
              },
            ],
          },
        ],
      },
      {
        type: "h3",
        children: [
          {
            text: "My Bucket List",
          },
        ],
      },
      {
        type: "bulleted-list",
        children: [
          {
            type: "list-item",
            children: [
              {
                text: "Visit japan",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                text: "Visit South America",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                text: "Go rafting somewhere",
              },
            ],
          },
        ],
      },
      {
        type: "blockquote",
        children: [
          {
            text: "If you are distressed by anything external, the pain is not due to the thing itself, but to your estimate of it; and this you have the power to revoke at any moment.",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
          },
          {
            url: "https://www.smashingmagazine.com/2021/05/building-wysiwyg-editor-javascript-slatejs/",
            type: "link",
            children: [
              {
                text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
              },
            ],
          },
          {
            text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "",
          },
          {
            url: "https://en.wikipedia.org/wiki/Ryan_GoslingxR2fj-",
            type: "link",
            children: [
              {
                text: "Ryan Gosling",
              },
            ],
          },
          {
            text: ' is so good at portraying the character of "literally me", that it just hits hard in the feels.',
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "The feels. Like you should, always be working hard. Grind",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "",
          },
        ],
      },
    ]),
    timestamp: new Date(1681163677046),
  },
  {
    id: "f8d9aca9-8c8c-4749-8604-fc35ec3bdced",
    story_id: "ne3lxhdiyu",
    title: "Images",
    content: JSON.stringify([
      {
        url: "https://images.unsplash.com/photo-1672605183243-22fd7c7fd73e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        type: "image",
        caption:
          "A tree in the Algerian Sahara (Tin Akachakar in Ahaggar National Park) fights for its place.",
        children: [
          {
            text: "",
          },
        ],
        source_type: "network",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/stories-blog-15b84.appspot.com/o/images%2Fstories%2F2433ec04-ea25-4994-a341-0ae8cd00f85b.png?alt=media&token=16cd419e-5a4c-4733-a8f3-a57f1462ca55",
        type: "image",
        caption: "",
        children: [
          {
            text: "",
          },
        ],
        bucket_path: "images/stories/2433ec04-ea25-4994-a341-0ae8cd00f85b.png",
        source_type: "backend",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/stories-blog-15b84.appspot.com/o/images%2Fstories%2F89e35ce8-78f3-4235-91fa-ba47a34d2b8a.png?alt=media&token=75c27963-467a-462f-98d7-bdff6cf60326",
        type: "image",
        caption: "",
        children: [
          {
            text: "",
          },
        ],
        bucket_path: "images/stories/89e35ce8-78f3-4235-91fa-ba47a34d2b8a.png",
        source_type: "backend",
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/stories-blog-15b84.appspot.com/o/images%2Fstories%2F0696de8c-5674-46e7-b371-74ea63c83ea6.png?alt=media",
        type: "image",
        caption: "ba",
        children: [
          {
            text: "",
          },
        ],
        bucket_path: "images/stories/0696de8c-5674-46e7-b371-74ea63c83ea6.png",
        source_type: "backend",
      },
    ]),
    timestamp: new Date(1681162825849),
  },
];
