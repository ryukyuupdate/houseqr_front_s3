<template>
  <v-app>
    <v-navigation-drawer class="rounded-0" v-if="$store.getters.idToken && $store.getters.printMode" app v-model="drawer" clipped dark color="#000000">
      <v-container>
        <v-list dense nav rounded>
          <v-list-item v-for="nav_list in nav_lists" :key="nav_list.name" :to="nav_list.link">
            <v-list-item-icon>
              <v-icon>{{ nav_list.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                <div class="font-weight-black">{{ nav_list.name }}</div>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
      <v-footer
        padless
        absolute
        class="font-weight-medium"
        color="#000000"
      >
        <v-col
          class="text-center"
          cols="12"
        >
          {{ new Date().getFullYear() }} — RyukyuUpdate
        </v-col>
      </v-footer>
    </v-navigation-drawer>
    <v-app-bar v-if="$store.getters.idToken && $store.getters.printMode" app clipped-left flat color="#FFFFFF">
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
        <v-toolbar-items>
          <v-row align="center" justify="center">
            <v-btn text to="/">
              <div class="font-weight-black">HouseQR</div>
            </v-btn>
          </v-row>
        </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
      <v-menu offset-y>
        <template v-slot:activator="{on}">
        <v-btn v-on="on" text>
          <v-btn
            color="#000000"
            dark
            outlined
          >
            <div class="font-weight-black">{{ $store.getters.company_name }}</div>
          </v-btn>
        </v-btn>
        </template>
        <v-list color="#000000" dark>
          <v-list-item v-for="support in supports" :key="support.name" :to="support.link">
            <v-list-item-icon>
              <v-icon>{{ support.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ support.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>



<script>
export default {
  data(){
    return{
      drawer: true,
      supports:[
        {
          name: 'マイページ',
          icon: 'mdi-account-outline',
          link:'/mypage'
        },
        {
          name: '管理物件',
          icon: 'mdi-home-outline',
          link:'/propertytable'
        },
        {
          name: 'ログアウト',
          icon: 'mdi-logout',
          link:'/logout'
        },
      ],
      nav_lists:[
        {
          name: 'マイページ',
          icon: 'mdi-account-outline',
          link:'/mypage'
        },
        {
          name: '管理物件',
          icon: 'mdi-home-outline',
          link:'/propertytable'
        },
        {
          name: 'ログアウト',
          icon: 'mdi-logout',
          link:'/logout'
        },
      ]
    }
  },
};
</script>