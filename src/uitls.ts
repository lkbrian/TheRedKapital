import { onValue, ref, set } from "firebase/database";
import { db } from "./firebaseConfig";

export const getConversationId = (): string => {
  let conversationId = localStorage.getItem("conversationId");

  if (!conversationId) {
    // Generate a random alphanumeric string (max 5 characters)
    const randomPart = Math.random().toString(36).substr(2, 4);
    conversationId = `Conv_${randomPart}`;

    localStorage.setItem("conversationId", conversationId);
  }

  return conversationId;
};

let typingTimeout: NodeJS.Timeout | null = null;

export const updateTypingState = (userType: string, event: string) => {
  if (typingTimeout) {
    clearTimeout(typingTimeout);
  }
  const conversationId = localStorage.getItem("conversationId");
  const typingStateRef =
    userType === "admin"
      ? ref(db, `state`)
      : ref(db, `conversations/${conversationId}/state`);
  if (event === "onchange") {
    set(typingStateRef, { typing: true });

    typingTimeout = setTimeout(() => {
      set(typingStateRef, { typing: false });
    }, 1500);
  } else if (event === "onblur") {
    set(typingStateRef, { typing: false });
  }
};

export const getTypingState = (
  userType: string,
  conversationId: string,
  callback: (typing: boolean) => void
) => {
  // const conversationId = localStorage.getItem("conversationId");
  const typingStateRef =
    userType === "admin"
      ? ref(db, `state`)
      : ref(db, `conversations/${conversationId}/state`);

  onValue(typingStateRef, (snapshot) => {
    if (snapshot.exists()) {
      const typingState = snapshot.val();
      callback(typingState?.typing || false);
    } else {
      callback(false);
    }
  });
};
