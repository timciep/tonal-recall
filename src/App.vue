<template>
  <div id="app">
    <div class="container-fluid">

      <EditModal 
        :clip="editingClip"
        @close="(editingClip = {})"
        @save="saveClips">
      </EditModal>

      <nav class="navbar fixed-top navbar-light bg-dark">
        <h1 class="">
          <span class="fancy">Audio</span>
          <span class="bits">Bits</span>
        </h1>

        <div class="nav-item">
          <button
            @click="clips.map(clip => clip.show = true); updateRoute();"
            type="button" 
            class="btn btn-success"
          >Reveal All
          </button>
          <button
            @click="clips.map(clip => clip.show = false); updateRoute();"
            type="button" 
            class="btn btn-secondary"
          >Hide All
          </button>
        </div>


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
          @updateRevealed="updateRoute"
          @edit="editingClip = $event">
        </Clip>

        <div @click="addClip" class="card card-new">
          <div class="card-body">
            <i class="fas fa-plus"></i>
          </div>
        </div>


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
      editingClip: {},
      gamePath: 'games/' + this.$route.params.game + '/',
      clipsJsonFile: 'https://s3.us-east-2.amazonaws.com/audio-bits-data/games/' + this.$route.params.game + '/game.json',
    }
  },

  computed: {
    revealed: function() {
      return this.clips.filter(clip => clip.show != false)
                .map(clip => clip.mp3);
    }
  },

  methods: {
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
    },

    addClip() {
      let newClip = {
        mp3: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        name: "",
        notes: "",
        show: false,
        // year: "",
        // actor: "",
        // director: "",
      };

      this.clips.push(newClip);

      this.editingClip = newClip;
    },
  },

  created: function() {
    // Get clips JSON.
    axios.get(this.clipsJsonFile)
      .then((response) => {
        this.data = response.data;
        this.clips = this.data.clips

        // Set revealed clips state, from URL params.
        let initShow = _.concat([], this.$route.query.revealed);
        _.forEach(this.clips, (clip) => {
          clip.show = _.includes(initShow, clip.mp3);
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
  font-size: 22px;
  font-family: 'Merriweather', serif;
}

.bits {
  font-family: 'VT323', monospace;
  font-size: 30px;
  color: white;
  background: black;
}

.navbar {
      padding: 0 15px 0 15px
}

.card-new {
  height: fit-content;
  margin: 10px;
  margin-bottom: 30px;
  border: 1px solid rgba(10, 70, 0, 0.85);
  background-color: rgba(55, 130, 0, 0.18);
  cursor: pointer;
}

</style>
