import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dailyalbum.app',
  appName: 'Daily Album',
  webDir: 'dist',
  server: {
    iosScheme: 'daily-album'
  }
};

export default config;
