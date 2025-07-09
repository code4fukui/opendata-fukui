import { fetchOrLoad } from "https://js.sabae.cc/fetchOrLoad.js";
import { HTMLParser } from "https://js.sabae.cc/HTMLParser.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

const url = "https://www.city.fukui.lg.jp/sisei/tokei/opendata/p018973.html";
const baseurl = url;

const makeURL = (relativeURL, baseURL) => new URL(relativeURL, baseURL).href;

// 1度取得したらtemp/にキャッシュする
const html = await fetchOrLoad(url);

// HTMLを解析！
const dom = HTMLParser.parse(html);

// div#rssp 内の、h3タグとtableタグを全部取得
const as = dom.querySelectorAll("div#rssp h3, div#rssp table");

const parseCategory = (s) => {
  const n = s.indexOf("（");
  const m = s.lastIndexOf("）");
  if (n < 0 || m < 0) return s;
  return s.substring(n + 1, m);
};
const category = parseCategory(dom.querySelector("title").text.trim());

// リンク一覧
let title = "";
const items = as.map(i => {
  if (i.tagName == "H3") {
    title = i.text.trim();
    return null;
  } else if (i.tagName == "TABLE") {
    const trs = i.querySelectorAll("tr");
    const item = {
      タイトル: title,
      カテゴリー: category,
      src_title: "福井市オープンデータパーク（福祉・衛生・教育）",
      src: url,
    };
    for (const tr of trs) {
      const tds = tr.querySelectorAll("td");
      const name = tds[0].text.trim();
      const as = tds[1].querySelectorAll("a");
      if (as.length > 0) {
        if (name == "関連ページ") {
          const url = as[0].getAttribute("href");
          item[name] = makeURL(url, baseurl);
        } else {
          for (const a of as) {
            const url = a.getAttribute("href");
            const txt = a.text.trim();
            item[txt] = makeURL(url, baseurl);
          }
        }
      } else {
        const value = tds[1].text.trim();
        item[name] = value;
      }
    }
    return item;
  }
}).filter(i => i);

console.log(items);

// 一覧をCSVファイルとして保存
console.log(items, items.length);
await Deno.writeTextFile("opendata-fukui.csv", CSV.stringify(items));
