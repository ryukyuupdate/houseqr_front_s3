<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-col class="px-3">
            <v-card class="mx-auto" width="400px">
              <v-card-text>
                <div class="text-center">
                  HouseQR
                </div>
                <div>
                  <p class="display-1 black--text text-center">
                    ログイン
                  </p>
                </div>
                <v-divider></v-divider>
                <br>
                <v-form>
                  <div>
                    <v-form ref="form" @submit.prevent>
                      <v-text-field
                        v-model="email"
                        label="メールアドレス"
                        outlined
                        clearable
                        :rules="[rules.required]"
                        inputmode="email"
                      ></v-text-field>
                    </v-form>
                  </div>
                  <div>
                    <v-form ref="form" @submit.prevent>
                      <v-text-field
                        @keyup.enter="companyLogin()"
                        outlined
                        v-model="password"
                        :append-icon="password_show ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required]"
                        :type="password_show ? 'text' : 'password'"
                        name="input-10-2"
                        label="パスワード"
                        class="input-group--focused"
                        @click:append="password_show = !password_show"
                      ></v-text-field>
                    </v-form>
                  </div>
                  <v-alert :value="alert" dense type="error">
                    <strong>メールアドレス</strong>または<strong>パスワード</strong>が違います
                  </v-alert>
                </v-form>
                <div class="text-center">
                  <v-col>
                    <v-btn
                      tile
                      color="#000000"
                      dark
                      block
                      @click="companyLogin()"
                    >
                      <div class="font-weight-black">ログイン</div>
                      <v-icon>mdi-home-import-outline</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      tile
                      color="#000000"
                      dark
                      outlined
                      block
                      @click="goRegister()"
                    >
                      <div class="font-weight-black">今すぐ登録する</div>
                      <v-icon>mdi-account-plus-outline</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      tile
                      color="#000000"
                      dark
                      text
                      block
                      @click="goHome()"
                    >
                      <div class="font-weight-black">HouseQRについて</div>
                    </v-btn>
                  </v-col>
                </div>
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
        email: '',
        password: '',
        idToken: '',
        alert: false,
        password_show: false,
        rules: {
          required: value => !!value || '入力してください.',
        },
      }
    },
    methods: {
      goHome(){
        this.$router.push({ path: '/'})
      },
      goRegister(){
        this.$router.push({ path: '/register'})
      },
      goMypage(){
        this.$router.push({ path: '/mypage'})
      },
      companyLogin(){
        this.alert = false
        let vm = this;
        let params = new URLSearchParams();
        params.append('email', this.email);
        params.append('password', this.password);
        this.$axios.post('//api.housewatcher.ryukyuupdate.com/api/company/login', params)
        .then((response) => {
          vm.idToken = response.data.idToken
          if (response.data.idToken == 'loginError') {
            vm.alert = true
          } else {
            this.login();
          }
        })
      },
      login() {
        this.$store.commit('updateIdToken', this.idToken)
        this.$store.commit('updateprintMode', true)
        this.$router.push(this.$route.query.redirect)
        this.goMypage()
      },
      userRegister(){
        let vm = this;
        let params = new URLSearchParams();
        params.append('email', this.email);
        params.append('password', this.password);
        this.$axios.post('//api.housewatcher.ryukyuupdate.com/api/user/userregister', params)
        .then((response) => {
          vm.idToken = response.data.idToken
          this.login(response.data.idToken);
          vm.response_data = response.data
        })
      },
    }
  }
</script>

