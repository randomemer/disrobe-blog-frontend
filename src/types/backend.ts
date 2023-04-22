export abstract class IRepo<T> {
  abstract fetchId(id: string): Promise<T | undefined>;
  abstract fetchMany(ids: string[]): Promise<T[]>;
}

export type FirestoreTimestampJSON = {
  seconds: number;
  nanoseconds: number;
};
