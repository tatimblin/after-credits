<template>
  <section class="movie-item" :class="modifier">
    <img class="movie-item__image" :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2${poster}`" :alt="`Does ${movie} have an after credits scene?`">
    <h2 class="movie-item__title">{{ movie }}</h2>
    <p class="movie-item__rating" v-if="mod === 'list'">{{ rating }}/10</p>
  </section>
</template>

<script>

export default {
  name: 'movie-item',
  props: ['movie', 'poster', 'mod', 'rating'],
  computed: {
    modifier() {
      return `movie-item--${this.mod}`;
    },
  },
};
</script>

<style lang="scss">
.movie-item {
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: end;
  grid-gap: 15px;

  &__image {
    width: 100%;
  }
  &__title {
    font-size: 1.375em;
  }
}

.movie-item--list {
  align-items: start;
  border-bottom: 1px solid var(--txt-color);
  grid-template-rows: auto 1fr;
  margin: 0 15px;
  padding: 15px;
  transition: all 150ms ease-in;

  &:hover {
    background-color: #B0BEC5;
    color: var(--bg-color);
  }

  .movie-item__image {
    grid-row: 1 / 3;
  }
  .movie-item__title {
  }
  .movie-item__rating {
    grid-column-start: 2;
    align-self: start;
    font-weight: 700;
  }
}

@media only screen and (min-width: 680px) {
  .movie-item__title {
    font-size: 2.625em;
  }
}
</style>
