<template>
  <ion-page>
    <ion-content class="callback-content">
      <div class="callback-container">
        <div v-if="authApi.loading">
          <ion-spinner></ion-spinner>
          <h2>Processing authentication...</h2>
        </div>
        
        <div v-else-if="authApi.error">
          <ion-icon :icon="$icons.alertCircle" color="danger" size="large"></ion-icon>
          <h2>Authentication failed</h2>
          <p>{{ authApi.error }}</p>
          <ion-button @click="authApi.retry">Try Again</ion-button>
        </div>
        
        <div v-else>
          <ion-icon :icon="$icons.checkmarkCircle" color="success" size="large"></ion-icon>
          <h2>Authentication successful!</h2>
          <p>Redirecting to app...</p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { 
  IonPage, 
  IonContent, 
  IonSpinner, 
  IonButton
} from '@ionic/vue';
import { useAuthApi } from '@/composables/useAuthApi';
import { useAuth } from '@/composables/useAuth';
import router from '@/router';
import { Storage } from '@/services/storage';

export default {
  components: {
    IonPage,
    IonContent,
    IonSpinner,
    IonButton,
  },
  setup() {
    const authApi = useAuthApi();
    Storage.set("auth-flow", "true");
    return { authApi };
  },
  async mounted() {
    const { setUser } = useAuth();
    const userData = await this.authApi.authBootsrap();
    await Storage.set("jwt", userData.data.JWT as string);
    setUser(userData);
      setTimeout(() => {
        Storage.set("auth-flow", "false");
        router.push("/tabs/tab2");
      }, 2000);

  }
}
</script>

<style scoped>
.callback-content {
  --background: var(--ion-color-light);
}

.callback-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
  text-align: center;
}

.callback-container h2 {
  margin: 1rem 0;
  color: var(--ion-color-primary);
}

.callback-container p {
  margin: 0.5rem 0 1.5rem 0;
  color: var(--ion-color-medium);
}

ion-icon {
  margin-bottom: 1rem;
}
</style>
