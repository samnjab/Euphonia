import React from "react"

export default function TrackSearchResult({ track, selectTrack, resultsShow }) {
    function handleSelect() {
        console.log('selected track is ', track)
        selectTrack(track)
        
    }

    return ( 

      <div
          style={{ cursor: "pointer" }}
          className='trackSearchResult'
          onClick={handleSelect}>
          <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
          <div>
              <div>{track.title}</div>
              <div>{track.artist}</div>
          </div>
      </div>
    )
}