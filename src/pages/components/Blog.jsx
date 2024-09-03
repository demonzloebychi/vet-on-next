import axios from "axios";
import React, {useEffect, useState} from "react";
import Link from 'next/link'

export default function Doctor({post}){


  const [featuredImage, setFeaturedImage] = useState();
  const [postDate, setPostDate] = useState(null);
  const [postLink, setPostLink] = useState(null);


  const getImage = async () => {
    try {
      const response = await axios.get(post?._links["wp:featuredmedia"][0]?.href);

      if(response.data && response.data.source_url) {
        setFeaturedImage(response.data.source_url);
      }

      if(post.date){
        const dateObj = new Date(post.date);
        const formatedDate = dateObj.toLocaleDateString("ru-RU",{
          year: "numeric",
          month: "long",
          day: "numeric"
        });
        setPostDate(formatedDate);
      }

      if(post.link){

      }



    } catch(error) {
      console.log("Error - ", error );
    }
  };

  useEffect(() => {
    getImage();
  }, [post]);

  return post && (
    <>
    <Link key={post.id} href={`/blog/${post.id}`} className="blog-item">
      {featuredImage && <img src={featuredImage} alt={post.title.rendered} />}
      <div className="info">
        <h2 className=""> {post.title.rendered}</h2>
        <div className="date">{postDate}</div>
        {/* <div className="excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered}} /> */}
        {/* <div className="info-more">
        </div> */}

      </div>

    </Link>
    </>
  
  )
}