<template>
  <div :class="{ 'card': true, 'red': revealed}">
    <div class="card-body">

      <div class="row">
        <div class="col">

          <div v-if="!clip.one" class="d-inline">
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

          <div v-if="clip.one" class="d-inline">
            <div class="btn-group" role="group" aria-label="Play clip!">
              <button type="button" 
                class="btn btn-success"
                @click="playLong">
                <i class="fas fa-play-circle"></i> Play
              </button>
            </div>
          </div>

          <div v-if="this.playing" class="btn-group" role="group" aria-label="Stop!">
            <button type="button" 
              class="btn btn-danger"
              @click="stop">
              <i class="fas fa-stop-circle"></i>
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
          <div class="btn btn-link" @click="year = true">Year</div>
        </li>
        <li class="list-group-item hide" @click="year = false" v-if="year">
          {{ clip.year }}
        </li>

        <!-- Director -->
        <li class="list-group-item" v-if="!director">
          <div class="btn btn-link" @click="director = true">Director</div>
        </li>
        <li class="list-group-item hide" @click="director = false" v-if="director">
          {{ clip.director }}
        </li>

        <!-- Actor -->
        <li class="list-group-item" v-if="!actor && clip.actor != '?'">
          <div class="btn btn-link" @click="actor = true">Actor(s)</div>
        </li>
        <li class="list-group-item hide" v-if="actor" @click="actor = false">
          {{ clip.actor }}
        </li>
      </ul>

      <br>

      <h5 class="card-title alert alert-success hide" @click="cover" v-if="revealed">{{ clip.name }}</h5>
      <h5 class="card-title" v-if="!revealed">
        <div class="btn btn-link" @click="reveal">Reveal Title</div>
      </h5>

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
      actor: false,
      sound: {},
      playing: false
    }
  },

  props: {
    clip: Object
  },

  methods: {
    reveal: function() {
      this.revealed = true;
      this.$emit('reveal', this.clip.mp3);
    },

    cover: function() {
      this.revealed = false;
      this.$emit('cover', this.clip.mp3);
    },

    playSmall: function() {
      let path = 'mp3/' + this.clip.mp3 + '/sm.mp3';
      this.playSound(path);
    },

    playMed: function() {
      let path = 'mp3/' + this.clip.mp3 + '/md.mp3';
      this.playSound(path);
    },

    playLong: function() {
      let path = 'mp3/' + this.clip.mp3 + '/lg.mp3';
      this.playSound(path);
    },

    playSound: function(path) {
      this.playing = true;
      if (this.sound instanceof Howl) {
        this.sound.stop();
      }
      console.log("playing " + path);
      this.sound = new Howl({
        src: [path]
      });
      this.sound.play();
      this.sound.on('end', () => {
        this.playing = false;
      });
    },

    stop: function() {
      this.sound.stop();
      this.playing = false;
    }
  },

   mounted: function(){
     this.revealed = this.clip.show;
   }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.card {
  width: 330px;
  margin: 10px;
  margin-bottom: 30px;
  border: 1px solid rgba(0, 0, 0, 0.85);
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

.hide {
  cursor: pointer;
}

.hide:hover {
  opacity: .7;
}

</style>
