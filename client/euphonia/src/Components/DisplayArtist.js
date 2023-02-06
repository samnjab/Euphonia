export default function DisplayArtist({ artist, deselectArtist }){
    const handleDeselectArtist = () => {
        deselectArtist(artist)
    }


    return(
        <div 
        className="selectedTrack"
        onClick={handleDeselectArtist}
        >
            <img src={artist.artistImg} style={{ height: "64px", width: "64px" }} className='cover'/>
            <div className='info'>
                <h5>{artist.name}</h5> 
                
            </div>
        </div>
    )
}