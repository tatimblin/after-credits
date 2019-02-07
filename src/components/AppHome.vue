<template>
  <div class="home">
    <header class="header">
      <h1 class="header__title">After Credits Theater</h1>
      <h2 class="header__callout">Quickly lookup if a movie has a post-credits scene.</h2>
    </header>
    <div class="movie-list">
      <router-link class="movie-list__link" v-for="movie in movie_data" :key="movie.id" :to="`/${movie.id}`">
        <movie-item :movie="movie.title" :poster="movie.poster_path" :rating="movie.vote_average" mod="list"/>
      </router-link>
    </div>
    <footer>
      <p>Data provided by <a href="https://www.themoviedb.org/">The Movie Database</a></p>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';
import MovieItem from './MovieItem';

export default {
  name: 'AppHome',
  components: {
    MovieItem,
  },
  data() {
    return {
      movie_data: [],
    };
  },
  mounted() {
    // get list of movies currently in theaters
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=4facee87d9690e4a1b4c2c594817a58d&language=en-US`)
      .then((response) => {
        this.movie_data = response.data.results;
      })
      .catch(() => { this.movie = 'Movie not found.' });
  },
};
</script>

<style lang="scss" scoped>
.header {
  max-width: 680 - 30px;
  margin: 60px auto;
  padding: 0 15px;

  &__title {
    margin: 15px 0;
    text-transform: uppercase;
  }
  &__callout {
    font-size: 2.875em;
  }
}
.movie-list {
  max-width: 680px;
  margin: 0 auto;

  &__link {
    color: var(--txt-color);
    text-decoration: none;
  }
}

footer {
  margin-bottom: 10px;
  text-align: center;
  a {
    color: var(--txt-color);
  }
}
</style>
