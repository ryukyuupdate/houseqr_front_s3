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
                    QR設置場所を作成
                  </p>
                </div>
                <v-divider></v-divider>
                <br>
                <v-form ref="form" @submit.prevent>
                  <v-text-field
                    v-model="part_name"
                    label="QR設置場所の名前を入力"
                    outlined
                    clearable
                    :rules="[rules.required]"
                  ></v-text-field>
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
                      @click="registerPart()"
                    >
                      <div class="font-weight-black">作成</div>
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
        part_name: '',
        property_id: this.$route.query.property_id,
        propertyPartInfo: '',
        idToken: '',
        rules: {
          required: value => !!value || '入力してください.',
        },
      }
    },
    methods: {
      registerPart() {
        let vm = this;
        vm.idToken = this.$store.state.idToken
        let params = new URLSearchParams();
        params.append('property_id', this.property_id);
        params.append('part_name', this.part_name);
        params.append('part_status', 0);
        params.append('idtoken', vm.idToken);
        this.$axios.post('http://api.housewatcher.ryukyuupdate.com/api/part/register', params)
        .then(this.backPage())
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
    },
  }
</script>

