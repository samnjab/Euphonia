export default function TrackSearchResult({ artist, selectArtist }) {
    function handleSelect() {
        console.log('selected artist is ', artist)
        selectArtist(artist)
    }

    return (
        <div
        style={{ cursor: "pointer" }}
        className='artistSearchResult'
        onClick={handleSelect}>
            <img src={artist.artistImg} style={{ height: "64px", width: "64px" }} />
            <div>
                <div>{artist.name}</div>
                {/* <div>{trac.artist}</div> */}
            </div>
        </div>
    )
}