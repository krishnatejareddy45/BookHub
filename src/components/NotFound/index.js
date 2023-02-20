import './index.css'

const NotFound = props => {
  const {history} = props

  const backToHome = () => {
    history.replace('/')
  }
  return (
    <div className="not-found-container">
      <img
        src="https://ik.imagekit.io/svnfnbal8/Group_7484.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676198767608"
        className="not-image"
        alt="not found"
      />
      <h1 className="not-heading">Page Not Found</h1>
      <p className="not-desc">
        we are sorry, the page you requested could not be found, Please go back
        to the homepage.
      </p>
      <button className="not-button" onClick={backToHome}>
        Go Back to Home
      </button>
    </div>
  )
}
export default NotFound
