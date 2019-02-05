<template>
  <div class="new-vote">
    <h2 class="new-vote__title">Did the movie have a post-credits scene?</h2>
    <div class="new-vote__submit">
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
    };
  },
  mounted() {
    // access the db document from any method
    this.docRef = db.collection('votes').doc(this.$route.params.movie_id);
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
        console.log('Document updated successfully.');
        //vm.$forceUpdate();
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
        console.log('Document created successfully.');
        vm.$forceUpdate();
      })
      .catch(() => {
        console.error('Something went wrong while creating the document');
      });
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
