import { FormValues } from "@/types";
import { ImageElement } from "@/types/slate";
import createCache from "@emotion/cache";
import axios from "axios";
import { randomBytes } from "crypto";
import humanizeDuration from "humanize-duration";
import _ from "lodash";
import { Descendant, Element, Node } from "slate";
import { AnyObject, Maybe, Schema, string, ValidationError } from "yup";
import { META_DESC_LENGTH, META_TITLE_LENGTH } from "./config";

/**
|--------------------------------------------------
|                 VALUES / OBJECTS
|--------------------------------------------------
*/

export const api = axios.create({ baseURL: process.env.API_ENDPOINT });

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
  const words = _.words(content).length;
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
  ) as ImageElement | undefined;
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

export function getStoryGist(children: Descendant[], limit: number = 245) {
  const content = getContentString(children);
  const trimmed = content.slice(0, limit) + "...";
  return trimmed;
}

export function getMediaURL(bucketPath: string) {
  return `/media/${encodeURIComponent(bucketPath)}`;
}

export function autoId(length: number = 10) {
  const chars = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;
  let autoId = "";

  while (autoId.length < length) {
    const bytes = randomBytes(40);
    bytes.forEach((b) => {
      /**
       * Length of `chars` is 62. We only take bytes between 0 and (62 * 4 - 1) (both inclusive).
       * The value is then evenly mapped to indices of `char` via a modulo operation.
       */
      const maxValue = 62 * 4 - 1;
      if (autoId.length < length && b <= maxValue) {
        autoId += chars.charAt(b % 62);
      }
    });
  }
  return autoId;
}

export function jsonify(value: any) {
  return JSON.parse(JSON.stringify(value));
}

export function facebookURL(url: string): string {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}`;
}

export function twitterURL(content: string): string {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`;
}

export function linkedinURL(url: string): string {
  return `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
    url
  )}`;
}

export function extractParagraphs(text: string) {
  const pattern = /\n\s*\n/g;
  const paragraphs = text.split(pattern);

  return paragraphs;
}

export function attemptJsonParse(str: any) {
  try {
    return JSON.parse(str);
  } catch (error) {
    return undefined;
  }
}

export function extractBearerToken(header: string | undefined) {
  if (!header) return null;

  const matches = header.match(/Bearer\s+([^\s]+)/i);

  if (matches && matches.length > 1) {
    return matches[1];
  }

  return null;
}

export function truncateMetaTitle(title: string) {
  const titleEnd = " | Disrobe";
  const realTitle = title.replace(titleEnd, "");

  return realTitle.length + titleEnd.length > META_TITLE_LENGTH
    ? `${realTitle.slice(0, META_TITLE_LENGTH - titleEnd.length - 3)}...` +
        titleEnd
    : realTitle + titleEnd;
}

export function truncateMetaDesc(desc: string) {
  return desc.length > META_DESC_LENGTH
    ? desc.slice(0, META_DESC_LENGTH - 3) + "..."
    : desc;
}
