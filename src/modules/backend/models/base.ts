import { Model, ModelObject, ToJsonOptions } from "objection";

export default class BaseModel extends Model {
  toJSON(opt?: ToJsonOptions | undefined): ModelObject<this> {
    const obj = super.toJSON(opt);

    const recur = (object: Record<string, any>): any => {
      for (const [k, v] of Object.entries(object)) {
        if (v instanceof Date) {
          object[k] = v.getTime();
        } else if (v instanceof Object) {
          object[k] = recur(v);
        } else {
          object[k] = v;
        }
      }

      return object;
    };

    return recur(obj);
  }
}
