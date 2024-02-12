"use client"
import React, { useEffect, useState } from 'react';

interface Albums {
  userId: number,
  id: number,
  title: string
}

interface data{
  userId:number,
  id:number,
  title: string
}


function AlbumsPage() {
  const [albums, setAlbums] = useState([] as Albums[]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); 
        const response = await fetch(`https://jsonplaceholder.typicode.com/albums?_page=${currentPage}`);
        const response2 = await fetch (`https://jsonplaceholder.typicode.com/photos?albumId=%7BalbumId%7D`) 
        const data = await response.json();
        const data2 = await response2.json();
        setAlbums(data);
        
        setLoading(false); 

        
      } catch (error) {
        console.error('Error fetching albums:', error);
        setLoading(false); 
      }
    };
    fetchData();
  }, [currentPage]);

  return (
     
        <div className="container">
         <div className="col align-self-center">
            {albums.map((album) => (
              <div className="card mb-2 mx-1" key={album.id}>
                <div className="card-body">
                  <h5 className="card-title text-primary">{album.title}</h5>
                </div>
              </div>
            ))}
          </div>
          <div className='pagination d-flex justify-content-center mt-4'>
            <button className='btn btn-secondary me-2' onClick={() => setCurrentPage(prevPage => prevPage - 1)} disabled={currentPage === 1}>Previous</button>
            <button className='btn btn-secondary' onClick={() => setCurrentPage(prevPage => prevPage + 1)} disabled={currentPage === 10}>Next</button>
          </div>
        </div>
      )}
  


export default AlbumsPage;
