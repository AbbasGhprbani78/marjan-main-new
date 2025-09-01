
import React from 'react'
import './Message.css'
import ProductChatItem from '../ProductChatItem/ProductChatItem'
export default function Message({ message }) {
    return (
        <div className={`${message.isai ? "message_wrapper_ai" : "message_wrapper_user"}  ${message.images?.length > 0 && "image_wrap"}`} >
            {
                message.text &&
                <p className={`
                ${message.isai ? "chat-contant-ai" : "chat-contant-user"} 
                ${message.isError && "error-color"}
                `}>
                    {message?.text}
                </p>
            }

            {

                message.images?.length > 0 &&
                <div className='chat-contant-ai ltr w-100'>
                    {
                        message.images.map(item => (
                            <ProductChatItem
                                key={item.name}
                                item={item}
                            // showChatHandler={showChatHandler}
                            />
                        ))
                    }
                </div>
            }
        </div>
    )
}
