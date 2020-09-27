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
                    会社名を変更
                  </p>
                </div>
                <v-divider></v-divider>
                <br>
                <v-form>
                  <v-row justify="center">
                    <v-col cols='12' class="text-center">
                      <div>
                        <v-form ref="form" @submit.prevent>
                          <v-text-field
                            v-model="companyInfo.company_name"
                            label="会社名"
                            outlined
                            clearable
                            :rules="[rules.required]"
                            inputmode="kana"
                          ></v-text-field>
                        </v-form>
                      </div>
                    </v-col>
                  </v-row>
                </v-form>
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
                      @click="companyChange()"
                      v-show="this.companyInfo.company_name"
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
        rules: {
          required: value => !!value || '入力してください.',
        },
      }
    },
    methods: {
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
        let vm = this;
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
      let vm = this;
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

