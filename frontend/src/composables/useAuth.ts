import { ref, computed } from "vue";
import type { User } from "@/interfaces/user_interface";

const user = ref<User | null>(null);

export function useAuth() {
  function setUser(data: User) {
    user.value = data;
  }

  function clearUser() {
    user.value = null;
  }

  const isAuthenticated = computed(() => !!user.value);

  return {
    user,
    setUser,
    clearUser,
    isAuthenticated,
  };
}
