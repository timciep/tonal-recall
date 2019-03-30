<template>
  <div id="app">
    <div class="container-fluid">

      <EditModal 
      :clip="editingClip"
      @close="(editingClip = {})"
      @save="saveClips"
      ></EditModal>

      <nav class="navbar fixed-top navbar-light bg-dark">
        <h1 class="navbar-brand">
          <span class="fancy">Dialogue</span>
          <span class="bits">Bits</span>
        </h1>
        <!-- <div class="nav-item">
          <button
          v-if="!editing" 
          @click="editing = true"
          type="button" 
          class="btn btn-primary">
            Edit
          </button>
          <button
          v-if="editing" 
          @click="editing = false"
          type="button" 
          class="btn btn-success">
            Save
          </button>
        </div> -->
      </nav>

      <br><br><br>

      <div class="row">
        <Clip 
        v-for="(clip, index) in clips" 
        :key="index" 
        :clip="clip"
        @reveal="reveal($event)"
        @cover="unReveal($event)"
        @edit="editingClip = $event"></Clip>
      </div>
      
    </div>
  </div>
</template>

<script>
import Clip from './components/Clip.vue';
import EditModal from './components/EditModal.vue';

const awsClient = require('./helpers/aws.js');
const _ = require('lodash');
const axios = require('axios');

export default {
  name: 'app',
  components: {
    Clip, EditModal
  },

  data: function() {
    return {
      data: {},
      clips: {},
      revealed: [],
      editingClip: {},
      gamePath: 'games/' + this.$route.params.game + '/',
      clipsJsonFile: 'https://s3.us-east-2.amazonaws.com/audio-bits-data/games/' + this.$route.params.game + '/game.json',
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
    },

    saveClips(files) {
      if (files.sm) {
        this.uploadFile(this.gamePath + this.editingClip.mp3 + '/sm.mp3', files.sm);
      }
      if (files.md) {
        this.uploadFile(this.gamePath + this.editingClip.mp3 + '/md.mp3', files.md);
      }
      if (files.lg) {
        this.uploadFile(this.gamePath + this.editingClip.mp3 + '/lg.mp3', files.lg);
      }


      // Update remote JSON.
      this.uploadFile(this.gamePath + 'game.json', JSON.stringify(this.data));

      // Close edit modal.
      this.editingClip = {};
    },

    uploadFile(path, file) {
      awsClient.s3.upload({
        Key: path,
        Body: file,
        ACL: 'public-read'
      }, function(err) {
        if (err) {
          console.log(err);
          return alert('Error uploading ' + path + ': ', err.message);
        }
        console.log('Uploaded: ' + path);
      });
    }
  },

  created: function() {
    // Get clips JSON.
    axios.get(this.clipsJsonFile)
      .then((response) => {
        this.data = response.data;
        this.clips = this.data.clips

        // Set revealed clips state, from URL params.
        this.revealed = _.concat([], this.$route.query.revealed);
        _.forEach(this.clips, (clip) => {
          clip.show = _.includes(this.revealed, clip.mp3);
        });
      })
      .catch(function (error) {
        console.log(error);
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
  color: white;
  font-size: 25px;
  font-family: 'Merriweather', serif;
}

.bits {
  font-family: 'VT323', monospace;
  font-size: 30px;
  color: white;
  background: black;
}

</style>
