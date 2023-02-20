import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Value from '../Value'
import Bookitem from '../Bookitem'
import Footer from '../Footer'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const condition = {
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: 'FAILURE',
}

class Bookshelves extends Component {
  state = {
    status: bookshelvesList[0].value,
    search: '',
    booklist: [],
    statusLabel: bookshelvesList[0].label,
    contentStatus: '',
    pageStatus: '',
    storingInput: '',
  }

  onSuccess = updatedBooks => {
    this.setState({booklist: updatedBooks, pageStatus: condition.success})
  }

  onFailure = () => {
    this.setState({pageStatus: condition.failure})
  }

  getBooks = async () => {
    this.setState({pageStatus: condition.progress})
    const {status, search} = this.state
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${status}&search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    const {books} = data
    console.log(books)
    const updatedBooks = books.map(each => ({
      authorName: each.author_name,
      coverPic: each.cover_pic,
      id: each.id,
      rating: each.rating,
      readStatus: each.read_status,
      title: each.title,
    }))

    if (updatedBooks.length > 0) {
      this.setState({contentStatus: 'on'})
    } else {
      this.setState({contentStatus: 'off'})
    }

    if (response.ok === true) {
      this.onSuccess(updatedBooks)
    } else {
      this.onFailure()
    }
  }

  componentDidMount = () => {
    this.getBooks()
  }

  passingValue = (value, label) => {
    this.setState({status: value, statusLabel: label}, this.getBooks)
  }

  searchClicked = () => {
    const {storingInput} = this.state
    this.setState({search: storingInput}, this.getBooks)
  }

  takingInput = event => {
    this.setState({storingInput: event.target.value})
  }

  passingId = id => {
    const {history} = this.props
    history.push(`/books/${id}`)
  }

  renderSuccessList = () => {
    const {booklist, status, statusLabel} = this.state
    return (
      <div className="books-list-container">
        <ul className="booklist-container">
          {booklist.map(each => (
            <Bookitem item={each} key={each.id} passingId={this.passingId} />
          ))}
        </ul>
      </div>
    )
  }

  renderNoList = () => {
    const {search} = this.state
    return (
      <div className="no-list-container">
        <img
          src="https://ik.imagekit.io/svnfnbal8/Group.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676118821456"
          className="no-books-image"
          alt="no books"
        />
        <p className="no-books-desc">
          Your search for {search} did not find any matches.
        </p>
      </div>
    )
  }

  contentSwitch = () => {
    const {contentStatus} = this.state
    switch (contentStatus) {
      case 'on':
        return this.renderSuccessList()
      case 'off':
        return this.renderNoList()
      default:
        return null
    }
  }

  renderProgress = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={30} width={30} />
    </div>
  )

  Bookstryagain = () => {
    this.getBooks()
  }

  renderFailure = () => {
    const {booklist, status, statusLabel, search, storingInput} = this.state
    return (
      <div className="bookshelves-container">
        <div className="rectangle">
          <h1 className="rec-heading">Bookshelves</h1>
          {bookshelvesList.map(each => (
            <Value
              obj={each}
              key={each.id}
              passingValue={this.passingValue}
              Active={status === each.value}
            />
          ))}
        </div>
        <div>
          <div className="book-search">
            <h1 className="book-heading">{statusLabel} Books</h1>
            <div className="input-container">
              <input
                type="search"
                className="input"
                placeholder="search"
                onChange={this.takingInput}
                value={storingInput}
                testid="searchButton"
              />
              <button className="button-icon" onClick={this.searchClicked}>
                <img
                  src="https://ik.imagekit.io/svnfnbal8/Round.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676095390788"
                  className="icon"
                  alt="failure view"
                />
              </button>
            </div>
          </div>
          <div className="bookshelves-failure-container">
            <img
              src="https://ik.imagekit.io/svnfnbal8/Group_7522tryagain.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676034869118"
              className="try-image"
            />
            <p className="failure-text">
              Something went wrong,please try again
            </p>
            <button className="failure-button" onClick={this.Bookstryagain}>
              Try again
            </button>
          </div>
        </div>
      </div>
    )
  }

  renderSuccess = () => {
    const {booklist, status, statusLabel, search, storingInput} = this.state
    return (
      <>
        <div className="bookshelves-container">
          <div className="rectangle">
            <h1 className="rec-heading">Bookshelves</h1>
            {bookshelvesList.map(each => (
              <Value
                obj={each}
                key={each.id}
                passingValue={this.passingValue}
                Active={status === each.value}
              />
            ))}
          </div>
          <div>
            <div className="book-search">
              <h1 className="book-heading">{statusLabel} Books</h1>
              <div>
                <input
                  type="search"
                  className="input"
                  placeholder="search"
                  onChange={this.takingInput}
                  value={storingInput}
                />
                <button className="button-icon" onClick={this.searchClicked}>
                  <img
                    src="https://ik.imagekit.io/svnfnbal8/Round.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676095390788"
                    className="icon"
                  />
                </button>
                <div className="min-bookshelves-tags">
                  <h1 className="min-tag-heading">Bookshelves</h1>
                  <div className="min-tags-wrap">
                    {bookshelvesList.map(each => (
                      <Value
                        obj={each}
                        key={each.id}
                        passingValue={this.passingValue}
                        Active={status === each.value}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {this.contentSwitch()}
          </div>
        </div>
        <Footer />
      </>
    )
  }

  renderSwitch = () => {
    const {pageStatus} = this.state
    switch (pageStatus) {
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
    const {booklist, status, statusLabel} = this.state
    return (
      <>
        <Header />
        {this.renderSwitch()}
      </>
    )
  }
}
export default Bookshelves
