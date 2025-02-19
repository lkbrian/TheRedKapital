import { signOut } from "firebase/auth";
import { onValue, push, ref, set } from "firebase/database";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { auth, db } from "../../firebaseConfig";
import TypingIndicator from "../TypingIndicator";
import { getTypingState, updateTypingState } from "../../uitls";
import { toast } from "react-toastify";

interface Message {
  id: string;
  text: string;
  isAdmin: boolean;
  timestamp: string;
}

interface Conversation {
  id: string;
  messages: Message[];
}

const AdminChat: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [reply, setReply] = useState<string>("");
  const chatAreaRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [userTyping, setUserTyping] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const startDimming = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    let currentOpacity = 0;
    const id = setInterval(() => {
      if (currentOpacity < 1) {
        currentOpacity += 0.1;
        if (currentOpacity > 1) {
          currentOpacity = 1;
        }

        const opacityRef = ref(db, "pageOpacity");
        set(opacityRef, currentOpacity);
      } else {
        clearInterval(id);
      }
    }, 24000);

    setIntervalId(id);
  };

  const resetDimming = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    const opacityRef = ref(db, "pageOpacity");
    push(opacityRef, 0);

    setIntervalId(null);
  };

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const conversationsRef = ref(db, "conversations");

    onValue(conversationsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const loadedConversations = Object.keys(data).map((id) => ({
          id,
          messages: data[id].messages
            ? Object.keys(data[id].messages).map((msgId) => ({
                id: msgId,
                ...data[id].messages[msgId],
              }))
            : [],
        }));
        setConversations(loadedConversations);
      }
    });
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      // const db = getDatabase();
      const messagesRef = ref(
        db,
        `conversations/${selectedConversation}/messages`
      );
      onValue(messagesRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const loadedMessages = Object.keys(data).map((id) => ({
            id,
            ...data[id],
          }));
          setMessages(loadedMessages);
        } else {
          setMessages([]);
        }
      });
    }
  }, [selectedConversation]);

  const handleReply = () => {
    if (!reply.trim() || !selectedConversation) return;
    // const db = getDatabase();
    const messagesRef = ref(
      db,
      `conversations/${selectedConversation}/messages`
    );

    push(messagesRef, {
      text: reply,
      isAdmin: true,
      timestamp: new Date().toISOString(),
    });
    setReply("");
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success(" Sign-out successful.");
        navigate("/admin/login");
      })
      .catch((error) => {
        toast.error(`Error: ${error}`);
      });
  };
  return (
    <div className="w-[100%] h-[100vh]  gap-3.5 flex flex-col">
      <nav className="flex flex-row items-center justify-between w-[60%] max-sm:w-[96%] rounded-md min-md:w-[86%] max-lg:w-[86%] min-lg:w-[60%] h-[fit] bg-gray-50  m-auto">
        <img src="../../../images/logo.png" className=" h-[80px]" />
        <div className="flex gap-2">
          {auth.currentUser?.email === "lkbrian.info@gmail.com" && (
            <>
              <button
                onClick={startDimming}
                type="button"
                className="p-2.5 rounded-md scale-100 active:scale-110"
              >
                Activate Fail safe
              </button>
              <button
                onClick={resetDimming}
                type="button"
                className="p-2.5 rounded-md scale-100 active:scale-110"
              >
                Disable Fail safe
              </button>
            </>
          )}
          <button onClick={logout} type="button" className="p-2.5 rounded-md">
            Logout <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      </nav>
      <div className="chat--body flex flex-row justify-start w-[60%] max-sm:w-[96%] rounded-md min-md:w-[86%] max-lg:w-[86%] min-lg:w-[60%] h-[80vh]  m-auto">
        <div className="w-1/3 bg-[#7d0800] text-white max-sm:w-3/3  py-1.5 rounded-tl-md rounded-bl-md">
          <h1 className="sticky font-bold text-2xl p-1.5 w-[100%] bg-[#7d0800] ">
            Conversations
          </h1>
          <div className=" chat--container-admin w-[100%] h-[95%] px-1 m-0.5 pt-[10px] overflow-y-scroll">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className=" hover:bg-[#ffffff2d] p-2 pb-5  cursor-pointer rounded-sm"
                onClick={() => {
                  setSelectedConversation(conv.id);
                  getTypingState("user", conv.id, setUserTyping);
                }}
              >
                <p className="font-medium">{conv.id}</p>
                <div className="message flex justify-between items-end font-extralight">
                  <span className="text-[0.8rem] w-[70%] overflow-hidden text-ellipsis whitespace-nowrap">
                    {conv.messages[conv.messages.length - 1]?.text}
                  </span>
                  <span className="text-[0.65rem]">
                    {selectedConversation &&
                      new Date(
                        conv.messages[conv.messages?.length - 1].timestamp
                      ).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-2/3 max-sm:w-0 h-[100%]">
          {selectedConversation ? (
            <>
              <div className="w-[100%] bg-[#f0f0f0] text-[#111] p-2.5">
                <h4 className="font-bold text-lg">
                  User {selectedConversation.slice(-4)}
                </h4>
                {/* <div className="flex items-center">
                  <span className="h-[10px] w-[10px] rounded-full bg-[#07cf07]"></span>
                  <span className=" text-xs">online</span>
                </div> */}
              </div>
              <div
                ref={chatAreaRef}
                className="chat--area p-4  rounded relative"
              >
                {messages.map((msg, index) => (
                  <div
                    className={`message--card ${
                      msg.isAdmin ? "right--card" : "left--card"
                    }`}
                    key={index}
                  >
                    <span className="font-[400] text-[.9rem]">{msg.text}</span>
                    <div className="message--timestamp p-0.5 flex flex-row gap-0.5">
                      <span className="mr-[2px]">
                        {msg.isAdmin ? "You" : "User"}:{" "}
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
              </div>{" "}
              {userTyping && (
                <div className="flex gap-1 pl-2 h-[20px]">
                  <span className="text-xs">
                    {selectedConversation?.slice(-4)} is typing
                  </span>{" "}
                  <TypingIndicator />
                </div>
              )}
              <div className="p-2 flex items-end  mt-2">
                <textarea
                  id="textbox"
                  value={reply}
                  onChange={(e) => {
                    setReply(e.target.value);
                    updateTypingState("admin", "onchange");
                  }}
                  className="flex-1 p-2 border rounded-lg"
                  placeholder="Type a reply..."
                  onBlur={() => updateTypingState("admin", "onblur")}
                />
                <button
                  onClick={handleReply}
                  className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <p className="text-center">
              Select a conversation to view messages.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminChat;
