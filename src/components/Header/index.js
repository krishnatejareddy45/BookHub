import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {BsXCircleFill} from 'react-icons/bs'
import './index.css'

class Header extends Component {
  state = {status: false}

  logout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  logoClicked = () => {
    const {history} = this.props
    history.replace('/')
  }

  hamClicked = () => {
    this.setState({status: true})
  }

  crossClicked = () => {
    this.setState({status: false})
  }

  render() {
    const {status} = this.state
    return (
      <>
        <nav className="nav-container">
          <button className="header-button-logo" onClick={this.logoClicked}>
            <Link to="/">
              <img
                src="https://ik.imagekit.io/svnfnbal8/Group_7731.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675924376083"
                className="header-logo-image"
                alt="website logo"
              />
            </Link>
          </button>
          <ul className="header-book-logout">
            <li className="header-text">
              <Link to="/" className="link-home">
                Home
              </Link>
            </li>
            <li className="header-text">
              <Link to="/shelf" className="link-home">
                Bookshelves
              </Link>
            </li>
            <button className="header-logout" onClick={this.logout}>
              Logout
            </button>
          </ul>
          <GiHamburgerMenu className="ham" onClick={this.hamClicked} />
        </nav>
        {status ? (
          <ul className="min-header-book-logout">
            <li className="header-text">
              <Link to="/" className="link-home">
                Home
              </Link>
            </li>
            <li className="header-text">
              <Link to="/shelf" className="link-home">
                Bookshelves
              </Link>
            </li>
            <button className="header-logout" onClick={this.logout}>
              Logout
            </button>
            <BsXCircleFill className="circle" onClick={this.crossClicked} />
          </ul>
        ) : (
          ''
        )}
      </>
    )
  }
}
export default withRouter(Header)
