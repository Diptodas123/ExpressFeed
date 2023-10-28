import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spineer from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general",
        apiKey: "",
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        apiKey: PropTypes.string,
    }
    capitalizeText = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        };
        let newTitle = this.capitalizeText(this.props.category);
        document.title = `${newTitle} - ExpressFeed`;
    }

    updateNews = async () => {
        const URL = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
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
    async componentDidMount() {
        this.updateNews();
    }

    fetchMoreData = async () => {
        const URL = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let response = await fetch(URL);
        let data = await response.json();
        await this.setState({
            articles: this.state.articles.concat(data.articles),
            totalResults: data.totalResults,
            page: this.state.page + 1,
        })
    };

    render() {
        return (
            <>
                <h1 className='text-center' style={{ margin: "18px 0px" }}>ExpressFeed - Top {this.capitalizeText(this.props.category)} Headlines</h1>
                {this.state.loading && <Spineer />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spineer />}
                >
                    <div className='container my-3'>
                        <div className='row'>
                            {
                                this.state.articles.map((element) => {
                                    return (
                                        <div className="col-md-3 col-lg-4 col-sm-12" key={element.url}>
                                            <NewsItem
                                                title={element.title ? element.title : ""}
                                                description={element.description ? element.description : ""}
                                                imageUrl={element.urlToImage}
                                                newsUrl={element.url}
                                                author={element.author ? element.author : "unknown"}
                                                publishedAt={element.publishedAt ? new Date(element.publishedAt).toGMTString() : "date"}
                                                source={element.source.name}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}
