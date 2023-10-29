import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeText = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }


    const updateNews = async () => {
        props.setProgress(10);
        const URL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        props.setProgress(30);
        let response = await fetch(URL);
        props.setProgress(50);
        let data = await response.json();
        props.setProgress(70);
        setArticles(data.articles);
        setTotalResults(data.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitalizeText(props.category)} - ExpressFeed`;
        updateNews();
        //eslint-disable-next-line
    }, []);

    const fetchMoreData = async () => {
        const nextPage = page + 1;
        const URL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
        let response = await fetch(URL);
        let data = await response.json();
        setArticles(articles.concat(data.articles));
        setTotalResults(data.totalResults);
        await setPage(nextPage);
    };

    return (
        <>
            <h1 className='text-center' style={{ margin: "15px 0px 10px 0px" }}>ExpressFeed - Top {capitalizeText(props.category)} Headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className='container my-3'>
                    <div className='row'>
                        {
                            articles.map((element) => {
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

News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
    apiKey: "",
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string,
}

export default News;