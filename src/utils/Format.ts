export function transformLetter(lettre: string) {
  let tableau = lettre.split("");
  for (let index = 0; index < tableau.length; index++) {
    const element = tableau[index];
    if (element == "/") {
      tableau[index] = "-";
    }
  }
  let result = tableau.join("");
  return result;
}

export function invertLetter(lettre: string) {
  let tableau = lettre.split("");
  for (let index = 0; index < tableau.length; index++) {
    const element = tableau[index];
    if (element == "-") {
      tableau[index] = "/";
    }
  }
  let result = tableau.join("");
  return result;
}
