import React, { useEffect, useRef } from "react";
import { useState } from "react";
const Posts = () => {
  const [post, setpost] = useState([]);
  const [page, setpage] = useState(1);
  const elementref = useRef(null);
  const fetchdata = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`
      );
      const data = await response.json();
      // console.log(data)

      setpost((prev) => [...prev, ...data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handalintersection = (entrise) => {
      console.log(entrise);
      if (entrise[0].isIntersecting) {
        setpage((prev) => prev + 1);
      }
    };
    const observer = new IntersectionObserver(handalintersection, {
      threshold: 0.5,
    });
    if (observer && elementref.current) {
      observer.observe(elementref.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [post]);

  useEffect(() => {
    fetchdata();
  }, [page]);

  return (
    <>
      {post.map((postitem) => (
        <div>
          <div className="container">
            <h3>{postitem.title}</h3>
            <p> {postitem.body}</p>

            <div ref={elementref} />
          </div>
        </div>
      ))}
    </>
  );
};
export default Posts;
