<script setup lang="ts">
import { ref } from 'vue';
import io from "socket.io-client";

const name = ref<string>('')
const contents = ref<string>('')
const msgs = ref<Array<{
  content: string,
  name: string
}>>([])
/* 
{
  content: string,
  name: string
}
*/

const socket = io("http://118.27.118.30	:3000/");

socket.on('msg', (msg) => {
  msgs.value.push(JSON.parse(msg))
  console.log(msgs.value);
})

function add() {
  //ABCの中身をhello.valueに置き換える
  const json = JSON.stringify({
    content: contents.value,
    name: name.value
  })
  socket.send(json)
}


</script>
<template>
  <div v-for="msg in msgs">{{msg.name}}: {{msg.content}}</div>
  <input v-model="name" />
  <input v-model="contents" /><button @click="add()">送信</button>
</template>
