<template>
  <v-container>
    <v-row class="my-2">
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-col class="px-3">
            <v-card class="mx-auto" width="800px">
              <v-card-text>
                <div class="text-center">
                  HouseQR
                </div>
                <div>
                  <p class="display-1 black--text text-center">
                    アカウント作成
                  </p>
                </div>
                <v-divider></v-divider>
                <br>
                <v-form ref="form" @submit.prevent>
                    <v-text-field
                      v-model="company_name"
                      label="会社名"
                      outlined
                      clearable
                      :rules="[rules.required]"
                      inputmode="kana"
                    ></v-text-field>
                    <v-text-field
                      v-model="officer_name"
                      label="代表者名"
                      outlined
                      clearable
                      :rules="[rules.required]"
                      inputmode="kana"
                    ></v-text-field>
                    <v-text-field
                      v-model="phone_number"
                      label="電話番号"
                      outlined
                      clearable
                      :rules="[rules.required]"
                      inputmode="tel"
                    ></v-text-field>
                    <v-text-field
                      v-model="email"
                      label="メールアドレス"
                      outlined
                      clearable
                      :rules="[rules.required]"
                      inputmode="email"
                    ></v-text-field>
                    <v-text-field
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
                    <v-text-field
                      outlined
                      v-model="password2"
                      :append-icon="password_show ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required]"
                      :type="password_show ? 'text' : 'password'"
                      name="input-10-2"
                      label="パスワード 確認"
                      class="input-group--focused"
                      @click:append="password_show = !password_show"
                    ></v-text-field>
                    <h4 class="subtitle-1 mb-1">通知の確認方法</h4>
                    <v-row>
                      <v-col>
                        <v-checkbox class="ma-0" v-model="notification_email" label="メールで通知を確認"></v-checkbox>
                        <v-checkbox class="ma-0" v-model="notification_phone" label="電話で通知を確認"></v-checkbox>
                      </v-col>
                    </v-row>
                </v-form>
                <v-alert :value="alert" dense type="error">
                  <strong>入力項目</strong>が完全ではありません
                </v-alert>
                <v-alert :value="emailCheckAlert" dense type="error">
                  メールアドレスはすでに使用されています
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
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          tile
                          color="#000000"
                          dark
                          @click="registerCheck()"
                          v-bind="attrs" v-on="on"
                        >
                          <div class="font-weight-black">作成</div>
                          <v-icon class="ml-1">mdi-check</v-icon>
                        </v-btn>
                      </template>
                      <span>アカウント作成後 マイページ から<br>「電話認証」と「Eメール」の認証を行ってください</span>
                    </v-tooltip>
                  </div>
                </v-col>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-footer padless color="#FFFFFF" class="mt-14">
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>Ryukyuupdate</strong>
      </v-col>
    </v-footer>
  </v-container>
</template>



<script>
  export default {
    data () {
      return {
        password_show: '',
        email: '',
        password: '',
        password2: '',
        company_name: '',
        officer_name: '',
        phone_number: '',
        notification: '',
        notification_email: 1,
        notification_phone: 1,
        alert: false,
        emailCheckAlert: false,
        companyInfo: '',
        errorMessage: '',
        rules: {
          required: value => !!value || '入力してください.',
          min: v => v.length >= 8 || 'Min 8 characters',
        },
      }
    },
    methods: {
      companyRegister(){
        let vm = this;
        let params = new URLSearchParams();
        params.append('email', this.email);
        params.append('password', this.password);
        params.append('company_name', this.company_name);
        params.append('officer_name', this.officer_name);
        params.append('phone_number', this.phone_number);
        params.append('notification_email', this.notification_email);
        params.append('notification_phone', this.notification_phone);
        this.$axios.post('http://api.housewatcher.ryukyuupdate.com/api/company/register', params)
        .then((response) => {
          vm.companyInfo = response.data
          vm.$store.commit('updateIdToken', this.companyInfo.idToken)
          vm.$router.push({ path: '/mypage'})
        })
      },
      notificationCheck(){
        if (this.notification_email) {
          this.notification_email = 1
        } else {
          this.notification_email = 0
        }
        if (this.notification_phone) {
          this.notification_phone = 1
        } else {
          this.notification_phone = 0
        }
        this.companyRegister()
      },
      emailCheck(){
        let params = new URLSearchParams();
        params.append('email', this.email);
        this.$axios.post('http://api.housewatcher.ryukyuupdate.com/api/company/emailcheck', params)
        .then((response) => {
          if (response.data == 0) {
            this.notificationCheck()
          } else {
            this.emailCheckAlert = true
          }
        })
      },
      passwordCheck(){
        if (this.password == this.password2) {
          this.alert = false
          this.errorMessage = 'inputOk'
          this.emailCheck()
        } else {
          this.alert = true
          this.errorMessage = 'inputNg'
        }
      },
      registerCheck(){
        this.emailCheckAlert = false
        if (this.email && this.password && this.password2 && this.company_name && this.officer_name && this.phone_number && (this.notification_email || this.notification_phone)){
          this.passwordCheck()
        } else {
          this.errorMessage = 'inputNg'
          this.alert = true
        }
      },
      backPage(){
        this.$router.push({ path: '/'})
      }
    },
  }
</script>

