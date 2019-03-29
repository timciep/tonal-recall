<template>
  <div id="app">
    <div class="container-fluid">
      <h1><span class="fancy">Dialogue</span><span class="bits">Bits</span></h1>
      <br>
      <div class="row">
        <Clip 
        v-for="(clip, index) in clips" 
        :key="index" 
        :clip="clip"
        @reveal="reveal($event)"
        @cover="unReveal($event)"></Clip>
      </div>
    </div>
  </div>
</template>

<script>
import Clip from './components/Clip.vue';
var _ = require('lodash');
const axios = require('axios');

export default {
  name: 'app',
  components: {
    Clip
  },

  data: function() {
    return {
      clips: {},
      revealed: []
    }
  },

  methods: {
    reveal: function(value) {
      this.revealed.push(value);
      this.updateRoute();
    },

    unReveal: function(value) {
      _.remove(this.revealed, function(n) {
        return n == value;
      });
      this.updateRoute();
    },

    updateRoute() {
      this.$router.push({query: {'revealed': this.revealed}});
    }
  },

  created: function(){
    axios.get('/clips-json/' + this.$route.params.game + '.json')
      .then((response) => {
        this.clips = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    this.revealed = _.concat([], this.$route.query.revealed);
    _.forEach(this.clips, (clip) => {
      clip.show = _.includes(this.revealed, clip.mp3);
    });
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
