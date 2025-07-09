import { XLSX } from "https://taisukef.github.io/sheetjs-es/es/XLSX.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

const data = await CSV.fetchJSON("./opendata-fukui.csv");
for (const item of data) {
  const url = item["XLSファイル"];
  const fn = url.substring(url.lastIndexOf("/") + 1);
  console.log(fn);
  const bin = await Deno.readFile("xls/" + fn);
  const ws = XLSX.decode(bin);
  const firstname = Object.keys(ws.Sheets)[0];
  const data = XLSX.toCSV(ws.Sheets[firstname]);
  
  let rem = 0;
  const len = data.length;
  let names = null;
  for (let i = 0; i < len; i++) {
    const t = data[rem][0];
    //console.log(t, rem, data.length);
    if (t == "No.") {
      names = data[rem];
      break;
    } else if (t == "#property") {
      data[rem][0] = "No.";
      names = data[rem];
      rem++;
    } else if (t[0] == "#") {
      data.splice(rem, 1);
    } else {
      break;
    }
  }
  const fn2 = fn.substring(0, fn.lastIndexOf(".")) + ".csv";
  await Deno.writeTextFile("csv/" + fn2, CSV.encode(data));

  item.CSV = "./csv/" + fn2;
  item.緯度経度データ = names && names.includes("緯度") && names.includes("経度") ? 1 : 0;
}

await Deno.writeTextFile("./opendata-fukui.csv", CSV.stringify(data));
