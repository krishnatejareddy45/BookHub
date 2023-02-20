import React, {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

const condition = {
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {updatedData: [], status: '', slider: ''}

  componentDidMount() {
    this.getTopBooks()
  }

  onSuccess = newList => {
    this.setState({
      updatedData: newList,
      status: condition.success,
      slider: true,
    })
  }

  onFailure = () => {
    this.setState({status: condition.failure, slider: false})
  }

  getTopBooks = async () => {
    const {updatedData} = this.state
    this.setState({status: condition.progress})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    const newList = data.books.map(each => ({
      authorName: each.author_name,
      coverPic: each.cover_pic,
      id: each.id,
      title: each.title,
    }))

    if (response.ok === true) {
      this.onSuccess(newList)
    } else {
      this.onFailure()
    }
    // console.log(newList)
  }

  renderSlick = () => {
    const {updatedData} = this.state
    return (
      <div className="main-container">
        <div className="slick-container">
          <Slider {...settings}>
            {updatedData.map(eachLogo => {
              const {id, authorName, coverPic, title} = eachLogo
              const sliderImage = () => {
                const {history} = this.props
                history.push(`/books/${id}`)
              }
              return (
                <div className="slick-item" key={id}>
                  <button className="slider-button-image" onClick={sliderImage}>
                    <img
                      className="logo-image"
                      src={coverPic}
                      alt="company logo"
                    />
                  </button>
                  <h1 className="title">{title}</h1>
                  <p className="author-name">{authorName}</p>
                </div>
              )
            })}
          </Slider>
        </div>
      </div>
    )
  }

  findBooks = () => {
    const {history} = this.props
    history.push('/shelf')
  }

  renderSuccess = () => {
    const {slider} = this.state
    return (
      <div className="home-container">
        <h1 className="home-heading">Find Your Next Favorite Books?</h1>
        <p className="home-desc">
          You are in the right place. Tell us what titles or genres you have
          enjoyed in the past, and we will give you
          <br /> surprisingly insightful recommendations.
        </p>
        <button className="min-home-button" onClick={this.findBooks}>
          Find Books
        </button>
        <div className="top-list-container">
          <div className="top-heading-button">
            <h1 className="top-heading">Top Rated Books</h1>
            <button className="home-button" onClick={this.findBooks}>
              Find Books
            </button>
          </div>
          {slider ? this.renderSlick() : this.renderFailure()}
        </div>
        <Footer />
      </div>
    )
  }

  renderProgress = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#0284C7" height={30} width={30} />
    </div>
  )

  tryagain = () => {
    this.getTopBooks()
  }

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://ik.imagekit.io/svnfnbal8/Group_7522tryagain.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676034869118"
        className="try-image"
        alt="failure view"
      />
      <p className="failure-text">Something went wrong,please try again</p>
      <button className="failure-button" onClick={this.tryagain}>
        Try Again
      </button>
    </div>
  )

  renderSwitch = () => {
    const {status} = this.state

    switch (status) {
      case condition.success:
        return this.renderSuccess()

      case condition.progress:
        return this.renderProgress()

      //  case condition.failure:
      //   return this.renderFailure()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderSwitch()}
      </>
    )
  }
}

export default Home
