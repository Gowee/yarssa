import { JSDOM } from "jsdom";

export interface OPML {
  title: string;
  outlines: string[];
}

export function parseOPML(text: string): OPML {
  // Spec: http://dev.opml.org/spec2.html
  const dom = new JSDOM(text);
  const opml = dom.window.document.querySelector("opml");
//   const head = opml.querySelector("head");
  const body = opml.querySelector("body");

  const title = opml.querySelector("title").text;

  const outlines = [];
  for (const outline of body.querySelectorAll("outline")) {
    outlines.push((outline as any).text);
  }
  return { title, outlines };
}
