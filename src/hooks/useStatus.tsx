import { useState, useEffect } from "react";
import { ref, onValue, onDisconnect, update } from "firebase/database";
import { db } from "../firebaseConfig";

export const useAdminStatus = () => {
  const [isAdminOnline, setIsAdminOnline] = useState(false);

  useEffect(() => {
    const connectedRef = ref(db, ".info/connected");
    const adminStatusRef = ref(db, "adminStatus");

    const unsubscribe = onValue(connectedRef, async (snapshot) => {
      // Register onDisconnect immediately
      if (snapshot.exists()) {
        await update(adminStatusRef, {
          isAdminOnline: true,
        });
        await onDisconnect(adminStatusRef).set({
          isAdminOnline: false,
        });

        // Update admin status to online

        setIsAdminOnline(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return isAdminOnline;
};
