<template>
  <div id="app">
    <div id="input-fields">
      <input type="text" v-model="val1">
      <select v-model="op">
        <option value="add">+</option>
        <option value="sub">-</option>
        <option value="mul">*</option>
        <option value="div">/</option>
        <option value="randomOperation">Operation that does not exist</option>
      </select>
      <input type="text" v-model="val2">
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
      if (this.validateInput()) {
        axios.get(`http://localhost:3000/${this.op}?val1=${this.val1}&val2=${this.val2}`)
          .then(response => this.result = response.data)
          .catch(err => this.result = err);
      }
    },
    validateInput() {
      let regex = /^[\d]{1,20}(\.[\d]*)?$/;
      if (this.val1 === '' || this.val2 === '') {
        this.result = 'empty input';
        return false;
      }
      else if (!this.val1.match(regex) || !this.val2.match(regex)){
        this.result = 'You can only enter digits';
        return false;
      }
      else {
        return true;
      }
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

input[type="text"] {
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
