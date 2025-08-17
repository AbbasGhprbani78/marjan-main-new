import React from "react";
import "./productChatItem.css";

export default function ProductChatItem({ item }) {
  const url = new URL(item?.link, window.location.origin);
  const relativePath = url.pathname;

  return (
    <div className={`productchat`}>
      <div className="d-flex align-items-center gap-3">
        <div className="img-chat-wrapp">
          <img src={`https://recomchat.ariisco.com${item.image}`} alt="image" />
        </div>
        <span className="product-chat-name">{item.name}</span>
      </div>
      <span className="product-chat-price">{item?.size}</span>
    </div>
  );
}
