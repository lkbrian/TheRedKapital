import { onValue, push, ref, set } from "firebase/database";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../../firebaseConfig";
import {
  getConversationId,
  getTypingState,
  updateTypingState,
} from "../../uitls";
import "./Dialog.css";
import TypingIndicator from "../TypingIndicator";
interface Message {
  text: string;
  isAdmin: boolean;
  timestamp: string;
}
interface DialogProps {
  open: boolean;
  onClose: (arg0: boolean) => void;
}
const Dialog: React.FC<DialogProps> = ({ open, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]); // Store messages
  const [message, setMessage] = useState("");
  const conversationId = getConversationId();
  const chatAreaRef = useRef<HTMLDivElement | null>(null);
  const [adminTyping, setAdminTyping] = useState(false);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);
  const closeChat = () => {
    onClose(!open);
  };
  useEffect(() => {
    const messagesRef = ref(db, `conversations/${conversationId}/messages`); // Use conversationId to fetch messages
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      if (snapshot.exists()) {
        const messagesObj = snapshot.val(); // Get the object of messages
        const messagesArray: Message[] = Object.values(messagesObj); // Convert object to array
        setMessages(messagesArray);
      }
    });

    return () => {
      unsubscribe(); // This unsubscribes from the event listener
    };
  }, [conversationId]);
  useEffect(() => {
    getTypingState("admin", conversationId, setAdminTyping);
  }, [conversationId]);
  const sendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    if (message === "" || message === null) {
      return;
    }
    if (message.trim()) {
      const newMessageRef = push(
        ref(db, `conversations/${conversationId}/messages`)
      );
      await set(newMessageRef, {
        text: message,
        isAdmin: false, // Marks this as a user message
        timestamp: new Date().toISOString(),
      });
      setMessage("");
    }
  };
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="dialog--header flex items-center justify-start text-center h-[20%] w-full bg-[#7d0800] text-white rounded-t-[.4rem]  gap-2.5 ">
        <div className=" ml-2.5 logo--img bg-white h-[40px] w-[40px] rounded-full flex items-center justify-center overflow-hidden">
          <img
            src="../../../images/logoAbstract.png"
            alt=""
            className=" object-contain h-[70%]"
          />
        </div>
        <div className="capitalize] flex flex-col">
          <h2 className="font-[800] text-[1.2rem]">Chat Bot</h2>
          {/* <div className="p-0 m-0 text-xs ml-[4px] flex items-center gap-0.5">
            <div className="h-[10px] w-[10px] rounded-full bg-[#07cf07]"></div>
            <span>online</span>
          </div> */}
        </div>
        <div
          onClick={() => closeChat()}
          className="absolute close-icon text-white right-2.5"
        >
          {/* <i className="fa-solid fa-circle-xmark "></i> */}
          <i style={{ fontSize: "1rem" }} className="fa-solid fa-xmark"></i>
        </div>
      </div>
      <div
        ref={chatAreaRef}
        className="dialog--body  px-2 py-4 items-center h-[100%] overflow-y-scroll"
      >
        <div className="message--card left--card">
          <span className="font-[400] text-[.9rem]">
            Hello, Welcome to The Red Kapital. How can i help you today?
          </span>
        </div>
        {messages.map((msg, index) => (
          <div
            className={`message--card ${
              msg.isAdmin ? "left--card" : "right--card"
            }`}
            key={index}
            // style={{ marginBottom: "10px" }}
          >
            <span className="font-[400] text-[.9rem]">{msg.text}</span>
            <div className="message--timestamp p-0.5 flex flex-row gap-0.5">
              <span className="mr-[2px]">
                {msg.isAdmin ? "Admin" : "You"}:{" "}
              </span>
              <span>{new Date(msg.timestamp).toDateString()}</span>
              <span>
                {new Date(msg.timestamp).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
      {adminTyping && (
        <div className="flex gap-1  pl-1">
          <span className="text-xs">Admin is typing</span> <TypingIndicator />
        </div>
      )}

      <form
        onSubmit={sendMessage}
        className="message--panel flex flex-row gap-2 items-end p-2 bg-white rounded-xl rounded-t-none m-0"
      >
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            updateTypingState("user", "onchange");
          }}
          className="dialog--textbox flex-1 h-[100%] resize-none rounded-lg border-2 border-[#f7191c] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#f7191c] px-4 py-2 transition-all duration-200 ease-in-out"
          rows={4}
          placeholder="Type a message..."
          onBlur={() => updateTypingState("user", "onblur")}
        />
        <button
          // onClick={sendMessage}
          type="submit"
          className="p-3 h-[35px] w-[35px] flex items-center justify-center bg-[#f7191c] rounded-full hover:bg-[#d11c1a] focus:ring-4 focus:ring-[#f7191c] transition-colors duration-200 ease-in-out"
        >
          <i className="fa-solid fa-paper-plane text-white"></i>
        </button>
      </form>
    </div>
  );
};

export default Dialog;
