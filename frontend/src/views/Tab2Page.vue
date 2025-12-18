<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Daily Album</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" :scroll-y="false">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Daily Album</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="center-container">
        <ion-card class="container">
        <ion-card-header>
          <ion-card-title>
            Todays Album:
          </ion-card-title>
        </ion-card-header>
        <ion-card-content class="container">
          <ion-avatar>
            <img :src="dailyAlbumUrl"></img>
          </ion-avatar>
          <h1>Spiderland</h1>
          <h2>By Slint</h2>
          <ion-button>Listen now</ion-button>
        </ion-card-content>
      </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

export default {
  data() {
    return {
      dailyAlbumUrl: "https://m.media-amazon.com/images/I/81mlEp4lW-L._UF1000,1000_QL80_.jpg"
    }
  },
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent
  }
}
</script>

<style scoped>
  .center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }

  .center-container > * {
    pointer-events: auto;
  }

  ion-avatar {
    --border-radius: 4px;
    margin-top: 1rem;
    width: 60%;
    height: auto;
  }
  
  .container {
  display: grid;
  place-items: center;
  height: auto;
  width: auto;
}

</style>