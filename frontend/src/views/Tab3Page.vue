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
          <ion-title size="large">Profile</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-card class="container">
        <ion-avatar class="pfp">
          <img
            alt="Spotify Profile Picture"
            :src="auth.user.value?.data.avatar_url ?? image"
          />
        </ion-avatar>
        <ion-card-header>
          <ion-card-title>{{
            auth.user.value?.data.username ?? "Username"
          }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
            <ion-button fill="outline" size="small" class="button">{{
              auth.user.value?.data.email ?? "Email@gmail.com"
          }}</ion-button>
          <p>Mood</p>
        </ion-card-content>
      </ion-card>
      <ion-card class="container">
        <ion-card-header>
          <ion-card-title>
            Top Genres:
          </ion-card-title>
        </ion-card-header>
      </ion-card>
      <ion-card class="container">
        <ion-card-header>
          <ion-card-title>
            Top Artists:
          </ion-card-title>
        </ion-card-header>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonAvatar
} from "@ionic/vue";
import { useAuth } from "@/composables/useAuth";

export default {
  data() {
    return {
      image: "https://ionicframework.com/docs/img/demos/avatar.svg",
    };
  },
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
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonAvatar,
  },
};
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
  margin: 1rem;
}

.button {
  display: block;
}
</style>
