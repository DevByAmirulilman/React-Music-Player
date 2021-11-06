import React from 'react'
import LibrarySong from './LibrarySong';

const Library = ({songs,setCurrentSong,audioRef,isPlaying,setSongs,libraryStatus}) => {
    return (
        <div className={`library ${libraryStatus ? 'active-library':''}`}>
            <h2>Library</h2>
            <div className="">
                {songs.map(song => 
                <LibrarySong setSongs={setSongs} isPlaying={isPlaying} key={song.id} id={song.id} songs={songs} setCurrentSong={setCurrentSong} song={song} audioRef={audioRef}/>)}

            </div>
        </div>
    )
}

export default Library;
