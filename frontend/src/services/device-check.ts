import { Capacitor } from "@capacitor/core";

export const DeviceCheck = {
    isMobile: (): boolean => {
        const isNative = Capacitor.isNativePlatform();
        
        if(isNative) {
            return true;
        } else {
            return false;
        }
    }
}