<template>
  <div class="col-lg-4">
    <div :class="{ 'card': true, 'red': clip.show}">
      <div class="card-body">

        <div class="row">
          <div class="col">

            <div v-if="!clip.one" class="d-inline">
              <div class="btn-group" role="group" aria-label="Play clip!">
                <button type="button" 
                  class="btn btn-outline-success"
                  @click="playSmall">
                  <i v-if="!clip.files.sm" class="fas fa-exclamation-triangle"></i>
                  <i v-if="clip.files.sm" class="fas fa-play-circle"></i> Short
                </button>
                <button type="button" 
                  class="btn btn-outline-success"
                  @click="playMed">
                  <i v-if="!clip.files.md" class="fas fa-exclamation-triangle"></i>
                  <i v-if="clip.files.md" class="fas fa-play-circle"></i> Med
                </button>
                <button type="button" 
                  class="btn btn-outline-success"
                  @click="playLong">
                  <i v-if="!clip.files.lg" class="fas fa-exclamation-triangle"></i>
                  <i v-if="clip.files.lg" class="fas fa-play-circle"></i> Long
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

        <div class="row">
          <div class="col-10">
            <div class="alert alert-secondary notes">
              <span v-if="clip.notes">{{ clip.notes }}</span>
              <span v-if="!clip.notes"><i>notes</i></span>
            </div>
          </div>
          <div class="col-2">
            <button @click="$emit('edit', clip)" class="btn btn-link">
              <i class="fas fa-edit" title="Title not set!"></i>
            </button>
          </div>
        </div>

        <br>
        
        <h5 class="alert alert-info hide" @click="cover" v-if="clip.show">{{ clip.name }}</h5>
        <h5 class="" v-if="!clip.show">
          <i v-if="!clip.name" class="fas fa-exclamation-triangle"></i>
          <div class="btn btn-link" @click="reveal">Reveal Title</div>
        </h5>

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
      sound: {},
      playing: false,
      mp3Path: 'https://s3.us-east-2.amazonaws.com/audio-bits-data/games/'
                + this.$route.params.game + '/'
                + this.clip.mp3 + '/',
    }
  },

  props: {
    clip: Object
  },

  methods: {
    reveal: function() {
      this.clip.show = true;
      this.$emit('updateRevealed');
    },

    cover: function() {
      this.clip.show = false;
      this.$emit('updateRevealed');
    },

    playSmall: function() {
      let path = this.mp3Path + 'sm.mp3';
      this.playSound(path, 'sm');
    },

    playMed: function() {
      let path = this.mp3Path + 'md.mp3';
      this.playSound(path, 'md');
    },

    playLong: function() {
      let path = this.mp3Path + 'lg.mp3';
      this.playSound(path, 'lg');
    },

    playSound: function(path, size) {
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

      this.sound.on('loaderror', () => {
        this.playing = false;
        this.clip.files[size] = false;
        alert('Mp3 file does not exist.');
      });

      this.sound.on('playerror', () => {
        this.playing = false;
        this.clip.files[size] = false;
        alert('Error playing Mp3 file.');
      });
    },

    stop: function() {
      this.sound.stop();
      this.playing = false;
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.card {
  margin-bottom: 30px;
  border: 1px solid rgba(0, 0, 0, 0.85);
}

.btn-outline-success {
    color: #196b2b;
    border-color: #196b2b;
}

.btn-outline-success:hover {
    color: #fff;
    background-color: #196b2b;
}

.alert {
  margin-bottom: 0;
}

.red {
  background-color: #cecece;
}

.fa-exclamation-triangle {
  color: #e63a00;
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

.notes {
  min-height: 50px;
}

.hide {
  cursor: pointer;
}

.hide:hover {
  opacity: .7;
}

</style>
