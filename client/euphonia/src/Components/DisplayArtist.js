export default function DisplayArtist({ artist, deselectArtist }){
    const handleDeselectArtist = () => {
        deselectArtist(artist)
    }


    return(
        <div 
        className="selectedTrack"
        onClick={handleDeselectArtist}
        >
            <img src={artist.artistImg} style={{ height: "64px", width: "64px" }} />
            <div>
                <div>{artist.name}</div> 
                {/* <div>{track.artist}</div> */}
            </div>
        </div>
    )
}