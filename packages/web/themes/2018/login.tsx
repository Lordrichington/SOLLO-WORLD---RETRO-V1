import React, { Component } from 'react'
import './login.css'

interface State {
	email: string
	password: string
	username: string
	isLogin: boolean
	error: string
	loading: boolean
}

export default class Login extends Component<{}, State> {
	constructor(props: {}) {
		super(props)
		this.state = {
			email: '',
			password: '',
			username: '',
			isLogin: true,
			error: '',
			loading: false
		}
	}

	handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		this.setState({ [name]: value } as any)
	}

	handleToggle = () => {
		this.setState({ isLogin: !this.state.isLogin, error: '' })
	}

	handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		this.setState({ loading: true, error: '' })

		try {
			const { email, password, username, isLogin } = this.state

			if (isLogin) {
				// Login logic: call a login endpoint or GraphQL mutation if available
				const loginMutation = `mutation {\n  login(email: \"${email}\", password: \"${password}\") {\n    token\n    user { id email }\n  }\n}`
				const res = await fetch('http://localhost:8087/graphql', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ query: loginMutation })
				})
				const json = await res.json()
				if (json.errors) throw new Error(json.errors[0].message || 'Login fehlgeschlagen')
				console.log('Login result', json.data)
				alert('Login erfolgreich (Platzhalter)')
			} else {
				// Register logic
				if (!email || !password || !username) {
					throw new Error('Alle Felder sind erforderlich')
				}

				const mutation = `mutation CreateUser($email: String!, $password: String!, $username: String!) {\n  createUser(data: {\n    email: $email,\n    password: $password,\n    sollos: { create: { username: $username, motto: \"Willkommen bei SOLLO\" } }\n  }) {\n    id\n    email\n    sollos { id username }\n  }\n}`

				const res = await fetch('http://localhost:8087/graphql', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ query: mutation, variables: { email, password, username } })
				})

				const json = await res.json()
				if (json.errors) throw new Error(json.errors[0].message || 'Registrierung fehlgeschlagen')
				console.log('CreateUser result', json.data)
				alert('Registrierung erfolgreich — Sie können sich nun einloggen')
			}

			// Placeholder for actual API call
			setTimeout(() => {
				this.setState({ loading: false })
				alert('Erfolg! (Noch nicht implementiert)')
			}, 1000)
		} catch (error: any) {
			this.setState({ error: error.message, loading: false })
		}
	}

	render() {
		const { isLogin, email, password, username, error, loading } = this.state

		return (
			<div className="login-container">
				<div className="login-box">
					<h1>SOLLO</h1>
					<form onSubmit={this.handleSubmit}>
						{!isLogin && (
							<div className="form-group">
								<input
									type="text"
									name="username"
									placeholder="Benutzername"
									value={username}
									onChange={this.handleInputChange}
									required
								/>
							</div>
						)}

						<div className="form-group">
							<input
								type="email"
								name="email"
								placeholder="E-Mail"
								value={email}
								onChange={this.handleInputChange}
								required
							/>
						</div>

						<div className="form-group">
							<input
								type="password"
								name="password"
								placeholder="Passwort"
								value={password}
								onChange={this.handleInputChange}
								required
							/>
						</div>

						{error && <div className="error-message">{error}</div>}

						<button type="submit" disabled={loading}>
							{loading ? 'Wird geladen...' : isLogin ? 'Anmelden' : 'Registrieren'}
						</button>
					</form>

					<div className="toggle-auth">
						<p>
							{isLogin ? 'Noch kein Konto?' : 'Bereits ein Konto?'}
							{' '}
							<a href="#" onClick={(e) => { e.preventDefault(); this.handleToggle() }}>
								{isLogin ? 'Jetzt registrieren' : 'Jetzt anmelden'}
							</a>
						</p>
					</div>
				</div>
			</div>
		)
	}
}