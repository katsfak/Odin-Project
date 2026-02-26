import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ChatPage.css";
import { useAuth } from "../utils/AuthContext";
import * as api from "../utils/api";

export default function ChatPage() {
  const { userId } = useParams();
  const { user, token } = useAuth();
  const [otherUser, setOtherUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadChat();
  }, [userId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadChat = async () => {
    try {
      setLoading(true);
      const [conversation, profile] = await Promise.all([
        api.getConversation(userId, token),
        api.getUserProfile(userId, token),
      ]);
      setMessages(conversation);
      setOtherUser(profile);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const newMessage = await api.sendMessage(
        parseInt(userId),
        content,
        null,
        token,
      );
      setMessages([...messages, newMessage]);
      setContent("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await api.deleteMessage(messageId, token);
      setMessages(messages.filter((m) => m.id !== messageId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading)
    return (
      <div className="chat-page">
        <div className="loading">Loading chat...</div>
      </div>
    );

  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="chat-header">
          {otherUser && (
            <>
              <div className="user-info">
                {otherUser.avatar && (
                  <img
                    src={otherUser.avatar}
                    alt={otherUser.username}
                    className="avatar"
                  />
                )}
                <div>
                  <h2>{otherUser.username}</h2>
                  <p className="status">
                    {otherUser.isOnline ? "🟢 Online" : "⚫ Offline"}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="messages-container">
          {error && <div className="error-message">{error}</div>}

          {messages.length === 0 ? (
            <div className="no-messages">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.senderId === user.id ? "sent" : "received"}`}
              >
                <div className="message-content">
                  <p>{msg.content}</p>
                  {msg.imageUrl && (
                    <img
                      src={msg.imageUrl}
                      alt="Sent"
                      className="message-image"
                    />
                  )}
                </div>
                <small>{new Date(msg.createdAt).toLocaleTimeString()}</small>
                {msg.senderId === user.id && (
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteMessage(msg.id)}
                    title="Delete message"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="message-form">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type a message..."
            disabled={loading}
          />
          <button type="submit" disabled={loading || !content.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
