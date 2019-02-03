<template>
  <div class="single-movie">
    <h1>After Credits</h1>
    <h2>{{ movie }}</h2>
    <article v-if="data">
      <p>{{ resultMsg }}</p>
      <ol>
        <li>After: {{ data.after }}</li>
        <li>During: {{ data.during }}</li>
        <li>None: {{ data.none }}</li>
      </ol>
    </article>
    <new-vote></new-vote>
  </div>
</template>

<script>
import axios from 'axios';
import db from './firebaseInit';
import NewVote from './NewVote';

export default {
  name: 'SingleMovie',
  components: {
    NewVote,
  },
  data() {
    return {
      movie_id: this.$route.params.movie_id,
      movie: '',
      after: 0,
      during: 0,
      none: 0,
      data: null,
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
        } else {
          this.data = null;
        }
      });
    },
    movieInfo(id) {
      axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=4facee87d9690e4a1b4c2c594817a58d`)
        .then((response) => { return this.movie = response.data.title })
        .catch(() => { this.movie = 'Movie not found.' });
    },
  },
  computed: {
    resultMsg() {
      let arr = [this.data.after || 0, this.data.none || 0, this.data.during || 0];
      let i = arr.indexOf(Math.max.apply(null, arr));
      switch(i) {
        case 1:
          return `Sit Tight! *Yes* there is a post-credit scene after the credits of ${this.movie}.`;
          break;
        case 2:
          return `Unfortunately, there is *no* post-credit scene after the credits of ${this.movie}.`;
          break;
        case 3:
          return `There isn't anything after the credits, but there should be some clips during.`;
          break;
        default:
          return `Sorry, we haven't gotten enough feedback on ${this.movie} yet.`;
      }
    }
  }
};
</script>
