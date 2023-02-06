export default function DisplayTrack({track, deselectTrack}){
    const handleDeselectTrack = () => {
        deselectTrack(track)
    }
    return(
        <div 
        className="selectedTrack"
        onClick={handleDeselectTrack}
        >
            <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
            <div>
                <div>{track.title}</div> 
                <div>{track.artist}</div>
            </div>
        </div>
    )
}