<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-col cols="6" class="text-center">
            <div class="my-2">
              <v-img src="@/assets/not_found.png"></v-img>
              <div class="mt-16">
              <v-btn
                x-large
                :to="'mypage'"
                rounded 
                color="pink accent-3"
                dark
              >
                MyPage
                <v-icon class="ma-1">mdi-arrow-right</v-icon>
              </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

