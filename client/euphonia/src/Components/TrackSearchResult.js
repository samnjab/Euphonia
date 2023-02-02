import React from "react"
export default function TrackSearchResult({ track, playTrack, selectTrack }) {
  function handlePlay() {
    console.log('selected track is ', track)
    selectTrack(track)
    playTrack(track)
  }
  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={handlePlay}>
      <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
      <div>
        <div>{track.title}</div>
        <div>{track.artist}</div>
      </div>
    </div>
  )
}