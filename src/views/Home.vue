<template>
  <v-container>
    <v-row class="mt-10">
      <v-col class="ma-4">
        <v-row align="center" justify="center">
            <v-col cols="12" sm="6" md="6" lg="8" xl="8">
            <div class="font-weight-black text-center text-h4">
              大家さん、不動産会社さんのお仕事をラクに。
            </div>
          </v-col>
          <v-col cols="12" sm="6" md="6" lg="3" xl="3">
            <v-card class="mx-auto" max-width="250">
              <v-img
                class="white--text align-end"
                height="200px"
                src="@/assets/imd-logo.png"
              >
              </v-img>
              <v-card-subtitle class="ma-0 text-center">HouseQR</v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
        <v-divider class="my-10"></v-divider>
        <v-row align="center" justify="center" class="ma-10">
          <v-col cols="12">
            <p class="text-center text-h5">
              アパート、マンションの共有部分の外灯、管理に困っていませんか？
            </p>
            <p class="text-center font-weight-regular">
              アパートやマンションを複数管理している大家さんや、不動産管理会社さんは、共有部分の外灯はどのように管理していますか？
              <br><br>
              高い費用を支払い外部の管理会社に任せっきりにしていませんか？
              <br>
              それとも、貴重は時間を利用して自ら足を運んでチェクしていますか？
            </p>
          </v-col>
          <v-col>
            <v-row align="center" justify="center">
              <v-img
                class="white--text align-end"
                max-width="500"
                max-height="300"
                src="@/assets/img-thinking.jpg"
              >
              </v-img>
            </v-row>
          </v-col>
        </v-row>
        <v-divider class="my-16"></v-divider>
        <v-row align="center" justify="center" class="my-16">
          <v-col cols="12">
            <p class="text-center text-h5">
              そんな不便を解決するために誕生したのが<strong>「HouseQR」</strong>です。
            </p>
            <p class="text-center font-weight-regular">
              これからはあなたの大切なお金、時間を犠牲にすることはなくなります。
              <br><br>
              HouseQRを利用すると、住居人がWEB上から気軽にお知らせしてくれます。
            </p>
          </v-col>
          <v-col>
            <v-row align="center" justify="center">
            <v-img
              class="white--text align-end"
              max-width="500"
              max-height="300"
              src="@/assets/img-freedom.jpg"
            >
            </v-img>
            </v-row>
          </v-col>
        </v-row>
        <v-divider class="my-16"></v-divider>
        <v-row align="center" justify="center" class="my-16">
          <v-col cols="12">
            <p class="text-center text-h5">
              仕組みはとってもシンプル。
            </p>

            <div>
              <v-timeline :dense="$vuetify.breakpoint.smAndDown">
                <v-timeline-item>
                  <span slot="opposite">ステップ1</span>
                  <v-card class="elevation-2">
                    <v-card-title class="headline">
                      QRコードを作成。
                    </v-card-title>
                    <v-card-text>
                      <v-chip class="mr-1 mb-2" small>
                        大家さん
                      </v-chip>
                      <v-chip class="ma-0 mb-2" small>
                        不動産会社さん
                      </v-chip><br>
                      HouseQRのWEBサイトにログインし、QRコードを作成。<br>
                      アパートや、マンションの共有外灯の近くに、作成したQRコードを貼る。
                    </v-card-text>
                    <v-row>
                      <v-col cols="12">
                        <v-img
                          class="white--text align-end mx-2"
                          src="@/assets/img-register.jpg"
                          aspect-ratio="2.5"
                        >
                        </v-img>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-timeline-item>
                <v-timeline-item>
                  <span slot="opposite">ステップ2</span>
                  <v-card class="elevation-2">
                    <v-card-title class="headline">QRコードを読み取る。</v-card-title>
                    <v-card-text>
                      <v-chip class="mr-1 mb-2" small>
                        住居人
                      </v-chip><br>
                      外灯の電球が切れていることに気がついた住居人は、QRコードを読み取り
                      <v-btn
                        small
                        tile
                        elevation="8"
                        class="mx-3"
                        rounded 
                        color="#000000"
                        dark
                      >
                        <div class="font-weight-black">依頼する</div>
                        <v-icon class="mx-0">mdi-send</v-icon>
                      </v-btn>
                      をワンタップ。<br><br>
                      住居人は面倒なアカウント作成や、アプリのインストールは不要、既存のカメラアプリがあればOK
                      <v-icon small>mdi-thumb-up-outline</v-icon>
                    </v-card-text>
                    <v-row>
                      <v-col cols="12">
                        <v-img
                          aspect-ratio="1.5"
                          class="white--text align-end mx-2"
                          src="@/assets/img-qr-scan.jpeg"
                        >
                        </v-img>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-timeline-item>
                <v-timeline-item>
                  <span slot="opposite">ステップ3</span>
                  <v-card class="elevation-2">
                    <v-card-title class="headline">通知が来る。</v-card-title>
                    <v-card-text>
                      <v-chip class="mr-1 mb-2" small>
                        大家さん
                      </v-chip>
                      <v-chip class="ma-0 mb-2" small>
                        不動産会社さん
                      </v-chip><br>
                      HouseQRから「メール」「自動音声の電話」で通知が来ます。<br>
                      詳細な情報はHouseQRのWEBサイトから確認。<br><br>
                      シンプルなメッセージが来るだけなので、不要なやりとりは発生しません
                      <v-icon small>mdi-emoticon-wink-outline</v-icon>
                    </v-card-text>
                    <v-row>
                      <v-col cols="6">
                        <v-img
                          class="white--text align-end mx-2"
                          src="@/assets/img-notification-email.jpg"
                        >
                        </v-img>
                      </v-col>
                      <v-col cols="6">
                        <v-img
                          class="white--text align-end mx-2"
                          src="@/assets/img-notification-call.jpg"
                        >
                        </v-img>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-timeline-item>
              </v-timeline>
            </div>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-btn
            class="mx-1"
            tile
            x-large
            color="#000000"
            dark
            outlined
            @click="goLoginPage()"
          >
            <div class="font-weight-black">ログイン</div>
            <v-icon class="ml-1">mdi-home-import-outline</v-icon>
          </v-btn>
          <v-btn
            tile
            x-large
            color="#000000"
            dark
            @click="goNextPage()"
          >
            <div class="font-weight-black">アカウント作成</div>
            <v-icon class="ml-1">mdi-account</v-icon>
          </v-btn>
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
  methods: {
    goLoginPage() {
        this.$router.push({path: '/login'})
    },
    goNextPage() {
        this.$router.push({path: '/register'})
    },
  }
}
</script>
