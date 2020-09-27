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
                    管理物件を追加
                  </p>
                </div>
                <v-divider></v-divider>
                <br>
                <v-form ref="form" @submit.prevent>
                  <v-text-field
                    v-model="property_name"
                    label="物件の名前を入力"
                    outlined
                    clearable
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-form>
                <v-form ref="form" @submit.prevent>
                  <v-text-field
                    v-model="property_address"
                    label="物件の住所を入力"
                    outlined
                    clearable
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-form>
                <v-col cols='12' class="text-center">
                  <div class="mt-2 text-end">
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
                      @click="registerProperty()"
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
        property_id: '',
        property_name: '',
        property_address: '',
        idToken: '',
        rules: {
          required: value => !!value || '入力してください.',
        },
      }
    },
    methods: {
      registerProperty() {
        let vm = this;
        vm.idToken = this.$store.state.idToken
        let params = new URLSearchParams();
        params.append('property_name', this.property_name);
        params.append('property_address', this.property_address);
        params.append('idtoken', vm.idToken);
        this.$axios.post('http://api.housewatcher.ryukyuupdate.com/api/property/register', params)
        .then((response) => {
          vm.property_id = response.data
          this.goPartRegisterPage()
        })
      },
      backPage(){
        this.$router.push({ path: '/propertytable'})
      },
      goPartRegisterPage() {
        this.$router.push(
          {
            path: '/propertytable/registerpart',
            query: {
              property_id: this.property_id,
            }
          }
        ).catch(() => {});
      },
    },
  }
</script>

