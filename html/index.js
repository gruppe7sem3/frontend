// Function to fetch JSON data from your API
function fetchMovies() {
    fetch('http://localhost:2222/shows')
        .then((response) => response.json())
        .then((data) => {
            const movieContainer = document.getElementById('movie-cards');
            const groupedMovies = groupMoviesByPoster(data);

            // Loop through the grouped movies
            for (const posterUrl in groupedMovies) {
                const movies = groupedMovies[posterUrl];

                // Create a movie card for the poster
                const movieCard = createMovieCard(posterUrl, movies);
                movieContainer.appendChild(movieCard);
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}

// Helper function to group movies by poster URL
function groupMoviesByPoster(movies) {
    const grouped = {};
    movies.forEach((movie) => {
        if (!grouped[movie.poster]) {
            grouped[movie.poster] = [];
        }
        grouped[movie.poster].push(movie);
    });
    return grouped;
}

// Helper function to create a movie card
function createMovieCard(posterUrl, movies) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('col-md-12', 'mb-4');

    const card = document.createElement('div');
    card.classList.add('movie-card');

    // Create an image for the poster
    const img = document.createElement('img');
    img.src = posterUrl;
    img.classList.add('poster-image');

    // Create a div for movie details (title and show times)
    const movieDetailsDiv = document.createElement('div');
    movieDetailsDiv.classList.add('movie-details');

    // Create a list to display show times
    const showTimesList = document.createElement('ul');
    showTimesList.classList.add('show-times');

    // Add individual movie show times to the list
    movies.forEach((movie) => {
        const movieShowTime = createShowTimeListItem(movie);
        showTimesList.appendChild(movieShowTime);
    });

    // Append elements to build the movie card
    movieDetailsDiv.appendChild(showTimesList);
    card.appendChild(img);
    card.appendChild(movieDetailsDiv);
    cardDiv.appendChild(card);

    return cardDiv;
}

// Helper function to create a list item for movie show time
function createShowTimeListItem(movie) {
    const listItem = document.createElement('li');
    listItem.classList.add('show-time-item');
    const link = document.createElement('a');

    // Parse the showDate and showTime values
    const showDateTime = new Date(movie.showTime);
    const formattedTime = showDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Check if the show has hall = 2
    if (movie.hallId === 2) {
        link.href = `seatSelector2.html?showId=${movie.showId}`;
    } else {
        link.href = `seatSelector.html?showId=${movie.showId}`;
    }

    link.textContent = `${movie.showDate} - ${formattedTime}`;
    listItem.appendChild(link);

    return listItem;
}

// Call the function to fetch and display movies
fetchMovies();
