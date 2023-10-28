import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spineer from './Spineer';
import PropTypes from 'prop-types'

export default class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general",
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: null
        };

    }

    async componentDidMount() {
        let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a6e009a4dfcb456cb4b5b4abe72c6b23&page=1&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true
        })
        let response = await fetch(URL);
        let data = await response.json();
        this.setState({
            loading: false,
            articles: data.articles,
            totalResults: data.totalResults,
        })
    }

    handlePrevClick = async () => {
        let URL = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&category={this.props.category}&apiKey=a6e009a4dfcb456cb4b5b4abe72c6b23&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true
        })
        let response = await fetch(URL);
        let data = await response.json();
        this.setState({
            loading: false,
            articles: data.articles,
            page: this.state.page - 1,
        })
    }

    handleNextClick = async () => {
        let URL = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=a6e009a4dfcb456cb4b5b4abe72c6b23&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true
        })
        let response = await fetch(URL);
        let data = await response.json();
        this.setState({
            loading: false,
            articles: data.articles,
            page: this.state.page + 1,
        })
    }

    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center' style={{margin:"18px 0px"}}>ExpressFeed - Top Headlines</h1>
                {this.state.loading && <Spineer />}
                <div className='row'>
                    {
                        !this.state.loading && this.state.articles.map((element) => {
                            return (
                                <div className="col-md-3 col-lg-4 col-sm-12" key={element.url}>
                                    <NewsItem
                                        title={element.title ? element.title : ""}
                                        description={element.description ? element.description : ""}
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="container d-flex justify-content-between my-3">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}
