<template>
  <div id="app">
    <div class="container-fluid">
      <h1><span class="fancy">Dialogue</span><span class="bits">Bits</span></h1>
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

.fancy {
  font-family: 'Merriweather', serif;
}

.bits {
  font-family: 'VT323', monospace;
  font-size: 60px;
  color: white;
  background: black;
}
</style>
