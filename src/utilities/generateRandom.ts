// functions

const generateRandomLowerCaseLetters = (): string => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const generateRandomUpperCaseLetters = (): string => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97).toUpperCase();
};

const generateRandomSymbol = (): string => {
  return "!@#$%.<^&*_/\\?`'~"[
    Math.floor(Math.random() * "!@#$%.<^&*_/\\?`'~".length)
  ];
};

const generateRandomNumbers = (): number => {
  return Math.floor(Math.random() * 10);
};

const generateThePassword = (
  password: boolean,
  numsonly: boolean,
  length: number
): string => {
  const myfuncs = [
    generateRandomLowerCaseLetters,
    generateRandomUpperCaseLetters,
    generateRandomSymbol,
    generateRandomNumbers,
  ];

  let res;
  if (numsonly) {
    res = 0;
    for (let i = 0; i < length; i++) res += generateRandomNumbers();
  } else if (password) {
    res = '';
    for (let i = 0; i < length; i++)
      res += myfuncs[Math.floor(Math.random() * 4)]();
  } else {
    res = '';
    for (let i = 0; i < length; i++)
      res += myfuncs[Math.floor(Math.random() * 2)]();
  }

  return res as string;
};

export default generateThePassword;
