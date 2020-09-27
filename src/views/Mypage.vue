<template>
  <v-container>
    <v-dialog v-model="dialog" scrollable max-width="400px">
      <template v-slot:activator="{ on, attrs }">
        <v-row>
          <v-col cols="12">
            <v-row align="center" justify="center">
              <v-col class="px-3">
                <p class="pb-4 text-center font-weight-black text-h5">
                  <v-icon x-large class="ma-1">mdi-account-outline</v-icon>
                  マイページ
                </p>
                <v-row align="center" justify="center" v-show="loading_status">
                  <v-col cols="12">
                    <v-progress-linear
                      color="#000000"
                      indeterminate
                      rounded
                      height="6"
                    ></v-progress-linear>
                  </v-col>
                </v-row>
                <v-card class="mx-auto" width="800px" v-show="!loading_status">
                  <v-card-text>
                    <v-list>
                      <v-list-item :to="'/mypage/changecompanyname'">
                        <v-row align="center" justify="center">
                          <v-col sm="11" xs="12">
                            <v-row align="center" justify="center">
                              <v-col cols="12" sm="3" xs="12">
                                <v-list-item-title class="text-caption">会社名</v-list-item-title>
                              </v-col>
                              <v-col cols="12" sm="9" xs="12">
                                <v-list-item-title>{{ companyInfo.company_name }}</v-list-item-title>
                              </v-col>
                            </v-row>
                          </v-col>
                          <v-col sm="1" xs="12" class="text-end">
                            <v-icon>mdi-chevron-right</v-icon>
                          </v-col>
                        </v-row>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item :to="'/mypage/changeofficername'">
                        <v-row align="center" justify="center">
                          <v-col sm="11" xs="12">
                            <v-row align="center" justify="center">
                              <v-col cols="12" sm="3" xs="12">
                                <v-list-item-title class="text-caption">代表者名</v-list-item-title>
                              </v-col>
                              <v-col cols="12" sm="9" xs="12">
                                <v-list-item-title>{{ companyInfo.officer_name }}</v-list-item-title>
                              </v-col>
                            </v-row>
                          </v-col>
                          <v-col sm="1" xs="12" class="text-end">
                            <v-icon>mdi-chevron-right</v-icon>
                          </v-col>
                        </v-row>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item :to="'/mypage/changephonenumber'">
                        <v-row align="center" justify="center">
                          <v-col sm="11" xs="12">
                            <v-row align="center" justify="center">
                              <v-col cols="12" sm="3" xs="12">
                                <v-list-item-title class="text-caption">電話番号</v-list-item-title>
                              </v-col>
                              <v-col cols="12" sm="9" xs="12">
                                <v-list-item-title>
                                  {{ companyInfo.phone_number }}
                                  <v-icon color="red" medium v-show="!companyInfo.phone_check">mdi-phone-off-outline</v-icon>
                                </v-list-item-title>
                              </v-col>
                            </v-row>
                          </v-col>
                          <v-col sm="1" xs="12" class="text-end">
                            <v-icon>mdi-chevron-right</v-icon>
                          </v-col>
                        </v-row>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item :to="'/mypage/changeemail'">
                        <v-row align="center" justify="center">
                          <v-col sm="11" xs="12">
                            <v-row align="center" justify="center">
                              <v-col cols="12" sm="3" xs="12">
                                <v-list-item-title class="text-caption">メールアドレス</v-list-item-title>
                              </v-col>
                              <v-col cols="12" sm="9" xs="12">
                                <v-list-item-title>
                                  {{ companyInfo.email }}
                                  <v-icon color="red" medium v-show="!companyInfo.email_check">mdi-email-off-outline</v-icon>
                                </v-list-item-title>
                              </v-col>
                            </v-row>
                          </v-col>
                          <v-col sm="1" xs="12" class="text-end">
                            <v-icon>mdi-chevron-right</v-icon>
                          </v-col>
                        </v-row>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item :to="'/mypage/changepassword'">
                        <v-row align="center" justify="center">
                          <v-col sm="11" xs="12">
                            <v-row align="center" justify="center">
                              <v-col cols="12" sm="3" xs="12">
                                <v-list-item-title class="text-caption">パスワード</v-list-item-title>
                              </v-col>
                              <v-col cols="12" sm="9" xs="12">
                                <v-list-item-title>********</v-list-item-title>
                              </v-col>
                            </v-row>
                          </v-col>
                          <v-col sm="1" xs="12" class="text-end">
                            <v-icon>mdi-chevron-right</v-icon>
                          </v-col>
                        </v-row>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item :to="'/mypage/changenotification'">
                        <v-row align="center" justify="center">
                          <v-col sm="11" xs="12">
                            <v-row align="center" justify="center">
                              <v-col cols="12" sm="3" xs="12">
                                <v-list-item-title class="text-caption">通知方法</v-list-item-title>
                              </v-col>
                              <v-col cols="12" sm="9" xs="12">
                                <v-list-item-title v-show="companyInfo.notification_email" >・メールで通知を確認</v-list-item-title>
                                <v-list-item-title v-show="companyInfo.notification_phone" >・電話で通知を確認</v-list-item-title>
                              </v-col>
                            </v-row>
                          </v-col>
                          <v-col sm="1" xs="12" class="text-end">
                            <v-icon>mdi-chevron-right</v-icon>
                          </v-col>
                        </v-row>
                      </v-list-item>
                      <v-divider></v-divider>
                      <div class="text-end ma-2">
                        <v-btn
                          color="#000000"
                          dark
                          text
                          v-bind="attrs"
                          v-on="on"
                        >
                          アカウントを削除
                          <v-icon class="ml-1">mdi-delete</v-icon>
                        </v-btn>
                      </div>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </template>
      <v-card
        class="mx-auto transition-swing"
        max-width="400"
      >
        <v-card-text>
          <p class="ma-2 text-h6 black--text text-center">
            本当にアカウントを削除しますか？
          </p>
          <v-divider></v-divider>
          <br>
          <v-col cols='12' class="text-center">
            <div class="my-2 text-center">
              <v-btn
                class="mx-1"
                tile
                color="#000000"
                dark
                outlined
                @click="dialog = false"
              >
                <div class="font-weight-black">キャンセル</div>
                <v-icon class="ml-1">mdi-undo-variant</v-icon>
              </v-btn>
              <v-btn
                tile
                color="#000000"
                dark
                @click="deleteAccount(), dialog = false"
              >
                <div class="font-weight-black">削除</div>
                <v-icon class="ml-1">mdi-delete</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>



