<template>
  <q-page>
    <div class="q-pa-md jus">
      <div class="row">
        <!-- <q-input type="text" v-model="language" id="language" label="言語" class="q-pa-md col col-md-8" /> -->
        <q-select
          v-model="language"
          :options="langOptions"
          use-input
          use-chips
          new-value-mode="add"
          label="言語"
          id="language"
          class="q-pa-md col col-md-8"
          @new-value="newValueHandle"
          @input="handleSelection"
          @filter="filterLangs"
        />
      </div>
      <div class="row">
        <q-input
          type="text"
          v-model="functionName"
          id="function"
          label="関数名"
          class="q-pa-md col col-md-8"
          placeholder="生成したい関数名を入力してください"
        />
      </div>
      <div class="row">
        <q-input
          type="text"
          v-model="description"
          autogrow
          id="description"
          label="機能概要"
          class="q-pa-md col col-md-8"
          placeholder="実現したい機能を入力してください"
        />
      </div>
      <div class="row">
        <q-btn
          color="primary"
          label="作成する"
          @click="callAPI"
          class="q-pa-md"
        />
      </div>
      <div v-if="apiResult" class="code row">
        <pre v-html="formattedResult" class="q-ma-md codebk"></pre>
      </div>
    </div>
  </q-page>
</template>
<script>
import axios from "axios";
import hljs from "highlight.js";
import "highlight.js/styles/a11y-dark.css";
import { QInput, QBtn, useQuasar } from "quasar";
let $q;
const langListKey = "LANG_LIST";
const historyKey = "HISTORY_KEY";
let historys = [];
if (localStorage.getItem(historyKey) !== null) {
  historys = JSON.parse(localStorage.getItem(historyKey));
}
let langOptions = [
  "C#",
  "java",
  "javascript",
  "python",
  "go",
  "sql",
  "VB",
  "VB.net",
  "VBS",
  "C",
  "C++",
  "ruby",
  "php",
];
if (localStorage.getItem(langListKey) != null) {
  langOptions = JSON.parse(localStorage.getItem(langListKey));
}
export default {
  setup() {
    $q = useQuasar();
  },
  name: "AlicornGPT",
  components: {
    QInput,
    QBtn,
  },
  data() {
    return {
      langOptions: langOptions,
      language: "",
      functionName: "",
      description: "",
      apiResult: "",
      historys: historys,
    };
  },
  computed: {
    formattedResult() {
      if (!this.apiResult) return "";
      let code = this.apiResult;
      // 将Markdown转换为HTML
      // const html = marked(this.apiResult);
      // 用highlight.js对代码进行高亮
      const highlighted = hljs.highlightAuto(code).value;
      // 将HTML字符串包装在<pre>标签内
      return `<pre><code>${highlighted}</code></pre>`;
    },
  },
  methods: {
    callAPI() {
      this.showLoading();
      axios
        .post("https://alicornchatgpt.azurewebsites.net/code", {
          language: this.language,
          function: this.functionName,
          description: this.description,
        })
        .then((response) => {
          console.log(response);
          this.apiResult = response.data;
          historys.push({
            language: this.language,
            function: this.functionName,
            description: this.description,
            result: response.data,
          });
          localStorage.setItem(historyKey, JSON.stringify(historys));
          this.$emit("update");
        })
        .catch((error) => {
          console.log(error);
          this.apiResult = error.message;
        })
        .finally(() => {
          this.hideLoading();
        });
    },
    showLoading() {
      $q.loading.show({
        message: "AIは解答を作成しています...",
        boxClass: "bg-grey-2 text-grey-9",
        spinnerColor: "primary",
      });
    },
    hideLoading() {
      $q.loading.hide();
    },
    newValueHandle(newVal, done) {
      if (newVal.trim() === "") return;
      langOptions.push(newVal);
      localStorage.setItem(langListKey, JSON.stringify(langOptions));
      done(newVal);
    },
    filterLangs(val, update) {
      if (val === "") {
        update(() => {
          this.langOptions = langOptions;
        });
      }
      let lang = val.toLowerCase();

      update(() => {
        this.langOptions = langOptions.filter(
          (x) => x.toLowerCase().indexOf(lang) > -1
        );
      });
    },
  },
};
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
.code {
  background-color: white;
  text-align: left;
  min-width: 400px;
  min-height: 200px;
  padding: 5px;
  display: block;
}
textarea {
  width: 50%;
  min-height: 60px;
  border: gray 1px solid;
  border-radius: 5px;
}
.code {
  color: white;
  background-color: black;
  overflow: auto;
}
/*
.input{
  width: 50%;
  min-width: 200px;
}*/
</style>
