import { CSV } from "https://js.sabae.cc/CSV.js";

const data = await CSV.fetchJSON("./opendata-fukui.csv");
for (const item of data) {
  const url = item["XLSファイル"];
  const bin = await (await fetch(url)).bytes();
  const fn = url.substring(url.lastIndexOf("/") + 1);
  await Deno.writeFile("xls/" + fn, bin);
  console.log(fn);
}
