import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { Sema } from "async-sema";
import FeedParser, { Meta as Feed_, Item } from "node-feedparser";

// interface Feed {
//     title: string;
//     link: string | null;
//     description: string | null;
//     entries: FeedEntry[];
// }

// interface FeedEntry {
//     title: string;
//     link: string;
//     description: string | null;
// }

export interface Feed extends Feed_ {
  items: Item[];
}

export { Item } from "node-feedparser";

export async function fetchFeed(url: string): Promise<Feed> {
  const parser = new FeedParser({ addmeta: false, feedurl: url });
  const response = await fetch(url);

  let resolve, reject;
  const parsed = new Promise((resolve_, reject_) => {
    resolve = resolve_;
    reject = reject_;
  });

  let meta;
  let items = [];
  parser
    .on("meta", (meta_) => {
      meta = meta_;
    })
    .on("data", (item) => {
      items.push(item);
    })
    .on("error", (error) => {
      reject(error);
    })
    .on("end", (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });

  response.body.pipe(parser);

  // const doc = (new JSDOM(d)).window.document

  // let base;
  // if (base = document.querySelector("rss")) {
  //     // RSS 0.9 / 2.0
  //     const channel = base.querySelector("")
  // }
  await parsed;
  return { ...meta, items };
}
