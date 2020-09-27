<template>
  <v-container>
    <v-dialog v-model="dialog" scrollable max-width="400px">
      <template v-slot:activator="{ on, attrs }">
        <v-row align="center" justify="center">
          <v-col class="px-3">
            <p class="ma-0 text-center font-weight-black text-h5">
              <v-icon x-large class="ma-1">mdi-home-outline</v-icon>
              管理物件
            </p>
            <v-row align="center" justify="center">
              <v-col cols="12">
                <div class="text-end">
                  <v-tooltip top color="#263238">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        fab
                        color="#000000"
                        dark
                        class="mx-2"
                        @click="goPropertyRegisterPage()"
                      >
                        <v-icon dark>mdi-plus</v-icon>
                      </v-btn>
                    </template>
                    <span>管理物件を追加</span>
                  </v-tooltip>
                  <v-tooltip top color="#263238">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        fab
                        color="#000000"
                        dark
                        class="mx-2"
                        @click="pageUpdate()"
                      >
                        <v-icon dark>mdi-autorenew</v-icon>
                      </v-btn>
                    </template>
                    <span>物件情報を更新</span>
                  </v-tooltip>
                </div>
              </v-col>
            </v-row>
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
            <v-row v-show="!loading_status">
              <v-col cols="12" sm="6" md="6" lg="4" xl="3" v-for="propertyPartInfo in propertyPartInfo" :key="propertyPartInfo.id">
                <v-hover v-slot:default="{ hover }">
                <v-card
                  :class="`elevation-${hover ? 24 : 6}`"
                  class="mx-auto transition-swing"
                  max-width="400"
                >
                  <v-card-text>
                    <p class="text-h6 text-center text--primary">
                      {{ propertyPartInfo.property_name }}
                      
                      <v-tooltip top color="#263238">
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon v-bind="attrs" v-on="on" @click="goChangePartPage(propertyPartInfo.id)">mdi-pencil</v-icon>
                        </template>
                        <span>物件情報を編集</span>
                      </v-tooltip>

                    </p>
                    <p class="text-center">
                      {{ propertyPartInfo.property_address }}
                      <v-tooltip top color="#263238">
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon v-bind="attrs" v-on="on" @click="goGooglemapPage(propertyPartInfo.property_address)">mdi-map-marker</v-icon>
                        </template>
                        <span>GoogleMapで表示</span>
                      </v-tooltip>
                    </p>
                    <div class="text--primary">
                      <v-simple-table dark>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-caption text-left">物件名</th>
                              <th class="text-caption text-left">通知</th>
                              <th class="text-caption text-left">QR</th>
                              <th class="text-caption text-left">削除</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="partInfo in propertyPartInfo.part_info" :key="partInfo.id">
                              <td>
                                <v-btn
                                class="ma-0 pa-0"
                                  text
                                  small
                                  dark
                                  @click="partNameChange(partInfo)"
                                  v-bind="attrs"
                                  v-on="on"
                                >
                                  {{ partInfo.part_name }}
                                </v-btn>
                              </td>
                              <td>
                                <v-tooltip top color="#263238">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-row align="center" justify="space-around" v-bind="attrs" v-on="on">
                                      <v-switch 
                                      v-on:change="partChange(partInfo)" 
                                      v-model="partInfo.part_status" 
                                      color="error"
                                      inset
                                      ></v-switch>
                                    </v-row>
                                  </template>
                                  <span>スイッチが赤色になっていると<br>居住者から交換の依頼が来ています。</span>
                                </v-tooltip>
                              </td>
                              <td>
                                <v-tooltip top color="#263238">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-icon v-bind="attrs" v-on="on" @click="goQrViewPage(propertyPartInfo.id, partInfo.id)">mdi-qrcode</v-icon>
                                  </template>
                                  <span>QRコードを表示</span>
                                </v-tooltip>
                              </td>
                              <td>
                                <v-tooltip top color="#263238">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-icon v-bind="attrs" v-on="on" @click="partDelete(partInfo.id)">mdi-delete</v-icon>
                                  </template>
                                  <span>QR設置場所を削除</span>
                                </v-tooltip>
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      tile
                      color="#000000"
                      dark
                      outlined
                      class="mx-2"
                      @click="goPartRegisterPage(propertyPartInfo.id)"
                    >
                      <div class="font-weight-black">QR設置場所の追加</div>
                      <v-icon class="ml-1">mdi-plus</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
                </v-hover>
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
            QR設置場所名を変更
          </p>
          <v-divider></v-divider>
          <br>
          <v-form>
            <v-row justify="center">
              <v-col cols='12' class="text-center">
                <div>
                  <v-form ref="form" @submit.prevent>
                    <v-text-field
                      v-model="changeNowPartInfo.part_name"
                      label="会社名"
                      outlined
                      clearable
                      :rules="[rules.required]"
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
                @click="dialog = false"
              >
                <div class="font-weight-black">キャンセル</div>
                <v-icon class="ml-1">mdi-undo-variant</v-icon>
              </v-btn>
              <v-btn
                tile
                color="#000000"
                dark
                @click="partChange(changeNowPartInfo), dialog = false"
                v-show="this.changeNowPartInfo.part_name"
              >
                <div class="font-weight-black">保存</div>
                <v-icon class="ml-1">mdi-check</v-icon>
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
      rules: {
        required: value => !!value || '入力してください.',
      },
      changeNowPartInfo: '',
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
    pageUpdate() {
      this.loading_status = true
      this.getCompanyInfo()
      this.getPropertyInfo()
      this.getPropertyPartInfo()
    },
    goGooglemapPage(property_address) {
      window.open('https://www.google.com/maps/search/?api=1&query=' + property_address, '_blank');
    },
    partNameChange(part_info) {
      this.changeNowPartInfo = part_info
    },
    partChange(part_info) {
      let params = new URLSearchParams();
      params.append('id', part_info.id);
      params.append('part_name', part_info.part_name);
      params.append('part_status', part_info.part_status);
      params.append('idtoken', this.idToken);
      this.$axios.post('http://api.housewatcher.ryukyuupdate.com/api/part/change', params)
      .then(() => {
        this.getPropertyPartInfo()
      })
    },
    goQrViewPage(property_id, part_id) {
      this.$router.push(
        {
          path: '/propertytable/qrcode',
          query: {
            property_id: property_id,
            part_id: part_id
          }
        }
      ).catch(() => {});
    },
    partDelete(part_id) {
      let params = new URLSearchParams();
      params.append('id', part_id);
      params.append('idtoken', this.idToken);
      this.$axios.post('http://api.housewatcher.ryukyuupdate.com/api/part/delete', params)
      this.getPropertyPartInfo()
    },
    goPartRegisterPage(property_id) {
      this.$router.push(
        {
          path: '/propertytable/registerpart',
          query: {
            property_id: property_id,
          }
        }
      ).catch(() => {});
    },
    goPropertyRegisterPage() {
        this.$router.push({ path: '/propertytable/registerproperty'})
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
          path: '/propertytable/changepart',
          query: {
            property_id: property_id,
          }
        }
      ).catch(() => {});
    },
  }
}
</script>