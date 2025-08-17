"use client";
import React, { useEffect, useRef, useState } from "react";
import "./ChatBot.css";
import Message from "./Message/Message";
import axios from "axios";
export default function ChatBot({}) {
  const [isShowChatbot, setIsShowChatbot] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [sessioId, setSessionId] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [disableInput, setDisableInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [endMessage, setEndMessage] = useState(false);
  const [MaxMessage, setMaxMessage] = useState(70);
  const [aiResponsesCount, setAiResponsesCount] = useState(0);
  const chatContentRef = useRef(null);
  const inputRef = useRef(null);
  const wrapRef = useRef(null);
  const [showChat, setIsShowChat] = useState(false);

  const sendMessage = async () => {
    if (message.trim() === "") return;

    if (aiResponsesCount === MaxMessage) {
      setEndMessage(true);
      return;
    }

    const headers = {
      "X-Language": "fa",
    };

    setIsEmpty(false);
    const newMessage = {
      id: crypto.randomUUID(),
      isai: false,
      text: message,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");
    setDisableInput(true);
    setLoading(true);

    try {
      const body = {
        query: message,
        ...(sessioId && { session_id: sessioId }),
      };
      const res = await axios.post(
        `https://api.nobinco.com/chat/product/productinfochatIP/`,
        body,
        {
          headers,
        }
      );

      if (res.status === 201 || res.status === 200) {
        console.log(res.data);
        setDisableInput(false);
        setLoading(false);

        if (res.data.session_id) {
          setSessionId(res.data.session_id);
        }
        if (res.data.request_limit) {
          setMaxMessage(res.data.request_limit);
        }

        const messageAi = {
          id: crypto.randomUUID(),
          isai: true,
          text: res.data.ai_assistant,
        };

        setMessages((prevMessages) => [...prevMessages, messageAi]);
        setAiResponsesCount((prevCount) => prevCount + 1);

        if (res.data.seggestion_list) {
          const suggestionMessage = {
            id: crypto.randomUUID(),
            isai: true,
            images: res.data.seggestion_list,
          };
          setMessages((prevMessages) => [...prevMessages, suggestionMessage]);
        }
      }
    } catch (error) {
      setLoading(false);
      setDisableInput(false);
      const errorMessage = {
        id: messages.length + 1,
        isai: true,
        text: "مشکلی پیش آمده بزودی برمیگردیم",
        isError: true,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const refreshChat = () => {
    setMessage("");
    setMessages("");
    setSessionId("");
    setEndMessage(false);
    setMaxMessage(70);
  };

  useEffect(() => {
    const chatContentElement = chatContentRef.current;
    if (chatContentElement) {
      const isContentOverflowing =
        chatContentElement.scrollHeight > chatContentElement.clientHeight;

      if (isContentOverflowing) {
        chatContentElement.scrollTo({
          top: chatContentElement.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "20px";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
      wrapRef.current.style.borderRadius = "20px";
    }
  }, [message]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 840 && isShowChatbot) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", handleResize);
    };
  }, [isShowChatbot]);

  return (
    <>
      <div className={`chatbot-container ${isShowChatbot && "activeChat"}`}>
        <div className="chatbot-header">
          <div className="chatbot-logo-wrapper">
            <img src="images/logo2.png" alt="logo" />
          </div>
          {showChat ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="#000"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setIsShowChat(false);
              }}
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 1-.5.5H3.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4A.498.498 0 0 1 2 8a.498.498 0 0 1 .146-.354l4-4a.5.5 0 0 1 .708.708L3.707 7.5H14.5A.5.5 0 0 1 15 8z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="#000"
              className="bi bi-x"
              viewBox="0 0 16 16"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setIsShowChatbot(false);
              }}
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          )}
        </div>
        {showChat ? (
          <>
            <div className="chatbot-body">
              <div className="chat-content" ref={chatContentRef}>
                {messages.length > 0 &&
                  messages.map((message) => (
                    <Message key={message.id} message={message} />
                  ))}
                {loading && (
                  <div className="loading-chat">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                )}

                {isEmpty && (
                  <div className="logo-content">
                    <div className="img-wrapper">
                      <img src="images/logo2.png" alt="logo" />
                    </div>
                  </div>
                )}
                {endMessage && (
                  <>
                    <div className={`message_wrapper_ai`}>
                      <p className={`chat-contant-ai`}>
                        از صحبت با شما لذت بردم! برای کمک به بهتر شدن سرویس و
                        ارائه راهنمایی‌های بیشتر، چت ما به ۱۰ سوال محدود شده
                        است. اگر نیاز به اطلاعات بیشتری دارید، می‌توانید یک چت
                        جدید شروع کنید. خوشحال می‌شم دوباره کمکتون کنم!
                      </p>
                    </div>
                    <div className="d-flex justify-content-center mt-5">
                      <button className="btn-maxlenght" onClick={refreshChat}>
                        چت جدید
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="chat-bottom">
              <div className="chatbot-actions" ref={wrapRef}>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  autoComplete="false"
                  type="text"
                  maxLength={120}
                  placeholder="پیام خود را وارد کنید"
                  className={`input-chat ${
                    disableInput && "disable-input-chat"
                  }`}
                  onKeyDown={handleKeyDown}
                  disabled={disableInput}
                  ref={inputRef}
                  style={{
                    overflow: "hidden",
                    resize: "none",
                    height: "20px",
                    direction: "rtl",
                  }}
                />
                <button onClick={sendMessage}>
                  <svg
                    style={{ cursor: "pointer" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="#000"
                    className="bi bi-send"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <ul className="chat-list">
              <li className="item-chat" onClick={() => setIsShowChat(true)}>
                دستیار فروش محصول
              </li>
              <li className="item-chat" onClick={() => setIsShowChat(true)}>
                سوال و جواب
              </li>
            </ul>
          </>
        )}
        <p className="text-bottom">Powered By Nobin</p>
      </div>

      <div
        className="chatbot-icon-wrapper"
        onClick={() => {
          setIsShowChat(false);
          setIsShowChatbot((prev) => !prev);
        }}
      >
        <img src="images/iconchat.png" alt="icon" />
      </div>
    </>
  );
}
