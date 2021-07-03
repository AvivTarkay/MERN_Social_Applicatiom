import React, { useContext, useState, useEffect, useRef } from "react";
import TopBarTest from "../../components/topbar/TopBarTest";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import "./messenger.css";

function Messenger() {
	const [conversations, setConversations] = useState([]);
	const [currentChat, setCurrentChat] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState([]);
	const [incomingMessage, setIncomingMessage] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { user } = useContext(AuthContext);
	const socket = useRef();
	const scrollRef = useRef();

	useEffect(() => {
		socket.current = io("ws://localhost:8900");
		socket.current.on("getMessage", data => {
			setIncomingMessage({
				sender: data.senderId,
				text: data.text,
				createdAt: Date.now(),
			});
		});
	}, []);

	useEffect(() => {
		incomingMessage &&
			currentChat?.members.includes(incomingMessage.sender) &&
			setMessages(prev => [...prev, incomingMessage]);
	}, [incomingMessage, currentChat]);

	useEffect(() => {
		socket.current.emit("addUser", user._id);
		socket.current.on("getUsers", users => {
			setOnlineUsers(
				user.followings.filter(friend =>
					users.some(user => user.userId === friend)
				)
			);
		});
	}, [user]);

	useEffect(() => {
		const getConversations = async () => {
			try {
				const res = await axios.get("/conversations/" + user._id);
				setConversations(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getConversations();
	}, [user._id]);

	useEffect(() => {
		const getMessages = async () => {
			try {
				const res = await axios.get("/messages/" + currentChat?._id);
				setMessages(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getMessages();
	}, [currentChat]);

	const handleSubmit = async e => {
		e.preventDefault();
		const message = {
			conversationId: currentChat._id,
			sender: user._id,
			text: newMessage,
		};

		const receiverId = currentChat.members.find(member => member !== user._id);

		socket.current.emit("sendMessage", {
			senderId: user._id,
			receiverId,
			text: newMessage,
		});

		try {
			const res = await axios.post("/messages", message);
			setMessages([...messages, res.data]);
			setNewMessage("");
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);
	return (
		<React.Fragment>
			<TopBarTest />
			<div className="messenger">
				<div className="chatMenu">
					<div className="chatMenuWrapper">
						<input placeholder="Search for friends" className="chatMenuInput" />
						{React.Children.toArray(
							conversations.map(conversation => {
								return (
									<div
										onClick={() => {
											setCurrentChat(conversation);
										}}
									>
										<Conversation
											conversation={conversation}
											currentUser={user}
										/>
									</div>
								);
							})
						)}
					</div>
				</div>
				<div className="chatBox">
					<div className="chatBoxWrapper">
						{currentChat ? (
							<React.Fragment>
								<div className="chatBoxTop">
									{React.Children.toArray(
										messages.map(message => {
											return (
												<div ref={scrollRef}>
													<Message
														message={message}
														myMessage={message.sender === user._id}
													/>
												</div>
											);
										})
									)}
								</div>
								<div className="chatBoxBottom">
									<textarea
										className="chatBoxMessageInput"
										placeholder="Write your message.."
										onChange={e => setNewMessage(e.target.value)}
										value={newMessage}
									></textarea>
									<button className="chatSubmitBtn" onClick={handleSubmit}>
										Send
									</button>
								</div>
							</React.Fragment>
						) : (
							<span className="noConversationText">
								Open conversation to start chat.
							</span>
						)}
					</div>
				</div>
				<div className="chatOnline">
					<div className="chatOnlineWrapper">
						<ChatOnline
							onlineUsers={onlineUsers}
							currentId={user._id}
							setCurrentChat={setCurrentChat}
						/>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default Messenger;
