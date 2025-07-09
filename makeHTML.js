import { CSV } from "https://js.sabae.cc/CSV.js";

const title = "福井県福井市 福祉オープンデータ一覧";

const names = [
  "タイトル", "データ概要", "データ提供所属", "データ最終更新日", "備考",
];
const links = ["CSV", "HTML", "関連ページ"];
const table = [];
table.push(`<tr>${names.map(i => `<th>${i}</th>`).join("")}</tr>`);

const data = await CSV.fetchJSON("./opendata-fukui.csv");
for (const item of data) {
  const url = "." + item.CSV;
  const title = item.タイトル + " - 福井県福井市福祉オープンデータ";
  const hasLL = item.緯度経度データ == "1";

  table.push(`<tr>${names.map(i => {
    if (i == "タイトル") {
      const v = [];
      v.push(`<a href="${item.HTML}">${item[i]}</a>`)
      v.push(`<a href="${item.関連ページ}">関連ページ</a>`);
      v.push(`<a href="${item.CSV}">CSV</a>`);
      return `<td>${v.join(" ")}</td>`;
    } else {
      return `<td>${item[i]}</td>`;
    }
  }).join("")}</tr>`);

  const html = `<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" href="data:">
    <link rel="stylesheet" href="../style.css">
    <title>${title}</title></head><body>
    <h1>${title}</h1>
    ${
      hasLL ? `
        <script type="module" src="https://code4fukui.github.io/csv-map/csv-map.js"></script>
        <csv-map src="${url}"></csv-map>
      ` : ""
    }
    <script type="module" src="https://code4sabae.github.io/js/csv-viewer.js"></script>
    <csv-viewer src="${url}"></csv-viewer>
    <hr>
    DATA: <a href="${item.src}">${item.src_title}</a><br>
    <a href="https://github.com/code4fukui/opendata-fukui/">src on GitHub</a><br>
    </body></html>`;
  const fn = url.substring(url.lastIndexOf("/") + 1);
  const fn2 = fn.substring(0, fn.lastIndexOf(".")) + ".html";
  await Deno.writeTextFile("html/" + fn2, html);
  item.HTML = "./html/" + fn2;
}
await Deno.writeTextFile("./opendata-fukui.csv", CSV.stringify(data));

const idx = `<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" href="data:">
<link rel="stylesheet" href="./style.css">
<title>${title}</title></head><body>
<h1>${title}</h1>
<table>
${table.join("\n")}
</table>
<hr>
DATA: <a href="https://www.city.fukui.lg.jp/sisei/tokei/opendata/opengov.html">福井市オープンデータパーク</a><br>
<a href="https://github.com/code4fukui/opendata-fukui/">src on GitHub</a><br>
</body></html>
`;
await Deno.writeTextFile("./index.html", idx);
