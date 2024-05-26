interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const parseExerciseArguments = (args: string[]): { target: number, hours: number[] } => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const target = Number(args[2]);
    const hours = args.slice(3).map(h => Number(h));
    if (isNaN(target) || hours.some(h => isNaN(h))) {
        throw new Error('Provided values were not numbers!');
    }
    return { target, hours };
};

const calculateExercises = (hours: number[], target: number): Result => {
    const periodLength = hours.length;
    let trainingDays = 0;
    for (let i = 0; i < hours.length; i++) {
        if (hours[i] > 0) {
            trainingDays++;
        }
    }
    const average = hours.reduce((a, b) => a + b, 0) / periodLength;
    const success = average >= target;
    let rating;
    let ratingDescription;
    if(success){
        rating = 3;
        ratingDescription = "Met the target, good job!";
    }
    else if(average >= target / 2){
        rating = 2;
        ratingDescription = "Almost there!";
    }
    else{
        rating = 1;
        ratingDescription = "Need to work harder!";
    }
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

try {
    const { target, hours } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(hours, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }