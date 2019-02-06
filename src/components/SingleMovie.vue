<template>
  <div class="single-movie">
    <page-head :title="`${movie} after credits scene`" :description="message"></page-head>
    <div class="single-movie__card" :class="result">

      <nav class="nav">
        Navigation
      </nav>
      
      <div class="single-movie__content">

        <h1 class="single-movie__site-title">After Credits</h1>

        <header class="header">
            <img class="header__image" :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2${poster}`" alt="">
            <h2 class="header__title">{{ movie }}</h2>
        </header>
        
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
import db from './firebaseInit';
import marked from 'marked';
import PageHead from './PageHead';
import NewVote from './NewVote';

export default {
  name: 'SingleMovie',
  components: {
    PageHead,
    NewVote,
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
      axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=4facee87d9690e4a1b4c2c594817a58d`)
        .then((response) => {
          this.movie = response.data.title;
          this.poster = response.data.poster_path;
        })
        .catch(() => { this.movie = 'Movie not found.' });
    },
    calcResult() {
      const votes = [this.data.after, this.data.none, this.data.during];
      const max = Math.max(...votes);
      const i = votes.findIndex(vote => vote == max);
      let result, message;
      switch(i) {
        case 0:
          result = 'after';
          message = `Sit Tight! *Yes* there is a post-credit scene after the credits of ${this.movie}.`;
          break;
        case 1:
          result = 'none';
          message = `Unfortunately, there is *no* post-credit scene after the credits of ${this.movie}.`;
          break;
        case 2:
          result = 'during';
          message = `There isn't anything after the credits, but there should be some clips during.`;
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

.header {
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: end;

  &__image {
    width: 100%;
  }
  &__title {
    padding: 0 15px;
    font-size: 2.625em;
  }
}

.single-movie__result {
  & > section {
    margin: 30px 0;
  }
}
</style>

