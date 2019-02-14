<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import './assets/css/reset.css';
  @import url('https://fonts.googleapis.com/css?family=Lato:300,700');

  :root {
    --bg-color: #263238;
    --txt-color: #fefefe;
    --status-color: #f7f5f5;
    --status-hl-color: #B0BEC5;
  }

  @media screen and (min-width: 800px) {
    :root {
      --bg-color: #ECEFF1;
      --txt-color: #212121;
    }
  }

  body {
    background-color: var(--bg-color);
    color: var(--txt-color);
    font-family: 'Lato', sans-serif;
    letter-spacing: 0.0325em;
    font-weight: 300;
  }

  h1 {
    margin: 30px 0;
    font-weight: 700;
    letter-spacing: 0.15em;
  }
  h2 {
    font-size: 1.25em;
    line-height: 1.375em;
  }
  p {
    line-height: 1.375em;
  }
  em {
    font-weight: 700;
    text-decoration: underline;
  }
  a.btn {
    padding: 8px 10px;
    color: var(--bg-color);
    font-size: 0.625em;
    font-weight: 700;
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: 0.175em;
    background-color: var(--status-hl-color);
    border-radius: 3px;
  }
</style>
