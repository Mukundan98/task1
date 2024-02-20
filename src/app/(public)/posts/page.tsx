
"use client"
import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '@/app/globals.css';
import ReactPaginate from "react-paginate";


interface Post {
  title: string;
  body: string;
  id: number;
}

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

function Page() {      
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentPage, setCurrentPage] = useState();

  useEffect(() => {    
    const fetchData = async () => {           
     
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=10`);
        const postData = await response.json();
        console.log(postData);
        setPosts(postData);
 
       const response2 = await fetch(`https://jsonplaceholder.typicode.com/posts/${postData[0].id}/comments`);
       const commentData = await response2.json();
       setComments(commentData);
       
    };

    fetchData();
  }, [currentPage]);

  const handlePageClick = async (pageNum:any) => {   
    console.log("page"+pageNum);
    const Page = pageNum.selected + 1;    
    setCurrentPage(Page);     
  }                                
      
  return (
    <div className="container">
      <div className="col align-self-center"> 
        {posts.map((post: Post) => (
          <Popup
            key={post.id}
            trigger={
              <div style={{ backgroundColor: 'lightgreen', marginBottom: '12px' }}>
                <div className="card mb-2 mx-1">
                  <div className="card-body">
                    <h2 className="card-title text-primary">{post.title}</h2>
                    <p>{post.body}</p>
                  </div>
                </div>
              </div>
            }
          >
            <div className="allcomms">
              {comments.map((comment: Comment) => (
                <div className="comments" key={comment.id}>
                  <h1>name: {comment.name}</h1>
                  <h1>email: {comment.email}</h1>
                  <p>body: {comment.body}</p>
                </div>
              ))}
            </div>
          </Popup>
          
        ))}
         <div >
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
        </div>
      </div>
  );
}

export default Page;
