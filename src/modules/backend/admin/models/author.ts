import { FirestoreModel } from "@/types/backend";

import type { AuthorJSON } from "@/types/backend";
import type { AuthorDocumentData } from "@/types/backend/admin";

export default class AuthorModel extends FirestoreModel<
  AuthorDocumentData,
  AuthorJSON
> {
  readonly id: string;
  readonly name: string;
  readonly bio: string;
  readonly picture: string;

  /**
   * POJO model for Author
   */
  constructor(id: string, data: AuthorDocumentData | AuthorJSON) {
    super();

    this.id = id;

    this.name = data.name;
    this.bio = data.bio;
    this.picture = data.picture;
  }

  static isDocument(
    data: FirebaseFirestore.DocumentData
  ): data is AuthorDocumentData {
    return true;
  }

  static isJson(data: Record<string, any>): data is AuthorJSON {
    return "id" in data;
  }

  toDocument() {
    return {
      name: this.name,
      bio: this.bio,
      picture: this.picture,
    };
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      bio: this.bio,
      picture: this.picture,
    };
  }
}
