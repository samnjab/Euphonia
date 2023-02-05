export default function DisplayArtist({ artist}){
    return(
        <div className="selectedTrack">
            <img src={artist.uri} style={{ height: "64px", width: "64px" }} />
            <div>
                <div>{artist.name}</div> 
                {/* <div>{track.artist}</div> */}
            </div>
        </div>
    )
}