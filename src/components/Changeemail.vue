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
                    メールアドレスを変更
                  </p>
                </div>
                <v-divider></v-divider>
                <br>
                <v-form ref="form" @submit.prevent>
                  <div>
                    <v-text-field
                      v-model="companyInfo.email"
                      label="メールアドレス"
                      outlined
                      clearable
                      :rules="[rules.required]"
                      inputmode="email"
                    ></v-text-field>
                  </div>
                </v-form>
                <v-row align="center">
                </v-row>
                <v-alert
                  :value="!companyInfo.email_check"
                  prominent
                  type="error"
                >
                  <v-row align="center">
                    <v-col class="grow">
                      <strong class="mr-2">
                        メールの認証がまだです、認証を行ってくだささい。<br>
                        クリックすると登録したメールアドレスへメールが送信されます。
                      </strong>
                      <v-btn
                        rounded 
                        color="#FFFFFF"
                        outlined
                        @click="emailCertification()"
                      >
                        認証を行う
                        <v-icon>mdi-email-check-outline</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
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
                      @click="companyChange()"
                      v-show="this.companyInfo.email"
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
      emailCertification() {
        let params = new URLSearchParams();
        params.append('email', this.companyInfo.email);
        params.append('company_name', this.companyInfo.company_name);
        params.append('officer_name', this.companyInfo.officer_name);
        params.append('company_id', this.companyInfo.id);
        params.append('certification_type', 'email_address');
        this.$axios.post('http://api.housewatcher.ryukyuupdate.com/api/notification/certification', params)
        this.backPage()
      },
      emailCertificationStatusNo() {
        let params = new URLSearchParams();
        params.append('company_id', this.companyInfo.id);
        params.append('check_status', 0);
        this.$axios.post('http://api.housewatcher.ryukyuupdate.com/api/company/email_check_db', params)
      },
      backPage() {
        this.$router.push(
          {
            path: '/mypage'
          }
        )
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
          this.emailCertificationStatusNo()
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
      params.append('idtoken', this.idToken);
      this.$axios.post('http://api.housewatcher.ryukyuupdate.com/api/company/info', params)
      .then((response) => {
        vm.companyInfo = response.data
      })
    },
  }
</script>