<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="ion-padding ion-text-center">
        <div style="margin-top: 40vh;">
        <ion-icon :icon="SpotifyIcon"></ion-icon>
        <ion-icon :icon="DailyAlbumIcon"></ion-icon>
          <h1>Welcome to Daily Album!</h1>
          <p>Login with Spotify to get started.</p>
          <ion-button expand="block" color="success" class="ion-margin-top" @click="authApi.redirectToAuthCodeFlow(authApi.CLIENT_ID)">
            Login with Spotify
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonContent, IonPage, IonButton } from '@ionic/vue';
import SpotifyIcon from '@Icons/Spotify_icon.svg';
import DailyAlbumIcon from '@Icons/DailyAlbum_icon.svg';
import { useAuthApi } from '@/composables/useAuthApi';

export default defineComponent({
  components: {
    IonContent,
    IonPage,
    IonButton,
  },
  setup() {
    const authApi = useAuthApi();
    return {
      SpotifyIcon,
      DailyAlbumIcon,
      authApi,
    };
  },
});
</script>

<style scoped>

ion-button {
    max-width: 280px;
    margin: 0 auto;
}

ion-icon {
  font-size: 64px;
}
</style>
