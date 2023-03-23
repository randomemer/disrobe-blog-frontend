import { FirestoreModel } from "@/types/backend";
import { Timestamp } from "firebase/firestore";
import { timestampFromJSON } from "../utils";
import AuthorModel from "./author";
import StoryVersionData from "./story-data";

import type { AuthorJSON, StoryJSON } from "@/types/backend";
import type { StoryDocumentData } from "@/types/backend/client";
import type { DocumentData } from "firebase/firestore";

export default class StoryModel extends FirestoreModel<
  StoryDocumentData,
  StoryJSON
> {
  readonly id: string;
  readonly is_published: boolean;
  readonly created_at: Timestamp;
  readonly draft: StoryVersionData;
  readonly live?: StoryVersionData;

  private _author: AuthorModel;
  public get author(): AuthorModel {
    return this._author;
  }
  public set author(author) {
    this._author = author;
  }

  /**
   * POJO Model for Story
   */
  constructor(data: StoryJSON);
  constructor(id: string, data: StoryDocumentData, author: AuthorModel);
  constructor(
    dataOrId: string | StoryJSON,
    data?: StoryDocumentData,
    author?: AuthorModel
  ) {
    super();

    if (typeof dataOrId !== "string") {
      this.id = dataOrId.id;
      this._author = new AuthorModel(dataOrId.author.id, dataOrId.author);
      this.is_published = dataOrId.is_published;
      this.created_at = timestampFromJSON(dataOrId.created_at);

      const { draft, live } = dataOrId.data;
      this.draft = new StoryVersionData(draft);
      this.live = live && new StoryVersionData(live);
    } else {
      if (!data || !author) {
        throw new Error("data or author argument was not provided");
      }

      this.id = dataOrId;
      this._author = author;
      this.is_published = data.is_published;
      this.created_at = data.created_at;

      const { draft, live } = data.data;
      this.draft = new StoryVersionData(draft);
      this.live = live && new StoryVersionData(live);
    }
  }

  static isDocument(data: DocumentData): data is StoryDocumentData {
    return data.created_at instanceof Timestamp;
  }

  static isJson(data: Record<string, any>): data is AuthorJSON {
    return !(data.created_at instanceof Timestamp);
  }

  toDocument() {
    return {
      author: this.author.id,
      is_published: this.is_published,
      created_at: this.created_at,
      data: {
        draft: this.draft.toDocument(),
        ...(this.live && { live: this.live?.toDocument() }),
      },
    };
  }

  toJSON(): StoryJSON {
    return {
      id: this.id,
      author: this.author.toJSON(),
      created_at: this.created_at.toJSON(),
      is_published: this.is_published,
      data: {
        draft: this.draft.toJSON(),
        ...(this.live && { live: this.live.toJSON() }),
      },
    };
  }
}
