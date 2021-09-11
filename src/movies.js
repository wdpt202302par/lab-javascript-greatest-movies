// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(movies) {
  let directors = movies.map(function (movie) {
    return movie.director;
  })

  // _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors. How could you "clean" a bit this array and make it unified (without duplicates)?
  directors = directors.filter(function (director, index) {
    return index === directors.lastIndexOf(director) // keep if lastIndex is the same: meaning it appears once
  })

  return directors;
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(films) {
  return films
    .filter(film => film.genre.indexOf('Drama') !== -1)
    .filter(film => film.director === 'Steven Spielberg')
    .length
  ;
}

// Iteration 3: All rates average - Get the average of all rates with 2 decimals
function scoresAverage(films) {
  if (films.length < 1) return 0;

  let sum = films.reduce(function (acc, curr) {
    const filmRate = Number(curr.score) || 0; // 0 if no rate
    return acc + filmRate;
  }, 0);

  return +(sum/films.length).toFixed(2);
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(films) {
  // filter 'Drama' films
  var dramaFilms = films.filter(film => film.genre.indexOf('Drama') !== -1);

  if (dramaFilms.length < 1) return 0;

  return scoresAverage(dramaFilms); // re-use our `scoresAverage` function
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(films) {
  filmsCopy = films.slice()

  return filmsCopy.sort(function (a, b) {
    if (a.year === b.year) {
      return a.title.localeCompare(b.title) // same year => sort by title then
    } else if (a.year < b.year) {
      return -1; // a before b
    } else {
      return 1; // a after b
    }
  })
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(films) {
  return films
    .map(film => film.title)
    .sort()
    .slice(0,20)
  ;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(films) {
  return films.map(film => {
    let duration = film.duration; // '3h 22min' or '5h' or '22min' cases possible

    //
    // Let's extract `hours` and `mins` from duration
    //
    // 3 cases:
    //   - Case 1: '3h 22min' (hours and minutes)
    //   - Case 2: '5h'       (only hours)
    //   - Case 3: '22min'    (only minutes)
    //
    
    let hours = 0;
    let mins = 0;

    const isH = (duration.includes('h'));
    const isMin = (duration.includes('min'));
    if (isH && isMin) {
      //
      // Case 1: '3h 22min'
      //

      let hSplit = duration.split('h ');
      let minSplit = hSplit[1].split('min');

      hours = hSplit[0];
      mins = minSplit[0];
    } else if (isH && !isMin) {
      //
      // Case 2: '5h'
      //
      
      hours = duration.split('h')[0];
    } else if (!isH && isMin) {
      //
      // Case 3: '22min'
      //
      
      mins = duration.split('min')[0]
    }

    // return a new object that is a copy but, with duration as minutes
    let dur = Number(hours)*60+Number(mins);
    return {
      ...film,
      duration: dur
    };
  })
}

// BONUS - Iteration 8: Best yearly rate average - Best yearly rate average
function bestYearAvg(films) {
  if (films.length < 1) return null;

  //
  // Extract all unique years from films: ['1999', '2003', '1945']
  //

  let years = [];
  films.forEach(function (film) {
    let year = film.year;

    if (years.indexOf(year) === -1) {
      years.push(year);
    }
  });

  /*
  Compute the avg rate for each year, and store it into an object:
  {
    '1999': 8.6,
    '2003': 3.5,
    '1945': 7
  }
  */

  let avgRatesByYear = {};
  years.forEach(function (year) {
    // Only for films of that year...
    const yearFilms = films.filter(film => film.year === year);

    // ...Sum all the rates
    const totalYearRates = yearFilms.reduce(function (acc, film) {
      return acc + Number(film.score);
    }, 0);

    // Compute the average rate
    avgRatesByYear[year] = totalYearRates / yearFilms.length;
  });
  
  //
  // loop through our `avgRatesByYear` object and find the best avgRate and the corresponding year
  //

  let bestYear;
  let bestAvgRate = -Infinity;
  Object.keys(avgRatesByYear).forEach(function (year) {
    if (avgRatesByYear[year] > bestAvgRate) {
      bestAvgRate = avgRatesByYear[year];
      bestYear = year;
    }
  })

  return `The best year was ${bestYear} with an average score of ${bestAvgRate}`;
}


// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
    module.exports = {
        getAllDirectors,
        howManyMovies,
        scoresAverage,
        dramaMoviesScore,
        orderByYear,
        orderAlphabetically,
        turnHoursToMinutes,
        bestYearAvg,
    };
}

