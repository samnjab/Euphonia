export default function DisplayTrack({track, deselectTrack}){
    const handleDeselectTrack = () => {
        deselectTrack(track)
    }
    return(
        <div 
        className="selectedTrack"
        onClick={handleDeselectTrack}
        >
            <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} className='cover'/>
            <div className='info'>
                <h5>{track.title}</h5> 
                <h5>{track.artist}</h5>
            </div>
        </div>
    )
}