import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const condition = {
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: 'FAILURE',
}

class BookItemDetails extends Component {
  state = {newItem: {}, detailsStatus: ''}

  componentDidMount = () => {
    this.getItem()
  }

  onSuccess = obj => {
    const updatedItem = {
      aboutAuthor: obj.about_author,
      aboutBook: obj.about_book,
      authorName: obj.author_name,
      coverPic: obj.cover_pic,
      id: obj.id,
      rating: obj.rating,
      readStatus: obj.read_status,
      title: obj.title,
    }
    console.log(updatedItem)
    this.setState({newItem: updatedItem, detailsStatus: condition.success})
  }

  onFailure = () => {
    this.setState({detailsStatus: condition.failure})
  }

  getItem = async () => {
    this.setState({detailsStatus: condition.progress})

    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSuccess(data.book_details)
    } else {
      this.onFailure()
    }
  }

  tryagain = () => {
    this.getItem()
  }

  renderProgress = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={30} width={30} />
    </div>
  )

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://ik.imagekit.io/svnfnbal8/Group_7522tryagain.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676034869118"
        className="try-image"
        alt="failure view"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button className="failure-button" onClick={this.tryagain}>
        Try Again
      </button>
    </div>
  )

  renderSuccess = () => {
    const {newItem} = this.state
    const {
      authorName,
      coverPic,
      aboutAuthor,
      aboutBook,
      id,
      rating,
      readStatus,
      title,
    } = newItem
    return (
      <div className="book-item-container-desc">
        <div className="book-details-container-desc">
          <div className="both-desc">
            <img src={coverPic} className="item-images-desc" alt="title" />
            <div className="title-author-rating-status">
              <h1 className="title-desc">{title}</h1>
              <p className="author-name-desc">{authorName}</p>
              <div className="item-avg-rating-star-desc">
                <p className="avg-rating-desc">Avg Rating</p>
                <div className="item-star-rating-desc">
                  <img
                    src="https://ik.imagekit.io/svnfnbal8/Icon.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676111334457"
                    className="item-star-desc"
                  />
                  <p className="item-rating-desc">{rating}</p>
                </div>
              </div>

              <p className="status-desc">
                Status: <span className="span-desc">{readStatus}</span>
              </p>
            </div>
          </div>
          <h2 className="author-title-desc">About Author</h2>
          <p className="author-desc">{aboutAuthor}</p>
          <h3 className="author-title-desc">About Book</h3>
          <p className="author-desc">{aboutBook}</p>
        </div>
        <Footer />
      </div>
    )
  }

  renderSwitch = () => {
    const {detailsStatus} = this.state

    switch (detailsStatus) {
      case condition.success:
        return this.renderSuccess()

      case condition.progress:
        return this.renderProgress()

      case condition.failure:
        return this.renderFailure()

      default:
        return null
    }
  }

  render() {
    const {detailsStatus} = this.state
    return (
      <>
        <Header />
        {this.renderSwitch()}
      </>
    )
  }
}

export default BookItemDetails
