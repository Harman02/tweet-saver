//Search component
const TweetSearch = ({ getTweet, searchQuery, setSearchQuery }) => {
   
    return (
        <>
            <input
                className="tweet-search"
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                }}
                placeholder="Search Twitter"
            />
            <button type="button" className="search-btn" onClick={() => searchQuery ? getTweet(searchQuery): null}><i className="fa fa-search"></i></button>
        </>
    )
}

export default TweetSearch;