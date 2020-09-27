<template>
  <v-container>
    <v-row class="my-2">
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-col class="px-3">
            <div id="printable">
            <v-card class="mx-auto" width="800px">
              <v-card-text>
                <div>
                  <p class="display-1 black--text text-center">
                    {{ propertyInfo.property_name }}
                  </p>
                </div>
                <div class="text-center">
                  {{ propertyInfo.property_address }}
                </div>
                <v-divider></v-divider>
                <div class="text-center subtitle-1 ma-5">
                  「{{ partInfo.part_name }}」の交換依頼をする
                </div>
                <v-row class="mb-2" align="center" justify="center">
                <v-col xs="12" sm="6">
                  <v-textarea
                    text
                    rows="2"
                    value="メモを記入"
                  ></v-textarea>
                </v-col>
                </v-row>
                <div>
                  <v-row class="py-3" align="center" justify="center">
                    <qriously :value="url" :size="320"/>
                  </v-row>
                </div>
                <v-col cols='12' class="text-center" v-show="printMode">
                    <div class="my-2 text-end">
                      <v-btn
                        class="mx-1"
                        tile
                        color="#000000"
                        dark
                        outlined
                        @click="backPage()"
                      >
                        <div class="font-weight-black">戻る</div>
                        <v-icon class="ml-1">mdi-undo-variant</v-icon>
                      </v-btn>
                      <v-btn
                        tile
                        color="#000000"
                        dark
                        @click="pagePrint()"
                      >
                        <div class="font-weight-black">印刷する</div>
                        <v-icon class="ml-1">mdi-printer</v-icon>
                      </v-btn>
                    </div>
                  </v-col>
              </v-card-text>
            </v-card>
            </div>
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
        printMode: true,
        url: '',
        property_id: this.$route.query.property_id,
        part_id: this.$route.query.part_id,
        propertyInfo: '',
        partInfo: '',
        idToken: '',
      }
    },
    created () {
      this.getPropertyInfo()
      this.getPartInfo()
      this.createUrl()
    },
    methods: {
      createUrl() {
        // 開発
        // this.url = 'http://3.114.195.102:8080/resident?property_id='+this.property_id+'&part_id=' + this.part_id
        // 本番
        this.url = 'http://houseqr.ryukyuupdate.com/resident?property_id='+this.property_id+'&part_id=' + this.part_id
      },
      getPropertyInfo() {
        let vm = this;
        vm.idToken = this.$store.state.idToken
        let params = new URLSearchParams();
        params.append('property_id', this.property_id);
        this.$axios.post('http://api.housewatcher.ryukyuupdate.com/api/property/info', params)
        .then((response) => {
          vm.propertyInfo = response.data
        })
      },
      getPartInfo() {
        let vm = this;
        vm.idToken = this.$store.state.idToken
        let params = new URLSearchParams();
        params.append('part_id', this.part_id);
        this.$axios.post('http://api.housewatcher.ryukyuupdate.com/api/part/info', params)
        .then((response) => {
          vm.partInfo = response.data
        })
      },
      backPage() {
        this.$router.push(
          {
            path: '/propertytable',
            query: {
              property_id: this.property_id,
            }
          }
        ).catch(() => {});
      },
      pagePrint() {
        this.$store.commit('updateprintMode', false)
        this.printMode = false
        setTimeout(() => {
          window.print()
          this.printMode = true
          this.$store.commit('updateprintMode', true)
        }, 200)
      },
    },
  }
</script>

