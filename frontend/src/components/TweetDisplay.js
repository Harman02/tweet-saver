import moment from 'moment';

const TweetDisplay = ({ item }) => {
    return (
        <>
            <div className='col-sm-2'>
                <img src={item.photo} alt='tweet' />
            </div>
            <div className='col-sm-10'>
                <div className='d-flex justify-content-between'> 
                    <span><strong>{item.name}</strong> @{item.handle} </span> 
                    <span>{moment(item.date).format("MMM Do YY HH:mm")}</span>
                </div>
                <p className='text-justify'>{item.text}</p>
               
            </div>
        </>
    )
}

export default TweetDisplay;