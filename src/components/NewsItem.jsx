import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class NewsItem extends Component {
  render() {
    const { title, description, imageUrl, newsUrl } = this.props;
    return (
      <div className='my-3'>
        <div className="card h-100">
          <img src={imageUrl ? imageUrl : "https://e7.pngegg.com/pngimages/427/1011/png-transparent-breaking-news-concept-design-graphic-for-tv-news-channels-thumbnail.png"} className="card-img-top" alt={"News Thumbnail"} />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <Link target='_blank' to={newsUrl} className="btn btn-sm btn-dark">Read More</Link>
          </div>
        </div>
      </div>
    )
  }
}
