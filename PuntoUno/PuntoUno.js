let rangos = [5, 4, 2, 0];

function Solution(rangos) {
  let count = 0;
  for (let i = 0; i < rangos.length; i++) {
    let secondFound = false;
    for (let j = i + 1; j < rangos.length; j++) {
      if (rangos[i] - 1 === rangos[j] && !secondFound) {
        count++;
        secondFound = true;
      }
    }
    secondFound = false;
    for (let j = i - 1; j >= 0; j--) {
      if (rangos[j] + 1 === rangos[i] && !secondFound) {
        count++;
        secondFound = true;
      }
    }
  }
  return count;
}
let countSoldiers = Solution(rangos);
console.log(countSoldiers);