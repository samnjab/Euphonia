import React from "react"

export default function TrackSearchResult({ track, selectTrack}) {
    function handleSelect() {
        console.log('selected track is ', track)
        selectTrack(track)
        
    }

    return ( 

      <div
          style={{ cursor: "pointer" }}
          className='trackSearchResult'
          onClick={handleSelect}>
          <img src={track.albumUrl} className='cover'/>
          <div className='info'>
              <h5>{track.title}</h5>
              <h5>{track.artist}</h5>
          </div>
      </div>
    )
}