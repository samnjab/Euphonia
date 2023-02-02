export default function DisplayTrack({track}){
    console.log('displaying')
    console.log(track.title)
    console.log(track.artist)
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