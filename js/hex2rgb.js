function rgb2hsv(r, g, b) {
  // 引数処理
  let tmp = [r, g, b];
  if (r !== undefined && g === undefined) {
    const cc = parseInt(
      r
        .toString()
        .replace(/[^\da-f]/gi, "")
        .replace(/^(.)(.)(.)$/, "$1$1$2$2$3$3"),
      16
    );
    tmp = [(cc >> 16) & 0xff, (cc >> 8) & 0xff, cc & 0xff];
  } else {
    for (let i in tmp)
      tmp[i] = tmp[i] > 255 ? 255 : tmp[i] < 0 ? 0 : Math.floor(tmp[i]);
  }
  r = tmp[0];
  g = tmp[1];
  b = tmp[2];

  // RGB to HSV 変換
  const v = Math.max(r, g, b),
    d = v - Math.min(r, g, b),
    s = v ? d / v : 0,
    h = s
      ? (v === r
          ? (g - b) / d + (g < b ? 6 : 0)
          : v === g
          ? 2 + (b - r) / d
          : 4 + (r - g) / d) * 60
      : 0;

  // 戻り値
  return {
    h: h,
    s: s,
    v: v / 255,
  };
}

// HEXをRGBに変換する方法 => https://lab.syncer.jp/Web/JavaScript/Snippet/61/
const hex2rgb = (hex) => {
  const arr = {
    input: hex,
    r: null,
    g: null,
    b: null,
    h: null,
    s: null,
    v: null,
    color_analysis: null,
    rgb: [],
    hsv: [],
  };
  if (hex.slice(0, 1) == "#") hex = hex.slice(1);
  if (hex.length == 3)
    hex =
      hex.slice(0, 1) +
      hex.slice(0, 1) +
      hex.slice(1, 2) +
      hex.slice(1, 2) +
      hex.slice(2, 3) +
      hex.slice(2, 3);
  const hexArr = [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)].map(
    function (str) {
      return parseInt(str, 16);
    }
  );
  arr["r"] = hexArr[0];
  arr["g"] = hexArr[1];
  arr["b"] = hexArr[2];
  arr["rgb"] = hexArr;
  const hsvArr = rgb2hsv(hexArr[0], hexArr[1], hexArr[2]);
  arr["h"] = hsvArr["h"];
  arr["s"] = hsvArr["s"];
  arr["v"] = hsvArr["v"];
  if (arr["v"] >= 0.5) {
    if (arr["s"] >= 0.5) {
      arr["color_analysis"] = "spring";
    } else {
      arr["color_analysis"] = "summer";
    }
  } else {
    if (arr["s"] >= 0.5) {
      arr["color_analysis"] = "winter";
    } else {
      arr["color_analysis"] = "autumn";
    }
  }
  arr["hsv"] = [hsvArr["h"], hsvArr["s"], hsvArr["v"]];
  return arr;
};

const distancecolor = (hex1, hex2) => {
  const Arr1 = hex2rgb(hex1);
  const Arr2 = hex2rgb(hex2);
  return Math.sqrt(
    Math.pow(Arr2["r"] - Arr1["r"], 2) +
      Math.pow(Arr2["g"] - Arr1["g"], 2) +
      Math.pow(Arr2["b"] - Arr1["b"], 2)
  );
};
