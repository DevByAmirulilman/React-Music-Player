import React, { useState,useRef} from 'react';
//Adding Components
import Player from "./components/Player";
import Song from "./components/Song";
//import style
import './styles/app.scss';
//import Library
import Library from "./components/Library";
//import Util
import data from "./Data";
//import nav
import Nav from "./components/Nav";

function App() {
  //state
  const [libraryStatus,setLibraryStatus]=useState(false);
  const [songs,setSongs]=useState(data());
  const [currentSong,setCurrentSong]=useState(songs[0]);
  const [isPlaying,setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  
  const [songInfo,setSongInfo] = useState({
    currentTime:0,
    duration:0,
    animationPercentage:0,
});
const timeUpdateHandler = (e)=>{
  const current = e.target.currentTime;
  const duration = e.target.duration;
  //calculate percentage
  const roundedCurrent = Math.round(current);
  const roundedDuration = Math.round(duration);
  const animation= Math.round((roundedCurrent/roundedDuration)*100);
  console.log(animation);
  setSongInfo({...songInfo,currentTime:current,duration, animationPercentage:animation,})


};
const songEndHandler= async ()=>{
  let currentIndex = songs.findIndex((song)=>song.id === currentSong.id);
  await  setCurrentSong(songs[(currentIndex+1)%songs.length]);
  if(isPlaying) audioRef.current.play();
}
  return (

    <div className={`App ${libraryStatus ? "library-active":""} ${isPlaying ? "playing-animation" : "body"}`} >
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player 
      audioRef={audioRef} 
      setIsPlaying={setIsPlaying} 
      isPlaying={isPlaying} 
      currentSong={currentSong} 
      setSongInfo={setSongInfo}
      songInfo={songInfo}
      songs={songs}
      setCurrentSong={setCurrentSong}
      setSongs={setSongs}
      />

      <Library libraryStatus={libraryStatus} setSongs={setSongs} audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong} isPlaying={isPlaying}/>
      <audio 
            onTimeUpdate={timeUpdateHandler} 
            onLoadedMetadata={timeUpdateHandler}
            ref={audioRef}
            src={currentSong.audio}
            onEnded={songEndHandler}
            >
            
            </audio>
      </div>

  );
}

export default App;
