interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

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
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));