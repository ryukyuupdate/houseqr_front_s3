<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-col class="px-3">
            <v-card class="mx-auto" width="800px">
              <v-card-text>
                <div>
                  <p class="display-1 black--text text-center">
                    物件情報を変更
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
                            v-model="propertyPartInfo.property_name"
                            label="物件名"
                            outlined
                            clearable
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-form>
                      </div>
                      <div>
                        <v-form ref="form" @submit.prevent>
                          <v-text-field
                            v-model="propertyPartInfo.property_address"
                            label="物件住所"
                            outlined
                            clearable
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-form>
                      </div>
                      <div class="text-end">
                        <v-btn
                          color="#000000"
                          dark
                          text
                          @click="propertyDelete()"
                        >
                          管理物件を削除
                          <v-icon class="ml-1">mdi-delete</v-icon>
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-form>
                <v-alert :value="alert2" dense border="left" type="error">
                  <strong>QR設置場所が登録されています。管理物件を削除するにはQR設置場所を全て削除してください</strong>
                </v-alert>
                <v-col cols='12' class="text-center">
                  <div class="my-2 text-end">
                    <v-btn
                      class="ma-1"
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
                      @click="propertyChange(propertyPartInfo.id)"
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
        loading_status: true,
        alert: false,
        alert2: false,
        property_id: this.$route.query.property_id,
        companyInfo: '',
        propertyPartInfo: '',
        idToken: '',
        rules: {
          required: value => !!value || '入力してください.',
        },
      }
    },
    created () {
      this.getPropertyPartInfo()
    },
    methods: {
      propertyDeleteRun() {
        let vm = this;
        vm.idToken = this.$store.state.idToken
        let params = new URLSearchParams();
        params.append('id', this.property_id);
        params.append('idtoken', vm.idToken);
        this.$axios.post('http://api.housewatcher.ryukyuupdate.com/api/property/delete', params)
        this.backPage()
      },
      propertyDelete() {
        let vm = this;
        vm.idToken = this.$store.state.idToken
        let params = new URLSearchParams();
        params.append('property_id', this.property_id);
        params.append('idtoken', vm.idToken);
        this.$axios.post('http://api.housewatcher.ryukyuupdate.com/api/part/propertyidlist', params)
        .then((response) => {
          if (response.data.length != 0) {
            vm.alert2 = true
          } else {
            this.propertyDeleteRun()
          }
        })
      },
      propertyChange(property_id) {
        this.idToken = this.$store.state.idToken
        let params = new URLSearchParams();
        params.append('id', property_id);
        params.append('property_name', this.propertyPartInfo.property_name);
        params.append('property_address', this.propertyPartInfo.property_address);
        params.append('idtoken', this.idToken);
        this.$axios.post('http://api.housewatcher.ryukyuupdate.com/api/property/change', params)
        this.backPage()
      },
      getPropertyPartInfo() {
        this.alert2 = false;
        let vm = this;
        vm.idToken = this.$store.state.idToken
        let params = new URLSearchParams();
        params.append('property_id', this.property_id);
        params.append('idtoken', vm.idToken);
        this.$axios.post('http://api.housewatcher.ryukyuupdate.com/api/propertypart/info', params)
        .then((response) => {
          vm.propertyPartInfo = response.data
          vm.loading_status = false
          if (response.data.part_info.length == 0) {
            vm.alert = true
          }
        })
      },
      backPage() {
        this.$router.push(
          {
            path: '/propertytable'
          }
        ).catch(() => {});
      },
    },
  }
</script>

