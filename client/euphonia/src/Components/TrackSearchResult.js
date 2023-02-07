import React from "react"

export default function TrackSearchResult({ track, selectTrack, playTrack}) {
    
    return ( 

      <div
          style={{ cursor: "pointer" }}
          className='trackSearchResult'
          onClick={()=>selectTrack(track)}
          onMouseOver={()=>playTrack(track)}
          >
          <img src={track.albumUrl} className='cover'/>
          <div className='info'>
              <h5>{track.title}</h5>
              <h5>{track.artist}</h5>
          </div>
      </div>
    )
}