<template>
  <ion-app>
    <div v-if="!auth.authReady" class="container">Loading...</div>
    <ion-router-outlet v-else />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { useAuth } from './composables/useAuth';
import { onMounted } from 'vue';

export default {
  setup() {
    const auth = useAuth();

    onMounted(() => {
      auth.restoreSession();
    })

    return { auth };
  },
  components: {
    IonApp,
    IonRouterOutlet
  },
}
</script>
