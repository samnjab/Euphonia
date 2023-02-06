import React from "react"

export default function TrackSearchResult({ track, playTrack }) {
    function handleSelect() {
        console.log('selected track is ', track)
        playTrack(track)
    }

    return ( 

      <div
          style={{ cursor: "pointer" }}
          className='recoTrack'
          onClick={handleSelect}>
          <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
          <div>
              <div>{track.title}</div>
              <div>{track.artist}</div>
          </div>
      </div>
    )
}