<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Profile</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 3</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="container">
      <ion-avatar class="pfp">
        <img alt="Spotify Profile Picture" :src="auth.user.value?.data.avatar_url ?? undefined" />
      </ion-avatar>
      <p class="header">{{ auth.user.value?.data.username }}</p>
      <p class="subheader">{{ auth.user.value?.data.email }}</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@Components/ExploreContainer.vue';
import { useAuth } from '@/composables/useAuth';

export default {
  setup() {
    const auth = useAuth();
    return { auth };
  },
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    ExploreContainer,
  }
}
</script>

<style>
  .container {
    display: grid;
    place-items: center;
    height: auto;
    width: auto;
  }

  .pfp {
    width: 40%;
    height: auto;
    margin: 50px;
  }

  .header {
    font-size:xx-large;
  }
  .subheader {
    font-size: large;
  }
</style>