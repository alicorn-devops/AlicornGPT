<template>
  <div>
    <div>
      <label for="language">言語：</label>
      <input type="text" id="language" v-model="language" placeholder="プログラムの言語を入力してください" class="input" />
    </div>
    <div>
      <label for="function">関数名：</label>
      <input type="text" id="function" v-model="functionName" placeholder="関数名を指定してください" class="input"/>
    </div>
    <div>
      <label for="description">機能概要：</label>
      <textarea  type="text" id="description" v-model="description" placeholder="実現したい機能を入力してください" class="input"/>
    </div>
    <div>
      <button @click="callAPI">作成する</button>
    </div>
    <div v-if="apiResult" class="code">
      <pre v-html="formattedResult"></pre>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import hljs from 'highlight.js';
  import 'highlight.js/styles/a11y-dark.css';

  export default {
    data() {
      return {
        language: '',
        functionName: '',
        description: '',
        apiResult: ''
      }
    },
    computed: {
      formattedResult() {
        if (!this.apiResult) return '';
        let code=this.apiResult;
        // 将Markdown转换为HTML
       // const html = marked(this.apiResult);
        // 用highlight.js对代码进行高亮
        const highlighted = hljs.highlight('C#', code).value;
        // 将HTML字符串包装在<pre>标签内
        return `<pre><code>${highlighted}</code></pre>`;
      }
    },
    methods: {
      callAPI() {
        axios.post('https://alicornchatgpt.azurewebsites.net/code', {
          language: this.language,
          function: this.functionName,
          description: this.description
        })
        .then(response => {
          console.log(response);
          this.apiResult = response.data;
        })
        .catch(error => {
          console.log(error);
          this.apiResult = error.message;
        });
      }
    }
  }
</script>

<style scoped>
.chat-window {
  height: 300px;
  overflow-y: scroll;
}

.user-message {
  text-align: right;
  margin: 10px;
}

.ai-message {
  text-align: left;
  margin: 10px;
}
.code{
  background-color: lightgray;
  text-align: left;
  width: 80vw;
  min-height: 200px;
  padding: 5px;
  display: -ms-flexbox;
}
textarea{
  width: 50%;
  min-height: 60px;
  border:gray 1px solid;
  border-radius: 5px;
}
input{
  width: 20%;
  min-width: 200px;
  min-height: 30px;
  border:gray 1px solid;
  border-radius: 5px;
}
</style>
