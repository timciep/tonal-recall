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

          <div v-if="clip.notes" class="row">
            <div class="col">
              <div class="alert alert-secondary">
                {{ clip.notes }}
              </div>
            </div>
          </div>
          
          <h6 class="card-subtitle mb-2">Hints:</h6>
          <ul class="list-group list-group-horizontal">
            <!-- Year -->
            <li class="list-group-item" v-if="!year">
              <div class="btn btn-link" @click="year = !year">Year</div>
            </li>
            <li class="list-group-item" v-if="year">
              {{ clip.year }}
            </li>

            <!-- Director -->
            <li class="list-group-item" v-if="!director">
              <div class="btn btn-link" @click="director = !director">Director</div>
            </li>
            <li class="list-group-item" v-if="director">
              {{ clip.director }}
            </li>

            <!-- Actor -->
            <li class="list-group-item" v-if="!actor">
              <div class="btn btn-link" @click="actor = !actor">Actor(s)</div>
            </li>
            <li class="list-group-item" v-if="actor">
              {{ clip.actor }}
            </li>
          </ul>

          <br>

          <h5 class="card-title alert alert-success" v-if="revealed">{{ clip.name }}</h5>
          <h5 class="card-title" v-if="!revealed">
            <div class="btn btn-link" @click="revealed = !revealed">Reveal Title</div>
          </h5>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Howl} from 'howler';

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

.card {
  width: 320px;
  margin: 10px;
  margin-bottom: 30px;
}

.red {
  background-color: #cecece;
}

.list-group-horizontal .list-group-item {
  background-color: inherit;
}

h5.alert {
    margin-bottom: 0;
}

.btn-link {
  cursor: pointer;
  padding: 0;
}

</style>
