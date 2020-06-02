
const calculateBmi = (height: number, weight: number): string => {

  if (
    isNaN(Number(weight)) &&
    isNaN(Number(height))
  ) {
    throw new Error('Enter numerical values');
  }

  const parsedHeight = Number(height);
  const parsedWeight = Number(weight);

  const convertHeight = Math.pow(parsedHeight / 100, 2);
  const bmi = parsedWeight / convertHeight;


  if (bmi <= 15) {
    return 'Very severely underweight ';
  }

  if (bmi <= 15 && bmi < 17) {
    return 'Severely underweight ';
  }

  if (bmi > 16 && bmi < 19) {
    return 'Underweight';
  }

  if (bmi > 18 && bmi < 26) {
    return 'Normal (healthy weight)';
  }

  if (bmi > 25 && bmi <= 30) {
    return 'Overweight';
  }


  if (bmi > 30 && bmi <= 35) {
    return 'Obese Class I (Moderately obese)';
  }

  if (bmi >= 35 && bmi <= 40) {
    return 'Obese Class II (Severely obese)';
  }

  return 'Obese Class III (Very severely obese)';
};

// if (process.argv.length < 4) {
//   throw new Error('not enough arguments')
// }

// const weight = process.argv[3];
// const height = process.argv[2];

// if (
//   (weight && isNaN(Number(weight))) &&
//   (height && isNaN(Number(height)))) {
//   console.log(calculateBmi(Number(height), Number(weight)))
// }

// console.log(calculateBmi(Number(height), Number(weight)))


export default calculateBmi;