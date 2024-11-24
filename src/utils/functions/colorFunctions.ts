export const hexToRGB = (hex: string) => {
  const resArr = [];
  for (let i = 1; i < 7; i += 2) {
    resArr.push(parseInt(hex.slice(i, i + 2), 16));
  }
  return resArr.join(", ");
};
export const hexToRGBArray = (hex: string) => {
  const resArr = [];
  for (let i = 1; i < 7; i += 2) {
    resArr.push(parseInt(hex.slice(i, i + 2), 16));
  }
  return resArr;
};

export const renewColorOnBackground = (baseColor: string, backgorundColor: string, opacity: number) => {
  const baseRGB = hexToRGBArray(baseColor);
  const backgorundRGB = hexToRGBArray(backgorundColor);
  const resRGB = [1, 1, 1];
  for (let i = 0; i < 3; i++) {
    resRGB[i] = (baseRGB[i] - backgorundRGB[i] * (1 - opacity)) / opacity;
  }
  return resRGB.join(", ");
};
