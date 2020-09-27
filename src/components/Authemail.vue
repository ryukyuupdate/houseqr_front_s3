<template>
  <v-container>
    <v-row class="py-10">
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-col class="px-3">
            <v-card class="mx-auto" width="800px">
              <v-card-text>
                <div>
                  <p class="display-1 black--text text-center">
                    メール認証が完了しました
                  </p>
                </div>
                <v-divider></v-divider>
                <br>
                <v-col cols='12' class="text-center">
                  <v-btn
                    color="pink accent-3"
                    rounded
                    dark
                    block
                    x-large
                    @click="goMypage()"
                  >
                    <div class="font-weight-black">マイページへ</div>
                    <v-icon class="ml-1">mdi-account</v-icon>
                  </v-btn>
                </v-col>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
export default {
  data () {
    return {
      company_id: this.$route.query.company_id,
    }
  },
  created () {
    this.emailAuth()
  },
  methods: {
    emailAuth() {
      let params = new URLSearchParams();
      params.append('company_id', this.company_id);
      params.append('check_status', 1);
      this.$axios.post('http://api.housewatcher.ryukyuupdate.com/api/company/email_check_db', params)
    },
    goMypage() {
      this.$router.push(
        {
          path: '/mypage'
        }
      )
    },
  },
}
</script>

