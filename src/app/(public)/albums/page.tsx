"use client"
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import Popup from 'reactjs-popup';

interface albumsType {
  id: number,
  title: string,
  userId: number
}

interface albumPageType {
  albumId: number,
  id: number,
  title: string,
  url: string
}

function page() {
  const [album, setAlbum] = useState([] as albumsType[]);
  const [albumPage, setAlbumPage] = useState([] as albumPageType[]);
  const [currentPage, setCurrentPage] =useState([]as albumPageType[]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/albums?_page=${currentPage}&_limit=10`);
      const data = await response.json();
      console.log(data);
      setAlbum(data);
    }
    getData();

  }, [currentPage])
  
  const getPhoto = async (albumId: number) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
    const data = await res.json()
    setAlbumPage(data);
    console.log(data);

  }


  const handlePageClick = async (data: any) => {
  console.log(data);
  var currentPage = data.selected + 1;
  console.log(currentPage);
  
  setCurrentPage(currentPage);

  }
 

  

  return (
    <>
      <div className="conatiner border px-5 pb-5" style={{ position: 'relative', width: '60%', left: '20%' }}>
        <h4 className='text-center mt-2'>All Albums</h4>
        <div className="row">
          {album.map((obj: albumsType, index) =>
          (

            <Popup trigger={
              <div className='row col-sm-6 col-md-4 v  my-1'>
                <div className="col mx-4">

                  <div className="card mb-4 rounded-4 shadow-sm,card text-bg-success mb-3" >
                    <div className="card-header py-3" style={{ minHeight: 125 }}>
                      <div className=''>
                      <h6 className="fw-mediuam" style={{ fontSize: '14px' }}>Album Title: {obj.title}</h6>
                      <h6 className="fs-6">Album ID: {obj.id}</h6>
                    </div>
                    </div>
                    <div className="card-body mt-2">
                      <button type="button" className="w-100 btn btn-outline-dark" onClick={() => { getPhoto(obj.id) }}>View Album</button>
                    </div>
                  </div>
                </div>
              </div>
            } modal nested>
              <div>
                {
                 <div className="container" style={{ maxHeight: '550px',backgroundColor:' white', overflow: 'auto' }}>
                 <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
                     {albumPage.map((obj: albumPageType, index:number) => (
                         <div key={index} className="col">
                             <div className="card shadow-sm mb-3">
                                 <img src={`${obj.url}`} className="card-img-top" alt="Images" style={{ height: '10rem', objectFit: 'cover' }}/>
                                 <div className="card-body"style={{ height: '8rem' }}>
                                     <h6 className="card-title">Album ID:{obj.albumId}</h6>
                                 </div>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
               }
              </div>
       </Popup>
          )
        )}
        </div>
      </div>
      <div className='container' style={{ marginTop: 50 }} >
       
        <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            breakLabel="..."
            pageCount={10}
            marginPagesDisplayed={3}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            renderOnZeroPageCount={null}
            containerClassName={'pagination justify-content-center'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
          />
      </div>
    </>
  )
}

export default page