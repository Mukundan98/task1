
"use client"
import React, { useEffect, useState } from 'react'; 
import 'reactjs-popup/dist/index.css'; 


interface Posts {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

function Page() {
  const [photos, setPhotos] = useState([] as Posts[]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); 
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${currentPage}`);
        const data = await response.json();
        setPhotos(data);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching photos:', error);
        setLoading(false); 
      }
    };
    fetchData();
  }, [currentPage]);

  return (
    <div>

      <div className='container' style={{ width: '70vw', maxHeight: '60vh' , padding: '130px'}}>
        {loading ? (
          <div>Loading...</div> 
        ) : (
          <div className='row row-cols-2'>
            {photos.map((photo, index) => (
              <div className='mb-2' key={photo.id}>
                <img src={photo.url} alt="photos" style={{ width: "45vh", height: "45vh" }} />
              </div>
            ))}
          </div>
        )}
    
      </div>
    </div>
  )
}

export default Page;
