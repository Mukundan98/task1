
"use client"
import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '@/app/globals.css';


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
  const [currentPage, setCurrentPage] = useState(1);
const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const postData = await response.json();
        setPosts(postData);

        if (postData.length > 0) {
          const response2 = await fetch(`https://jsonplaceholder.typicode.com/posts/${postData[0].id}/comments`);
          const commentData = await response2.json();
          setComments(commentData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage]);

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
         <div className='pagination d-flex justify-content-center mt-4'>
            <button className='btn btn-secondary me-2' onClick={() => setCurrentPage(prevPage => prevPage - 1)} disabled={currentPage === 1}>Previous</button>
            <button className='btn btn-secondary' onClick={() => setCurrentPage(prevPage => prevPage + 1)} disabled={currentPage === 10}>Next</button>
          </div>
        </div>
      </div>
  );
}

export default Page;
