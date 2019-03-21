<template>
  <div id="app">
    <div class="container">
      <h1>Dialogue Bits!</h1>
      <br>
      <div class="row">
        <Clip 
        v-for="(clip, index) in clips" 
        :key="index" 
        :clip="clip"></Clip>
      </div>
    </div>
  </div>
</template>

<script>
import Clip from './components/Clip.vue';
import clipsJson from '../clips.json';

export default {
  name: 'app',
  components: {
    Clip
  },
  data: function() {
    return {
      clips: clipsJson
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin-top: 20px;
}

.card {
  width: 22rem;
  margin: 10px;
}
</style>
