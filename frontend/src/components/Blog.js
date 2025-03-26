import React from 'react';
import '../css/Blog.css';
 
const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "5 Must-Try Cupcake Flavors 🍓",
      content: "Explore our top cupcake flavors, from classic chocolate to exotic mango delight!"
    },
    {
      id: 2,
      title: "Baking Tips for the Perfect Cupcake 🎂",
      content: "Learn how to achieve the perfect fluffiness, frosting consistency, and moist texture."
    },
    {
      id: 3,
      title: "Behind the Scenes: How We Make Our Cupcakes 👩‍🍳",
      content: "A sneak peek into our kitchen, where the magic of cupcake-making happens!"
    }
  ];
 
  return (
    <div className="container blog">
      <h1 className="blog-heading">Our Sweet Blog</h1>
      <div className="blog-list">
        {blogPosts.map((post) => (
          <div key={post.id} className="blog-item">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default Blog;
 
 