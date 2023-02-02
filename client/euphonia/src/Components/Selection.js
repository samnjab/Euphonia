
import DisplayTrack from "./DisplayTrack"
export default function Selection({ selectedTracks }){
    console.log('runnign selection, selected tracks are', selectedTracks)
    return(
        <div className="selectedTracks">
            {
                selectedTracks.map(track=> {
                    return <DisplayTrack track={track} />
                
                }) 
                
            }
            
        </div>
    )
}