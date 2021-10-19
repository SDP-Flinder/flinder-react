import React, { Component } from 'react';

export default class Messages extends Component {
	constructor(props) {
	    super(props);
		this.scrollDown = this.scrollDown.bind(this)
	}

	scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
      }
      
      componentDidMount() {
        this.scrollToBottom();
      }
      
      componentDidUpdate() {
        this.scrollToBottom();
      }
	
	render() {
		const { messages, user, typingUsers } = this.props
		return (
			<div className="thread-container">
				<div className="thread">
					{
						messages.map((mes)=>{
							return (
								<div
									key={mes.id}
									className={`message-container ${mes.sender === user.name && 'right'}`}
								>
									<div className="time">{mes.time}</div>
									<div className="data">
										<div className="message">{mes.message}</div>
										<div className="name">{mes.sender}</div>
									</div>
								</div>

								)
						})
					}
					{
						typingUsers.map((name)=>{
							return (
								<div key={name} className="typing-user">
									{`${name} is typing . . .`}
								</div>
							)
						})
					}
                    <div style={{ float:"left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
				</div>


			</div>
		);
	}
}