export default function DisplayArtist({ artist}){
    console.log('displaying')
    console.log(artist.name)
    // console.log(artist.a)
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