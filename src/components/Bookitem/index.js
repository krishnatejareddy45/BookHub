import './index.css'

const Bookitem = props => {
  const {item, passingId} = props
  const {coverPic, title, authorName, rating, readStatus, id} = item

  const imageClicked = () => {
    passingId(id)
  }

  return (
    <li className="list-container-item">
      <button className="button-image-item" onClick={imageClicked}>
        <img src={coverPic} className="image-item" />
      </button>
      <div className="combine-item">
        <h1 className="item-title-item">{title}</h1>
        <p className="item-author-item">{authorName}</p>
        <div className="rating-container-item">
          <p className="item-author-item">Avg Rating</p>
          <div className="star-rating-item">
            <img
              src="https://ik.imagekit.io/svnfnbal8/Icon.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676111334457"
              className="star-icon-item"
            />

            <p className="rating-item">{rating}</p>
          </div>
        </div>
        <div className="status-container-item">
          <p className="item-author-item">Status:</p>
          <p className="item-status-item">{readStatus}</p>
        </div>
      </div>
    </li>
  )
}
export default Bookitem
