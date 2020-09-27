<template>
  <v-container>
    <v-row class="my-2">
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-col class="px-3">
            <v-card class="mx-auto" width="800px">
              <v-card-text>
                <div class="text-center">
                  マイページを変更
                </div>
                <div>
                  <p class="display-1 black--text text-center">
                    パスワードを変更
                  </p>
                </div>
                <v-divider class="mx-4"></v-divider>
                <br>
                <div>
                  <v-form ref="form" @submit.prevent>
                    <v-text-field
                      outlined
                      v-model="nowPassword"
                      :append-icon="password_show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required]"
                      :type="password_show1 ? 'text' : 'password'"
                      name="input-10-2"
                      label="現在のパスワード"
                      class="input-group--focused"
                      @click:append="password_show1 = !password_show1"
                    ></v-text-field>
                  </v-form>
                </div>
                <div>
                  <v-form ref="form" @submit.prevent>
                    <v-text-field
                      outlined
                      v-model="newPassword"
                      :append-icon="password_show2 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="password_show2 ? 'text' : 'password'"
                      name="input-10-2"
                      label="新しいパスワード"
                      hint="At least 8 characters"
                      class="input-group--focused"
                      @click:append="password_show2 = !password_show2"
                    ></v-text-field>
                  </v-form>
                </div>
                <div>
                  <v-form ref="form" @submit.prevent>
                    <v-text-field
                      outlined
                      v-model="newPassword2"
                      :append-icon="password_show3 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="password_show3 ? 'text' : 'password'"
                      name="input-10-2"
                      label="新しいパスワードをもう一度入力"
                      hint="At least 8 characters"
                      class="input-group--focused"
                      @click:append="password_show3 = !password_show3"
                    ></v-text-field>
                  </v-form>
                </div>
                <v-alert
                  :value="alert"
                  dense
                  type="error"
                >
                  <strong>現在のパスワード</strong>または<strong>新しいパスワード</strong>が一致しません
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
                      @click="passwordCheck()"
                      v-show="this.newPassword2"
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
        password_show1: '',
        password_show2: '',
        password_show3: '',
        alert: false,
        companyInfo: '',
        nowPassword: '',
        newPassword: '',
        newPassword2: '',
        errorMessage: '',
        rules: {
          required: value => !!value || '入力してください.',
        },
      }
    },
    methods: {
      passwordCheck(){
        if (this.nowPassword == this.companyInfo.password) {
          if (this.newPassword == this.newPassword2) {
            this.companyInfo.password = this.newPassword
            this.errorMessage = 'ok'
            this.alert = false
            this.companyChange()
          } else {
            this.errorMessage = 'ng'
            this.alert = true
          }
        } else {
          this.errorMessage = 'ng'
          this.alert = true
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

