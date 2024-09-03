import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import Menu from './components/Menu';
import Doctor from './components/Doctor';

function App() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  const fetchPosts = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`https://vethome24.ru/wp-json/wp/v2/doctors?per_page=20&page=${page}`);
      setPosts((prevPosts) => [...prevPosts, ...res.data]);
      const totalPosts = parseInt(res.headers['x-wp-total']);
      const perPage = parseInt(res.headers['x-wp-totalpages']);
      setTotalPages(perPage);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.scrollY + window.innerHeight >=
        document.body.offsetHeight &&
        currentPage < totalPages &&
        !isLoading
      ) {
        setCurrentPage(currentPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage, totalPages, isLoading]);

  return (
    <>
      <Menu />
      <h1>Врачи</h1>
      <div className="blog-items">
        {posts.map((item) => (
          <Doctor key={item.id} post={item} />
        ))}
      </div>
      {isLoading && <div className='load'>Загрузка...</div>}
    </>
  );
}

export default App;