export default function DisplayTrack({track}){
    return(
        <div className="selectedTrack">
            <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
            <div>
                <div>{track.title}</div> 
                <div>{track.artist}</div>
            </div>
        </div>
    )
}