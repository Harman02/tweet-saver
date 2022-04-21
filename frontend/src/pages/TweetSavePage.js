import React, { useEffect, useState } from "react";
import axios from "axios";
import TweetSearch from "../components/TweetSearch";
import TweetDisplay from "../components/TweetDisplay";

function drop(event, dataToSave, localStorageData) {
    if (localStorageData) {
        const finalData = [...localStorageData, dataToSave];
        localStorage.setItem('savedData', JSON.stringify(finalData));
    } else {
        localStorage.setItem('savedData', JSON.stringify([dataToSave]));
    }
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
}

function allowDrop(event) {
    event.preventDefault();
}


function drag(event, item, setDataToSave) {
    setDataToSave(item)
    event.dataTransfer.setData("text", event.target.id);
}

const TweetSavePage = () => {
    const [data, setData] = useState([]);
    const [savedData, setSavedData] = useState([]);
    const [dataToSave, setDataToSave] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const localStorageData = JSON.parse(localStorage.getItem('savedData'));

    useEffect(() => {
        const info = localStorage.getItem('savedData');
        setSavedData(info ? JSON.parse(info) : []);
    }, [])

    const getTweet = async (searchQuery) => {
        setLoading(true);
        await axios
            .get(`/api/search`, { params: { q: searchQuery } })
            .then(response => {
                const data = response.data.data.statuses;
                const requiredInfo = data?.map((item, idx) => {
                    return {
                        id: item.user.id,
                        text: item.text,
                        name: item.user.name,
                        photo: item.user.profile_image_url_https,
                        date: item.created_at,
                        handle: item.user.screen_name
                    }
                })
                setData(requiredInfo);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                setError(error.message);
            })
    }

    return (
        <div className="container-fluid row">
            {/* search and displays results in a column */}
            <div className="col-sm-5">
                <TweetSearch getTweet={getTweet} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                {loading ?
                    <div className="spinner-border text-muted mt-4 ml-4"></div>
                    :
                    <div className="tweets-display" id="div1" onDrop={(event) => drop(event, dataToSave, localStorageData)} onDragOver={(event) => allowDrop(event)}>
                        {error ?
                            <p>{error}</p>
                            : data?.map((item) =>
                                <div className='d-flex col align-items-top main-div' draggable={true} onDragStart={(event) => drag(event, item, setDataToSave)} id={item.id}>
                                    <TweetDisplay item={item} />
                                </div>
                            )}
                    </div>}
            </div>

            <div className="col-sm-2 d-flex align-items-center">
                <i>Drag Tweets </i>
                <i class="fa fa-share"></i>
                <i>to save</i>
            </div>

            {/* saved tweets block */}
            <div className="col-sm-5 ml-4">
                <h3 className="mb-4 text-secondary">Saved Tweets</h3>
                <div className="tweets-display" id="div2" onDrop={(event) => drop(event, dataToSave, localStorageData)} onDragOver={(event) => allowDrop(event)}>
                    {savedData && savedData?.length ? savedData?.map((item) =>
                        <div className='d-flex col align-items-top main-div' id={item.id}>
                            <TweetDisplay item={item} />
                        </div>
                    )
                        : null}

                </div>
            </div>
        </div>
    )
}

export default TweetSavePage;