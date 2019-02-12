<template>
  <nav class="nav">
    <div class="nav__back">
      <router-link to="/">
        <svg class="nav__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400.004 400.004">
          <path d="M382.688 182.686H59.116l77.209-77.214c6.764-6.76 6.764-17.726 0-24.485-6.764-6.764-17.73-6.764-24.484 0L5.073 187.757c-6.764 6.76-6.764 17.727 0 24.485l106.768 106.775a17.252 17.252 0 0 0 12.242 5.072c4.43 0 8.861-1.689 12.242-5.072 6.764-6.76 6.764-17.726 0-24.484l-77.209-77.218h323.572c9.562 0 17.316-7.753 17.316-17.315 0-9.562-7.753-17.314-17.316-17.314z" fill="#212121"/>
        </svg>
      </router-link>
    </div>
    <div class="nav__info">
      <router-link to="/about">
      <svg class="nav__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <g fill="#212121">
          <circle cx="256" cy="256" r="64"/>
          <circle cx="256" cy="448" r="64"/>
          <circle cx="256" cy="64" r="64"/>
        </g>
      </svg>
      </router-link>
    </div>
  </nav>
</template>

<style lang="scss">
.nav {
  display: flex;
  justify-content: space-between;

  &__back {
    height: 26px;
    width: 26px;
  }
  &__icon {
    height: 26px;
    width: 26px;
  }
}
</style>
