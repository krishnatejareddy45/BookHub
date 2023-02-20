import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onSuccess = () => {
    const {history} = this.props
    history.replace('/')
  }

  getUsername = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    console.log(response)

    const data = await response.json()
    //  console.log(data)
    if (response.ok === false) {
      this.setState({errorMsg: data.error_msg})
    } else {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      this.onSuccess()
    }
  }

  takingUsername = event => {
    this.setState({username: event.target.value, errorMsg: ''})
  }

  takingPassword = event => {
    this.setState({password: event.target.value, errorMsg: ' '})
  }

  error = () => {
    const {errorMsg} = this.state
    if (errorMsg !== '') {
      return <p className="error">{errorMsg}</p>
    }
    return null
  }

  render() {
    return (
      <div className="login-container">
        <img
          src="https://ik.imagekit.io/svnfnbal8/Rectangle_1467.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675924376423"
          className="login-image"
          alt="website login"
        />
        <img
          src="https://ik.imagekit.io/svnfnbal8/Ellipse_99.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675924376128"
          className="login-small-image"
          alt="website login"
        />

        <div className="logo-container">
          <div className="logo-input">
            <img
              src="https://ik.imagekit.io/svnfnbal8/Group_7731.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675924376083"
              className="login-logo-image"
              alt="login website logo"
            />
            <form className="form" type="submit">
              <label htmlFor="userId" className="username">
                Username*
              </label>
              <br />
              <input
                type="text"
                id="userId"
                className="input"
                onChange={this.takingUsername}
              />
              <br />
              <label htmlFor="passId" className="username">
                Password*
              </label>
              <br />
              <input
                type="password"
                id="passId"
                className="input"
                onChange={this.takingPassword}
              />
              <br />
              <button className="login-button" onClick={this.getUsername}>
                Login
              </button>
              {this.error()}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