<script>
export default {
  data () {
    return {
      dialog: false,
      companyInfo: '',
      propertyInfo: '',
      propertyPartInfo: '',
      idToken: this.$store.state.idToken,
      loading_status: true
    }
  },
  created () {
    this.getCompanyInfo()
    this.getPropertyInfo()
    this.getPropertyPartInfo()
  },
  methods: {
    goPropertyRegisterPage() {
        this.$router.push({ path: '/mypage/registerproperty'})
    },
    getCompanyInfo() {
      let vm = this;
      let params = new URLSearchParams();
      params.append('idtoken', this.idToken);
      this.$axios.post('http://api.housewatcher.ryukyuupdate.com/api/company/info', params)
      .then((response) => {
        vm.companyInfo = response.data
        vm.$store.commit('updateCompanyNanem', response.data.company_name)
      })
    },
    getPropertyInfo() {
      let vm = this;
      let params = new URLSearchParams();
      params.append('idtoken', this.idToken);
      this.$axios.post('http://api.housewatcher.ryukyuupdate.com/api/property/list', params)
      .then((response) => {
        vm.propertyInfo = response.data
      })
    },
    deleteAccount() {
      let params = new URLSearchParams();
      params.append('id', this.companyInfo.id);
      params.append('email', this.companyInfo.email + 'zzz');
      params.append('password', this.companyInfo.password);
      params.append('company_name', this.companyInfo.company_name);
      params.append('officer_name', this.companyInfo.officer_name);
      params.append('phone_number', this.companyInfo.phone_number);
      params.append('notification_email', this.companyInfo.notification_email);
      params.append('notification_phone', this.companyInfo.notification_phone);
      params.append('idToken', this.companyInfo.idToken);
      this.$axios.post('http://api.housewatcher.ryukyuupdate.com/api/company/change', params)
      this.$store.commit('updateIdToken', '')
      if (this.$route.meta.requiresAuth) {
        this.$router.push({
          path: '/',
        })
      }
    },
    getPropertyPartInfo() {
      let vm = this;
      let params = new URLSearchParams();
      params.append('idtoken', this.idToken);
      this.$axios.post('http://api.housewatcher.ryukyuupdate.com/api/propertypart/list', params)
      .then((response) => {
        vm.propertyPartInfo = response.data
        vm.loading_status = false
      })
    },
    goChangePartPage(property_id) {
      this.$router.push(
        {
          path: '/mypage/changepart',
          query: {
            property_id: property_id,
          }
        }
      ).catch(() => {});
    },
  }
}
</script>