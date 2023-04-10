import humanizeDuration from "humanize-duration";
import { Descendant, Element, Node } from "slate";
import createCache from "@emotion/cache";
import { FormValidators, FormValues } from "@/types";
import { AnyObject, Maybe, Schema, string, ValidationError } from "yup";
import _ from "lodash";

/**
|--------------------------------------------------
|                 VALUES / OBJECTS
|--------------------------------------------------
*/

export const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;

export const WORD_REGEX = /\b\w+\b/gm;

export const readTimeHumanizer = humanizeDuration.humanizer({
  language: "short_en",
  languages: {
    short_en: {
      m: () => "min",
    },
  },
  units: ["m"],
  round: true,
});

export const FORM_VALIDATORS: FormValidators = {
  email: (text) => {
    if (!text.trim()) {
      return "Email cannot be empty";
    } else if (!EMAIL_REGEX.test(text)) {
      return "Not a valid email";
    } else return null;
  },
  password: (text) => {
    if (text.trim().length < 8) {
      return "Password too short";
    } else return null;
  },
  full_name: (text) => {
    if (!text.trim()) {
      return "Please tell us your name";
    } else return null;
  },
};

export const url = string().url();

/**
|--------------------------------------------------
|                   FUNCTIONS
|--------------------------------------------------
*/

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function calcWordCount(content: string) {
  let words = 0;
  let match;
  while ((match = WORD_REGEX.exec(content)) !== null) {
    if (match.index === WORD_REGEX.lastIndex) {
      WORD_REGEX.lastIndex++;
    }
    words += match.length;
  }

  return {
    words,
    read: readTimeHumanizer(words * 300),
  };
}

export function getContentString(content: Descendant[]) {
  return content.map((node) => Node.string(node)).join("\n ");
}

export function getStoryThumb(content: Descendant[]) {
  return content.find(
    (node) => Element.isElement(node) && node.type === "image"
  );
}

export function createFormValue<T>(val: T | null, other?: Record<string, any>) {
  return {
    value: val,
    error: false,
    errorMessage: "",
    ...other,
  };
}

export function createEmotionCache() {
  return createCache({ key: "css", prepend: true });
}

export function getFormData<T>(form: FormValues<T>): T {
  return Object.keys(form).reduce(
    (prev, cur) => ({
      ...prev,
      [cur]: form[cur as keyof T].value,
    }),
    {}
  ) as T;
}

export function validateSchemaField<T extends Maybe<AnyObject>>(
  schema: Schema<T>,
  value: any
) {
  try {
    schema.validateSync(value);
  } catch (error) {
    if (error instanceof ValidationError) {
      return error.message;
    } else throw error;
  }
}

export function objectDifference(obj1: object, obj2: object): any {
  const changes = _.differenceWith(_.toPairs(obj1), _.toPairs(obj2), _.isEqual);
  return _.fromPairs(changes);
}

export function isBlobURL(string: string) {
  return string.startsWith("blob:");
}
