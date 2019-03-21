<template>
  <div class="hello">
    <div class="">
      <div :class="{ 'card': true, 'red': revealed}">
        <div class="card-body">

          <div class="row">
            <div class="col">
              <div class="btn-group" role="group" aria-label="Play clip!">
                <button type="button" 
                  class="btn btn-success"
                  @click="playSmall">
                  <i class="fas fa-play-circle"></i> Short
                </button>
                <button type="button" 
                  class="btn btn-success"
                  @click="playMed">
                  <i class="fas fa-play-circle"></i> Med
                </button>
                <button type="button" 
                  class="btn btn-success"
                  @click="playLong">
                  <i class="fas fa-play-circle"></i> Long
                </button>
              </div>
            </div>
          </div>

          <br>
          
          <h6 class="card-subtitle mb-2">Hints:</h6>
          <ul class="list-group list-group-horizontal">
            <!-- Year -->
            <li class="list-group-item" v-if="!year">
              <a href="#" @click="year = !year">Year</a>
            </li>
            <li class="list-group-item" v-if="year">
              {{ clip.year }}
            </li>

            <!-- Director -->
            <li class="list-group-item" v-if="!director">
              <a href="#" @click="director = !director">Director</a>
            </li>
            <li class="list-group-item" v-if="director">
              {{ clip.director }}
            </li>

            <!-- Actor -->
            <li class="list-group-item" v-if="!actor">
              <a href="#" @click="actor = !actor">Actor(s)</a>
            </li>
            <li class="list-group-item" v-if="actor">
              {{ clip.actor }}
            </li>
          </ul>

          <br>

          <h5 class="card-title" v-if="revealed">{{ clip.name }}</h5>
          <h5 class="card-title" v-if="!revealed">
            <a href="#" @click="revealed = !revealed">Reveal Title</a>
          </h5>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Howl, Howler} from 'howler';

export default {
  name: 'Clip',

  data: function() {
    return {
      revealed: false,
      year: false,
      director: false,
      actor: false
    }
  },

  props: {
    clip: Object
  },

  methods: {
    playSmall: function() {
      let path = 'mp3/' + this.clip.mp3 + '/sm.mp3';
      console.log("playing " + path);
      var sound = new Howl({
        src: [path]
      });
      sound.play();
    },

    playMed: function() {
      let path = 'mp3/' + this.clip.mp3 + '/md.mp3';
      console.log("playing " + path);
      var sound = new Howl({
        src: [path]
      });
      sound.play();
    },

    playLong: function() {
      let path = 'mp3/' + this.clip.mp3 + '/lg.mp3';
      console.log("playing " + path);
      var sound = new Howl({
        src: [path]
      });
      sound.play();
    },
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.red {
  background-color: #cecece;
}

</style>
