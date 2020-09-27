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
                    {{ propertyInfo.property_name }}
                  </p>
                </div>
                <div class="text-center">
                  <v-icon small class="mr-1">mdi-map-marker</v-icon>
                  {{ propertyInfo.property_address }}
                </div>
                <v-divider></v-divider>
                <br>
                <v-col cols='12' class="text-center">
                  <v-alert :value="!btnShow" dense border="left" type="success">
                    <strong>「{{ partInfo.part_name }}」の交換依頼を承りました。</strong>
                  </v-alert>
                  <div v-show="btnShow" class="my-2 text-center">
                    <p class="font-weight-black text-h5">
                      「{{ partInfo.part_name }}」の交換を依頼する
                    </p>
                    <v-btn
                        tile
                        elevation="0"
                        class="my-5"
                        x-large
                        rounded 
                        color="#000000"
                        dark
                        block
                        @click="partNotification()"
                      >
                      <div class="font-weight-black">依頼する</div>
                      <v-icon class="mx-2">mdi-send</v-icon>
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
        btnShow: '',
        property_id: this.$route.query.property_id,
        part_id: this.$route.query.part_id,
        propertyInfo: '',
        partInfo: '',
      }
    },
    created () {
      this.getPropertyInfo()
      this.getPartInfo()
    },
    methods: {
      getPartInfo() {
        let vm = this;
        let params = new URLSearchParams();
        params.append('part_id', this.part_id);
        this.$axios.post('http://api.housewatcher.ryukyuupdate.com/api/part/info', params)
        .then((response) => {
          vm.partInfo = response.data
          if (response.data.part_status == 0) {
            vm.btnShow = true
          }
        })
      },
      getPropertyInfo() {
        let vm = this;
        let params = new URLSearchParams();
        params.append('property_id', this.property_id);
        this.$axios.post('http://api.housewatcher.ryukyuupdate.com/api/property/info', params)
        .then((response) => {
          vm.propertyInfo = response.data
        })
      },
      partNotification() {
        this.btnShow = false
        let params = new URLSearchParams();
        params.append('id', this.partInfo.id);
        params.append('part_name', this.partInfo.part_name);
        params.append('property_id', this.property_id);
        params.append('property_name', this.propertyInfo.property_name);
        params.append('part_status', 1);
        this.$axios.post('http://api.housewatcher.ryukyuupdate.com/api/notification/notification/part', params)
      },
    },
  }
</script>

