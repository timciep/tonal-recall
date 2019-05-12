<template>
  <div class="container-fluid">
    <div class="row bg-top">
      <div class="col-lg-12 text-center">
        <h1 class="mt-3">TONAL RECALL</h1>
      </div>
    </div>
    <div class="row p-4">
      <div class="col-lg-12 text-center">
        <h4 class="font-italic">Audio-clip guessing-game builder</h4>
      </div>
    </div>

    <div class="row bg-mid p-4">
      <div class="col-lg-6">
        <div class="card mx-auto">
          <div class="card-body">
            <h5 class="card-title">Open Existing Game</h5>
            <div class="form form-inline">
              <div class="form-group">
                <input v-model="code" 
                @keyup.enter="goToGame()" 
                type="text" class="form-control" id="code" 
                placeholder="Game Code">
              </div>
              <button @click="goToGame()" 
              type="button" class="btn btn-primary">
                Go <i class="fas fa-arrow-right"></i>
              </button>
            </div>
            <div class="text-center">
              <hr class="m-4">
              <a href="https://tonalrecall.us/app/#/example" target="_blank" 
              role="button" 
              class="btn btn-outline-primary">
                Open Example Game <i class="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card mx-auto">
          <div class="card-body">
            <h5 class="card-title">Create New Game</h5>
            <div class="form">
              <div class="form-group row">
                <label for="email" class="col-sm-3 col-form-label">Email</label>
                <div class="col-sm-9">
                  <input @keyup.enter="newGame()"
                  v-model="email" 
                  type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                  <small id="emailHelp" class="form-text text-muted">For re-access code.</small>
                </div>
              </div>

              <button @click="newGame()" type="button" class="btn btn-outline-success" :disabled="saving">
                <i class="fas fa-plus-square"></i> Create
              </button>
            </div>
            
          </div>
        </div>
      </div>
        
    </div>

   <div class="row">
      <div class="col">
        <p class="p-3">Built by <a href="https://timcieplowski.com" target="_blank">Tim Cieplowski <i class="fas fa-external-link-alt"></i></a></p>
      </div>
      <div class="col">
        <p class="p-3">Feedback: <a href="mailto:tonalrecall1@gmail.com" target="_blank">tonalrecall1@gmail.com</a></p>
      </div>
    </div>
  </div>
</template>

<script>
const uuidv1 = require('uuid/v1');
const awsClient = require('../../helpers/aws.js');
// const axios = require('axios');
import * as emailjs from 'emailjs-com';

export default {
  name: 'app',
  components: {
    
  },

  data: function() {
    return {
      code: '',
      email: '',
      saving: false,
    }
  },

  methods: {
    goToGame() {
      if (this.code != '') {
        window.location.href = "/app/#/" + this.code;
      }
    },

    newGame() {
      this.saving = true;

      let uuid = uuidv1();

      let file = JSON.stringify({
        'code': uuid,
        'email': this.email,
        'clips': []
      });

      awsClient.s3.upload({
        Key: 'games/' + uuid + '/game.json',
        Body: file,
        ACL: 'public-read'
      }, (err) => {
        if (err) {
          console.log(err);
          alert('Error uploading: ', err.message);
        }
        this.code = uuid;

        this.sendEmail();
      });
    },

    sendEmail() {
      var templateParams = {
          code: this.code,
          user_email: this.email
      };

      emailjs.send('gmail','template_5cTsiajE', templateParams, 'user_qAXyoJVqRteSBFxChxk0b')
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
          this.goToGame();
        }, function(err) {
          console.log('FAILED...', err);
        });
    }

  },

 
     
}
</script>


<style>
h1 {
  font-family: 'Teko', sans-serif;
  font-size: 4rem;
  color: #e67400;
}

.bg-top {
  background-color: #343a40;
}

.bg-mid {
  background-color: #e2e3e5;
}

.card {
  border: 1px solid rgba(0, 0, 0, 0.85);
  margin-bottom: 15px;
}

.btn-outline-success {
    color: #196b2b;
    border-color: #196b2b;
}

.btn-outline-success:hover {
    color: #fff;
    background-color: #196b2b;
}
</style>
