
import React, { useState, useEffect } from 'react';
import './music.css'

const Music = () => {
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const colors = ['#B0E0E6', '#ADD8E6', '#87CEEB', '#00BFFF', '#1E90FF', '#6495ED'];


  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    const fetchPhotos = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos');
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchAlbums();
    fetchPhotos();
  }, []);

  const filteredAlbums = albums.filter(album => {
    return album.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredPhotos = photos.filter(photo => {
    return photo.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className='container'>
      <div className='searchbar'>
        <input
          type='text'
          className='input'
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder='Search songs...'
        />
      </div>
      <div className='playlist' style={{padding:'4%'}}>
        <h1>Playlist</h1>
        <div className='list'>
          <div  className= 'flex'>
            {filteredPhotos.map((photo) => (
              <div key={photo.id}>
                <img src={photo.thumbnailUrl} alt={photo.title} />
                <div>{photo.id}</div>
                <div>{photo.title}</div>
               
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='songslist' style={{padding:'4%'}}>
        <h1>Songs</h1>
        <div className='list'>
            
        
  {filteredAlbums.map((album, index) => (
    <div key={album.id} className="card" style={{ backgroundColor: colors[index % colors.length] }}>
      <div>{album.id}</div>
      <div>{album.title}</div>
    </div>
  ))}
</div>
      </div>
     
    
      
    </div>
  );
};

export default Music;


