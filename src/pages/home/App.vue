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

    <div class="row bg-light p-4">
      <div class="col-lg-6">
        <div class="card mx-auto" style="width: 24rem;">
          <div class="card-body">
            <h5 class="card-title">Open Existing Game</h5>
            <div class="form form-inline">
              <div class="form-group">
                <input type="text" class="form-control" id="code" placeholder="Game Code">
              </div>
              <button type="button" class="btn btn-primary">Go <i class="fas fa-arrow-right"></i></button>
            </div>
            <div class="text-center">
              <hr class="m-4">
              <button type="button" class="btn btn-primary">Open Example Game <i class="fas fa-external-link-alt"></i></button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card mx-auto text-center" style="width: 24rem;">
          <div class="card-body">
            <h5 class="card-title text-center">Create New Game</h5>
            <button type="button" class="btn btn-outline-success"><i class="fas fa-plus-square"></i> Create</button>
          </div>
        </div>
      </div>
        
    </div>

   <div class="row">
      <div class="col">
        <p class="p-3">Built by <a href="https://timcieplowski.com" target="_blank">Tim Cieplowski <i class="fas fa-external-link-alt"></i></a></p>
      </div>
    </div>
  </div>
</template>

<script>
// const awsClient = require('../../helpers/aws.js');
// const _ = require('lodash');
// const axios = require('axios');

export default {
  name: 'app',
  components: {
    
  },

  data: function() {
    return {

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
</style>
