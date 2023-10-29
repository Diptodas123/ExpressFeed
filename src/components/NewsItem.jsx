import React from 'react'
import { Link } from 'react-router-dom';

const NewsItem = (props) => {
  const { title, description, imageUrl, newsUrl, publishedAt, author, source } = props;
  return (
    <div className='mb-3'>
      <div className="card h-100">
        <img src={imageUrl ? imageUrl : "https://e7.pngegg.com/pngimages/427/1011/png-transparent-breaking-news-concept-design-graphic-for-tv-news-channels-thumbnail.png"} className="card-img-top" alt={"News Thumbnail"} />
        <div className="card-body">
          <h5 className="card-title">{title} <span className="badge badge-danger">{source}</span></h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-danger">by {author} on {publishedAt}</small></p>
          <Link target='_blank' to={newsUrl} className="btn btn-sm btn-dark">Read More</Link>
        </div>
      </div>
    </div>
  )
}

export default NewsItem;