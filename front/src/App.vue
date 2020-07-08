<template>
  <div id="app">
    <div id="input-fields">
      <input type="number" v-model="val1">
      <select v-model="op">
        <option value="add">+</option>
        <option value="sub">-</option>
        <option value="mul">*</option>
        <option value="div">/</option>
      </select>
      <input type="number" v-model="val2">
    </div>
    <button @click="calc()">Calculate</button>
    <div id="result">{{result}}</div>
  </div>
</template>

<script>
const axios = require('axios').default;

export default {
  name: 'App',
  data() {
    return {
      val1: '0',
      val2: '0',
      op: 'add',
      result: ''
    }
  },
  methods: {
    calc() {
      const url = 'http://localhost:3000/'+this.op + '?val1='+this.val1+"&val2="+this.val2;
      axios.get(url)
        .then(response => this.result = response.data)
        .catch(function(err){
          console.log(err);
          this.result = "There was an error";
        });
    }
  }
}


</script>

<style>
#app {
  width: 250px;
  margin: 100px auto 0;
  padding: 10px;
  border: 1px solid black;
  background-color: grey;
  height: 250px;
}

#input-fields {
  display: grid;
  grid-template-columns: 1fr 30px 1fr;
  grid-gap: 10px;
  width: 100%;
}

input[type="number"] {
  padding: 0;
  margin: 0;
  width: calc(100% - 4px);
}

button {
  width: 150px;
  height: 30px;
  margin-top: 20px;
}

#result {
  margin-top: 30px;
}

</style>
