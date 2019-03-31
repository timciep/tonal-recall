<template>
  <div v-if="showModal">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Editing: <i>{{ clip.name ? clip.name : 'New Clip' }}</i></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" @click="$emit('close')">&times;</span>
                </button>
              </div>

              <div class="modal-body">
                <div class="form">

                  <div class="form-group row">
                    <label for="name" class="col-sm-2 col-form-label">Answer</label>
                    <div class="col-sm-10">
                      <input v-model="clip.name" 
                      type="text" 
                      id="name" 
                      class="form-control"
                      placeholder="Clip Title">
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="name" class="col-sm-2 col-form-label">Notes</label>
                    <div class="col-sm-10">
                      <input v-model="clip.notes" 
                      type="text" 
                      id="notes" 
                      class="form-control"
                      placeholder="Notes">
                    </div>
                  </div>

                  <hr>

                  <h5>Add/Replace Audio</h5>

                  <div class="form-group row">
                      <label for="clip-sm" class="col-sm-2 col-form-label">Short</label>
                      <div class="col-sm-10">
                        <input @change="fileSm"
                        type="file" 
                        accept="audio/*" 
                        class="form-control-file" 
                        id="clip-sm">
                      </div>
                    </div>

                  <div class="form-group row">
                    <label for="clip-md" class="col-sm-2 col-form-label">Medium</label>
                    <div class="col-sm-10">
                      <input @change="fileMd"
                      type="file" 
                      accept="audio/*" 
                      class="form-control-file" 
                      id="clip-md">
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="clip-lg" class="col-sm-2 col-form-label">Long</label>
                    <div class="col-sm-10">
                      <input @change="fileLg"
                      type="file" 
                      accept="audio/*" 
                      class="form-control-file" 
                      id="clip-lg">
                    </div>
                  </div>

                </div>
              </div>

              <div class="modal-footer">
                <button type="button" 
                class="btn btn-secondary" 
                @click="$emit('close')">
                    Close
                </button>
                <button type="button"
                class="btn btn-primary"
                @click="$emit('save', files)">
                    Save
                </button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>


<script>

var _ = require('lodash');

export default {
  name: 'EditModal',

  data: function() {
    return {
      files: {},
    }
  },

  props: {
    clip: Object
  },

  computed: {
      showModal: function() {
          return ! _.isEmpty(this.clip);
      }
  },

  methods: {
    fileSm: function(event) {
      this.files.sm = event.target.files[0];
    },
    fileMd: function(event) {
      this.files.md = event.target.files[0];
    },
    fileLg: function(event) {
      this.files.lg = event.target.files[0];
    },
  }

}
</script>


<style scoped>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

</style>
