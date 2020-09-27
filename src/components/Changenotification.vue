<template>
  <v-container>
    <v-row class="my-2">
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-col class="px-3">
            <v-card class="mx-auto" width="800px">
              <v-card-text>
                <div>
                  <p class="display-1 black--text text-center">
                    通知方法を変更
                  </p>
                </div>
                <v-divider></v-divider>
                <br>
                <v-form>
                  <h4 class="subtitle-1 mb-1">通知の確認方法</h4>
                  <v-row>
                    <v-col>
                      <v-checkbox class="ma-0" v-model="companyInfo.notification_email" label="メールで通知を確認"></v-checkbox>
                      <v-checkbox class="ma-0" v-model="companyInfo.notification_phone" label="電話で通知を確認"></v-checkbox>
                    </v-col>
                  </v-row>
                </v-form>
                <v-alert :value="alert" dense type="error">
                  どちらかを選択してください
                </v-alert>
                <v-col cols='12' class="text-center">
                  <div class="my-2 text-end">
                    <v-btn
                      class="mx-1"
                      tile
                      color="#000000"
                      dark
                      outlined
                      @click="backPage()"
                    >
                      <div class="font-weight-black">キャンセル</div>
                      <v-icon class="ml-1">mdi-undo-variant</v-icon>
                    </v-btn>
                    <v-btn
                      tile
                      color="#000000"
                      dark
                      @click="notificationCheck()"
                      v-show="this.companyInfo.officer_name"
                    >
                      <div class="font-weight-black">保存</div>
                      <v-icon class="ml-1">mdi-check</v-icon>
                    </v-btn>
                  </div>
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
        companyInfo: '',
        alert: false,
      }
    },
    methods: {
      notificationCheck(){
        this.alert = false
        if (this.companyInfo.notification_email) {
          this.companyInfo.notification_email = 1
        } else {
          this.companyInfo.notification_email = 0
        }
        if (this.companyInfo.notification_phone) {
          this.companyInfo.notification_phone = 1
        } else {
          this.companyInfo.notification_phone = 0
        }
        if (this.companyInfo.notification_email == 0 && this.companyInfo.notification_phone == 0) {
          this.alert = true
        } else {
          this.companyChange()
        }
      },
      backPage() {
        this.$router.push(
          {
            path: '/mypage',
            query: {
              tab: '1',
            }
          }
        ).catch(() => {});
      },
      companyChange(){
        const vm = this;
        let params = new URLSearchParams();
        params.append('id', this.companyInfo.id);
        params.append('email', this.companyInfo.email);
        params.append('password', this.companyInfo.password);
        params.append('company_name', this.companyInfo.company_name);
        params.append('officer_name', this.companyInfo.officer_name);
        params.append('phone_number', this.companyInfo.phone_number);
        params.append('notification_email', this.companyInfo.notification_email);
        params.append('notification_phone', this.companyInfo.notification_phone);
        params.append('idToken', this.companyInfo.idToken);
        this.$axios.post('http://api.housewatcher.ryukyuupdate.com/api/company/change', params)
        .then((response) => {
          vm.companyInfo = response.data
          this.$store.commit('updateIdToken', this.companyInfo.idToken)
          this.$router.push(this.$route.query.redirect)
          this.backPage()
        })
      }
    },
    beforeCreate () {
      const vm = this;
      vm.idToken = this.$store.state.idToken
      let params = new URLSearchParams();
      params.append('idtoken', vm.idToken);
      this.$axios.post('http://api.housewatcher.ryukyuupdate.com/api/company/info', params)
      .then((response) => {
        vm.companyInfo = response.data
      })
    },
  }
</script>

