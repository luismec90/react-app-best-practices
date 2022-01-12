import { decode } from "html-entities";

function decodeHtmlEntities(content: string): string {
  return decode(content, { level: "html5", scope: "body" });
}

export { decodeHtmlEntities };
