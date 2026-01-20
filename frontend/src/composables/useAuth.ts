import { ref, computed } from "vue";
import type { User } from "@/interfaces/user_interface";
import { getUser } from "@/services/api";
import { Storage } from "@/services/storage";

let user = ref<User | null>(null);
let authReady = ref(false);

export function useAuth() {
  function setUser(data: User) {
    user.value = data;
  }

  function clearUser() {
    user.value = null;
  }

  async function restoreSession() {
    let userData;
    const sessionToken = await Storage.get("jwt");

    if(sessionToken) {
      userData = await getUser(sessionToken);
      user.value = userData;
    } else {
      clearUser();
    }

    authReady.value = true;
  }

  const isAuthenticated = computed(() => !!user.value);

  return {
    user,
    setUser,
    clearUser,
    isAuthenticated,
    restoreSession,
    authReady,
  };
}
