import React, { useEffect, useState } from 'react';
import axios from "axios";
import Menu from '../components/Menu';
import Doctor from "../components/Doctor";

function App() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchInitialPosts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`https://vethome24.ru/wp-json/wp/v2/doctors?per_page=9&page=1`);
        const totalPages = parseInt(res.headers['x-wp-totalpages']);
        setPosts(res.data);
        setTotalPages(totalPages);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
      setIsLoading(false);
    };

    fetchInitialPosts();
  }, []);

  const fetchMorePosts = async () => {
    if (currentPage < totalPages) {
      setIsLoading(true);
      try {
        const res = await axios.get(`https://vethome24.ru/wp-json/wp/v2/doctors?per_page=9&page=${currentPage + 1}`);
        setPosts((prevPosts) => [...prevPosts, ...res.data]);
        setCurrentPage(currentPage + 1);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
      setIsLoading(false);
    }
  };

  return (
    <div className='container'>
      <Menu />
      <h1>Врачи</h1>
      <div className="blog-items">
        {posts.map((item) => (
          <Doctor key={item.id} post={item} />
        ))}
      </div>
      {currentPage < totalPages && (
        <button className='load-more-btn' onClick={fetchMorePosts} disabled={isLoading}>
          {isLoading ? 'Загрузка...' : 'Загрузить больше'}
        </button>
      )}
    </div>
  );
 
}

export default App;