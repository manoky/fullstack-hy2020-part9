interface Results {
  periodLength: number;
  trainingLength: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (days: Array<number>, target: number): Results => {
  let evaluation = {
    periodLength: days.length,
    trainingLength: 0,
    target,
    rating: 0,
    ratingDescription: '',
    average: 0,
    success: false
  };

  if (isNaN(Number(target))) {
    throw new Error('malformatted parameters');
  }

  days.map(d => {
    if (isNaN(Number(d))) {
      throw new Error('malformatted parameters');
    }
    return Number(d);
  });

  for (const day of days) {
    if (day !== 0) {
      evaluation.trainingLength = evaluation.trainingLength + 1;
    }
  }

  const average = days.reduce((days, day) => {
    return days + day;
  }, 0) / days.length;

  if (average <= target / 2) {
    evaluation = {
      ...evaluation,
      rating: 1,
      ratingDescription: 'bad, less than average needs improvement'
    };
  } else if (average >= target / 2 && average < target) {
    evaluation = {
      ...evaluation,
      rating: 2,
      ratingDescription: 'not too bad but could be better'
    };
  } else {
      evaluation = {
      ...evaluation,
      rating: 3,
      ratingDescription: 'good job target archived',
      success: true
    };
  }

  return {
    ...evaluation,
    average: average
  };
};

// if (process.argv.length < 5) {
//   throw new Error('Not enough arguments');
// }

// const target = Number(process.argv[2]);
// const days = process.argv.slice(3);

// const parsedDays = days.map( d => {
//   if (isNaN(Number(d))) {
//     throw new Error('invalid input: daily hours should be numerical values');
//   }
//   return Number(d);
// });


// if (!isNaN(Number(target))) {
//   console.log(calculateExercises(parsedDays, target));
// } else {
//   throw new Error('Target should be a numerical value');
// }

export default calculateExercises;