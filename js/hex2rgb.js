// HEXをRGBに変換する方法 => https://lab.syncer.jp/Web/JavaScript/Snippet/61/
const hex2rgb = (hex) => {
  const arr = { input: hex, r: null, g: null, b: null, arr: [] };
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
  arr["arr"] = hexArr;
  return arr;
};
