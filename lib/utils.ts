// ইংরেজি সংখ্যাকে বাংলা সংখ্যায় রূপান্তর
export function toBengaliNumber(num: number | string): string {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
}

// বাংলা সংখ্যাকে স্বাভাবিক নম্বরে (Number) রূপান্তর
export function parseBengaliNumber(bengaliNumStr: string | number): number {
  if (typeof bengaliNumStr === "number") return bengaliNumStr;
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  let englishStr = bengaliNumStr.toString();
  bengaliDigits.forEach((digit, index) => {
    englishStr = englishStr.replaceAll(digit, index.toString());
  });
  return parseFloat(englishStr) || 0;
}
