<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-col cols='12' class="text-center">
            <div class="my-2">
              <v-btn
                tile
                color="#000000"
                dark
                @click="logout()"
              >
                <div class="font-weight-black">ログアウト</div>
                <v-icon class="ml-1">mdi-home-export-outline</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
export default {
  methods: {
    logout () {
      this.$store.commit('updateIdToken', '')
      if (this.$route.meta.requiresAuth) {
        this.$router.push({
          path: '/login',
          query: { redirect: 'mypage' }
        })
      }
    }
  }
}
</script>