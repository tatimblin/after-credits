<template>
  <div class="single-movie">
    <page-head :title="`${movie} after credits scene`" :description="message"></page-head>
    <div class="single-movie__card" :class="result">

      <movie-nav></movie-nav>
      
      <div class="single-movie__content">

        <h1 class="single-movie__site-title">After Credits</h1>

        <movie-item :movie="movie" :poster="poster"></movie-item>
        
        <article class="single-movie__result">
          <section v-html="markedMessage"></section>
          <section>
            <a href="/" class="btn">Tickets</a>
            <a href="/" class="btn">Rent</a>
          </section>
        </article>

      </div>

    </div>
    <new-vote></new-vote>
  </div>
</template>

<script>
import axios from 'axios';
import db from '@/components/firebaseInit';
import marked from 'marked';
import PageHead from '@/components/PageHead';
import NewVote from '@/components/NewVote';
import MovieItem from '@/components/MovieItem';
import MovieNav from '@/components/MovieNav';

export default {
  name: 'SingleMovie',
  components: {
    PageHead,
    NewVote,
    MovieItem,
    MovieNav,
  },
  data() {
    return {
      movie_id: this.$route.params.movie_id,
      movie: '',
      poster: '',
      data: null,
      result: 'no-data',
      message: 'Checking data...',
    };
  },
  mounted() {
    this.movieInfo(this.movie_id)
    // set initial votes
    this.fetchData()
  },
  watch: {
    $route: function() {
      // if route changes then movie data should too
      this.movieInfo(this.$route.params.movie_id)
      this.fetchData()
    },
  },
  methods: {
    fetchData() {
      // update vote data when changing page
      const docRef = db.collection('votes').doc(this.$route.params.movie_id)
      docRef.onSnapshot((doc) => {
        if (doc.exists) {
          this.data = doc.data();
          // get most voted
          this.calcResult()
        } else {
          this.data = null;
        }
      });
    },
    movieInfo(id) {
      axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.VUE_APP_MOVIEDB}`)
        .then((response) => {
          this.movie = response.data.title;
          this.poster = response.data.poster_path;
        })
        .catch(() => { this.movie = 'Movie not found.' });
    },
    calcResult() {
      // figure out most voted then set class and message
      const votes = [this.data.after || 0, this.data.none || 0, this.data.during || 0];
      const max = Math.max(...votes);
      const i = votes.findIndex(vote => vote == max);
      let result, message;
      switch(i) {
        case 0:
          result = 'after';
          message = `*Yes!* there is a post-credit scene after the credits of ${this.movie}.`;
          break;
        case 1:
          result = 'none';
          message = `Sorry, others have indicated there is *no* post-credit scene after the credits of ${this.movie}.`;
          break;
        case 2:
          result = 'during';
          message = `There may not be a post-credit scene, but there should be some clips during.`;
          break;
        default:
          result = 'no-data';
          message = `Sorry, we haven't gotten enough *feedback* on this movie yet.`;
          break;
      }
      this.result = result;
      this.message = message;
    },
  },
  computed: {
    markedMessage() {
      return marked( this.message, {sanitize: true});
    }
  }
};
</script>

<style lang="scss">
.single-movie__card.after {
  --status-color: #2E7D32;
  --status-hl-color: #00C853;
}
.single-movie__card.during {
  --status-color: #F57F17;
  --status-hl-color: #F9A825;
}
.single-movie__card.none {
  --status-color: #B71C1C;
  --status-hl-color: #FF5252;
}
.single-movie__card.no-data {
  --txt-color: #212121;
}


.single-movie {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 100px;
  max-width: 420px;
  height: 100vh;
  max-height: 812px;
  margin: 0 auto;
  &__card {
    --txt-color: #F5F5F5;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 15px;
    padding: 15px;
    background-color: var(--status-color);
    border: 4px solid var(--status-hl-color);
    border-radius: 10px;
    color: var(--txt-color);
    transition: background-color 600ms ease,
      border 300ms ease;
  }
  &__site-title {
    text-transform: uppercase;
  }
}

.single-movie__result {
  & > section {
    margin: 30px 0;
  }
}
</style>

