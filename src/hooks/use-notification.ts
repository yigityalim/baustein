"use client";

import { useEffect, useState } from "react";

export function useNotification() {
  const [permission, setPermission] =
    useState<NotificationPermission>("default");

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      console.warn("Tarayıcı bildirimleri desteklemiyor.");
      return;
    }

    const result = await Notification.requestPermission();
    setPermission(result);
    return result;
  };

  const sendNotification = (title: string, options?: NotificationOptions) => {
    if (permission === "granted") {
      new Notification(title, {
        icon: "/icon-192.png",
        badge: "/icon-192.png",
        ...options,
      });
    } else {
      console.warn("Bildirim izni verilmedi.");
    }
  };

  return { permission, requestPermission, sendNotification };
}
