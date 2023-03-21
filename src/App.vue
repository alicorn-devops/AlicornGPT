<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          Alicorn GPT
        </q-toolbar-title>

        <div>Alicorn AI Creator Ver1.00</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      no-swipe-open
      bordered
      class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>作成履歴</q-item-label>
        <q-item clickable v-for="(history,index) in historys" :key="index">
          <q-item-section avatar>
            <q-chip>
              {{history.language}}
            </q-chip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{history.function}}</q-item-label>
            <q-item-label caption>{{history.description}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item-label header>関連リンク</q-item-label>
        <q-item clickable tag="a" target="_blank" href="https://www.alicorns.co.jp">
          <q-item-section avatar>
            <q-icon name="business" />
          </q-item-section>
          <q-item-section>
            <q-item-label>アリコーン株式会社</q-item-label>
            <q-item-label caption>www.alicorns.co.jp</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://github.com/quasarframework/">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github</q-item-label>
            <q-item-label caption>github.com/quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://chat.quasar.dev">
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Discord Chat Channel</q-item-label>
            <q-item-label caption>chat.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://forum.quasar.dev">
          <q-item-section avatar>
            <q-icon name="forum" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Forum</q-item-label>
            <q-item-label caption>forum.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://twitter.com/quasarframework">
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Twitter</q-item-label>
            <q-item-label caption>@quasarframework</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
        <!-- <q-img class="absolute-top" src="./assets/logo.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="./assets/logo.png">
            </q-avatar>
            <div class="text-weight-bold">Razvan Stoenescu</div>
            <div>@rstoenescu</div>
          </div>
        </q-img> -->
    </q-drawer>

    <q-page-container>
      <q-page padding>
        <ChatBot @update="updateHistory"/>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
// import HelloWorld from './components/HelloWorld.vue'
import ChatBot from './components/ChatBot.vue'
export default {
  name: 'LayoutDefault',

  components: {
    ChatBot
  },

  setup () {
     const historyKey="HISTORY_KEY";
    let historys=[];
    if(localStorage.getItem(historyKey)!==null){
      historys=JSON.parse(localStorage.getItem(historyKey));
    }
    return {
      leftDrawerOpen: ref(false),
      historys:historys
    }
  },
  methods:{
    updateHistory(){
        const historyKey="HISTORY_KEY";
        let historys=[];
        if(localStorage.getItem(historyKey)!==null){
          historys=JSON.parse(localStorage.getItem(historyKey));
        }
        this.historys=historys;
    },
  },
}
</script>
