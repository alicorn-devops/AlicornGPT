<template>
  <img alt="アリコーン株式会社" src="./assets/logo.png" class="logo" >
  <ChatBotVue  />
</template>

<script>
import ChatBotVue from './components/ChatBot.vue'
export default {
  name: 'App',
  components: {
    ChatBotVue
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.logo{
  width:128px;
  height: 128px;
}
</style>
