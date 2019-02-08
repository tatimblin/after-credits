<template>
  <div class="new-vote">
    <h2 class="new-vote__title">{{ prompt }}</h2>
    <div class="new-vote__submit" v-if="!hasVoted">
      <button class="new-vote__item" @click="countVote('after')">Yes</button>
      <button class="new-vote__item" @click="countVote('none')">No</button>
      <button class="new-vote__item" @click="countVote('during')">During Credits</button>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit';

export default {
  name: 'NewVote',
  data() {
    return {
      movie_id: this.$route.params.movie_id,
      docRef: '',
      prompt: 'Did the movie have a post-credits scene?',
      hasVoted: false,
    };
  },
  mounted() {
    // access the db document from any method
    this.docRef = db.collection('votes').doc(this.$route.params.movie_id);
    // check if previously voted
    const id = this.movie_id;
    const savedVote = localStorage[id];
    if (savedVote != null) {
      this.localVote(savedVote)
      this.hasVoted = true;
    }
  },
  methods: {
    countVote(vote) {
      this.docRef.get().then((doc) => {
        // checks if document needs creating or updating
        if (doc.exists) {
          const startVote = doc.data()[vote] || 0;
          const newVote = startVote + 1;
          this.updateVote(vote, newVote);
        } else {
          this.createVote(vote);
        }
      });
    },
    updateVote(vote, count) {
      return this.docRef.update({
        [vote]: count
      })
      .then(() => {
        const id = this.movie_id;
        localStorage[id] = vote;
        this.localVote(vote)
      })
      .catch(() => {
        console.error('Function probably does not exist');
      });
    },
    createVote(vote) {
      return this.docRef.set({
        vote: 1,
      })
      .then(() => {
        vm.$forceUpdate();
        const id = this.movie_id;
        localStorage[id] = vote;
        this.localVote(vote)
      })
      .catch(() => {
        console.error('Something went wrong while creating the document');
      });
    },
    localVote(vote) {
      switch(vote) {
        case 'after':
          this.prompt = "You've indicated there is an after credits scene.";
          break;
        case 'none':
          this.prompt = "You've indicated there isn't an after credits scene.";
          break;
        case 'during':
          this.prompt = "You've indicated there is a scene during the credits.";
          break;
        default:
          this.prompt = 'Did the movie have a post-credits scene?';
      }
    },
  },
}
</script>

<style lang="scss">
.new-vote {
  align-self: center;
  margin: 15px 30px;
  &__item {
    padding: 10px 15px;
    color: var(--text-color);
    font-family: 'Lato', sans-serif;
    font-size: 0.75em;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    background: none;
    border: none;
    transition: opacity 300ms ease;

    &:hover {
      opacity: 0.6;
    }
    &:first-child {
      padding-left: 0;
    }
  }
}
</style>
