import React, { useState, useEffect } from 'react'

const App = () => {
	const [message, setMessage] = useState(null)
	const [value, setValue] = useState(null)
	const [currentTitle, setCurrentTitle] = useState(null)
	const [previousChats, setPreviousChats] = useState([])

	const createNewChat = () => {
		setMessage(null)
		setValue("")
		setCurrentTitle(null)
	}
	
	const handleClick = (uniqueTitle) => {
		setMessage(null)
		setValue("")
		setCurrentTitle(uniqueTitle)
	}

	const getMessages = async () => {
		const options = {
			method: "POST",
			body: JSON.stringify({
				message: value,
			}),
			headers: {
				"Content-Type": "application/json"
			}
		}
		try {
			console.log('clicked');
			const response = await fetch('http://localhost:8000/completions', options)
			const data = await response.json();
			setMessage(data.choices[0].message)
		}
		catch (err) {
			console.error(err)
		}
	}
	// console.log(message)

	useEffect(() => {
		console.log(currentTitle, value, message)
		if (!currentTitle && value && message) {
			setCurrentTitle(value)
		}
		if (currentTitle && value && message) {
			setPreviousChats(prevChats => (
				[...prevChats, {
					title: currentTitle,
					role: "user",
					content: value
				}, {
					title: currentTitle,
					role: message.role,
					content: message.content
				}]
			))
		}

	}, [message, currentTitle])

	console.log(previousChats)
	
	
	const currentChat = previousChats.filter(previousChat => 
		previousChat.title === currentTitle
	)
	console.log(currentChat)

	const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))

	return (
		<div className='app'>
			<section className='side-bar'>
				<button onClick={createNewChat}>+ New Chat</button>
				<ul className='history'>
					{
						uniqueTitles?.map((title, index) => <li key={index} onClick={() => handleClick(title)}>{title}</li>)
					}
				</ul>
				<nav>
					<p>Made by Sarang</p>
				</nav>
			</section>
			<section className="main">
				{!currentTitle && <h1>SaraGPT</h1>}
				<ul className="feed">
					{currentChat?.map((chatMessage, index) => (
						<li key={index} className={`${chatMessage.role==='user'?'user':'ai'}`}>
							<p className='role'>{chatMessage.role}</p>
							<p >{chatMessage.content}</p>
						</li>
					))}

				</ul>
				<div className='bottom-section'>
					<div className="input-container">
						<input type="text" value={value} onChange={e => setValue(e.target.value)} />
						<div id="submit" onClick={getMessages}>&#x27A2;</div>
					</div>
					<p className="info">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quasi ratione, vel quos magni neque.</p>
				</div>
			</section>
		</div>
	)
}

export default App