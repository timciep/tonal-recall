<template>
  <div id="app">
    <div class="container-fluid">

      <Loading v-if="saving"></Loading>

      <EditModal 
        v-if="showEdit"
        :clip="editingClip"
        @close="cancelEdit"
        @save="saveClips">
      </EditModal>

      <nav class="navbar fixed-top navbar-light bg-dark">
        
        <a href="/" target="_blank" class="navbar-brand"><h1>TONAL RECALL</h1></a>

        <div class="nav-item">
          <button
            @click="showHide"
            type="button" 
            class="btn btn-nav"
          >Reveal/Hide All
          </button>
        </div>
      </nav>

      <br><br><br>

      <div class="row">

        <Clip 
          v-for="(clip, index) in clips" 
          :key="index" 
          :clip="clip"
          @updateRevealed="updateRoute"
          @edit="startEditing($event)"
          @delete="deleteClip($event)">
        </Clip>

        <div class="col-lg-4">
          <div @click="addClip" class="card card-new">
            <div class="card-body">
              <i class="fas fa-plus"></i> &nbsp;&nbsp;<b>Add Clip</b>
            </div>
          </div>
        </div>

      </div>

      <hr>

      <div class="row">
        <div class="col">
          Built by <a href="https://timcieplowski.com" target="_blank">Tim Cieplowski <i class="fas fa-external-link-alt"></i></a>
        </div>

        <!-- <div v-if="clips.length > 5" class="col">
          <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
            <input type="hidden" name="cmd" value="_donations" />
            <input type="hidden" name="business" value="PQX2U7ZGU3HWC" />
            <input type="hidden" name="currency_code" value="USD" />
            <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
            <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" /> Help keep this site running!
          </form>
        </div> -->
      </div>
      <br>
    </div>
  </div>
</template>

<script>
import Clip from './components/Clip.vue';
import EditModal from './components/EditModal.vue';
import Loading from './components/Loading.vue';

const awsClient = require('../../helpers/aws.js');
const _ = require('lodash');
const axios = require('axios');

export default {
  name: 'app',
  components: {
    Clip, EditModal, Loading
  },

  data: function() {
    return {
      clips: [],
      editingClip: {},
      saving: false,
      gamePath: 'games/' + this.$route.params.game + '/',
      clipsJsonFile: 'https://s3.us-east-2.amazonaws.com/audio-bits-data/games/' + this.$route.params.game + '/game.json',
    }
  },

  computed: {
    data: function() {
      return {
        clips: this.clips
      }
    },

    revealed: function() {
      return this.clips.filter(clip => clip.show != false)
                .map(clip => clip.mp3);
    },

    showEdit: function() {
      return ! _.isEmpty(this.editingClip);
    },
  },

  methods: {
    updateRoute() {
      this.$router.push({query: {'revealed': this.revealed}});
    },

    startEditing(editClip) {
      if (this.$route.params.game != 'example') {
        this.editingClip = editClip
      } else {
        alert("Editing is disabled on Example game.");
      }
    },

    showHide() {
      let newValue = !this.clips[0].show
      this.clips.map(clip => clip.show = newValue);
      this.updateRoute();
    },

    cancelEdit() {
      this.saveData();
      this.editingClip = {};
    },

    saveData() {
      // Update remote JSON.
      if (this.$route.params.game != 'example') {
        this.uploadFile(this.gamePath + 'game.json', JSON.stringify(this.data));
      } else {
        alert("Editing is disabled on Example game.");
      }
    },

    saveClips(files) {
      if (files.sm) {
        this.uploadFile(this.gamePath + this.editingClip.mp3 + '/sm.mp3', files.sm);
        this.editingClip.files.sm = true;
      }
      if (files.md) {
        this.uploadFile(this.gamePath + this.editingClip.mp3 + '/md.mp3', files.md);
        this.editingClip.files.md = true;
      }
      if (files.lg) {
        this.uploadFile(this.gamePath + this.editingClip.mp3 + '/lg.mp3', files.lg);
        this.editingClip.files.lg = true;
      }

      this.saveData();

      // Close edit modal.
      this.editingClip = {};
    },

    uploadFile(path, file) {
      this.saving = true;
      awsClient.s3.upload({
        Key: path,
        Body: file,
        ACL: 'public-read'
      }, (err) => {
        if (err) {
          console.log(err);
          alert('Error uploading ' + path + ': ', err.message);
        }
        console.log('Uploaded: ' + path);
        this.saving = false;
      });
    },

    addClip() {
      if (this.$route.params.game != 'example') {
        let newClip = {
          mp3: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          files: {
            sm: false,
            md: false,
            lg: false,
          },
          style: "single",
          name: "",
          notes: "",
          show: false,
        };

        this.clips.push(newClip);

        this.saveData();

        this.editingClip = newClip;
      } else {
        alert("Editing is disabled on Example game.");
      }
    },

    deleteClip(clip) {
      if (confirm("Are you sure?")) {
        _.remove(this.clips, function(_clip) {
          return _clip.mp3 == clip.mp3;
        });

        this.saveData();
      }
    }
  },

  created: function() {
    // Get clips JSON.
    axios.get(this.clipsJsonFile)
      .then((response) => {
        this.clips = response.data.clips || [];
        // Set revealed clips state, from URL params.
        let initShow = _.concat([], this.$route.query.revealed);
        _.forEach(this.clips, (clip) => {
          clip.show = _.includes(initShow, clip.mp3);
        });
      })
      .catch(function (error) {
        console.log(error);
        alert("Game not found, redirecting...");
        window.location.href = "/";
      });
  }
     
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  padding-top: 10px;
}

h1 {
  font-family: 'Teko', sans-serif;
  font-size: 40px;
  color: #e67400;
  margin-bottom: 0;
      padding-top: 5px;
}

.navbar {
  padding: 0 15px 0 15px;
}

.card-new {
  height: fit-content;
  margin-bottom: 30px;
  border: 1px solid rgba(10, 70, 0, 0.85);
  background-color: rgba(55, 130, 0, 0.18);
  cursor: pointer;
}

.card-new:hover {
  background-color: rgba(55, 130, 0, 0.28);
}

.btn-nav {
    color: black;
    background-color: #e2e3e5;
    border-color: #d6d8db;
}

</style>
