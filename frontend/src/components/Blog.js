import React from 'react';
import '../css/Blog.css'; // Importing the CSS file for styling

const Blog = () => {
  // Array of blog posts with unique IDs, titles, and content
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
    <div className="container blog"> {/* Main container for the blog section */}
      <h1 className="blog-heading">Our Sweet Blog</h1> {/* Blog section heading */}

      <div className="blog-list"> {/* Container for all blog posts */}
        {blogPosts.map((post) => (
          <div key={post.id} className="blog-item"> {/* Each blog post item */}
            <h3>{post.title}</h3> {/* Blog post title */}
            <p>{post.content}</p> {/* Blog post content/description */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog; // Exporting the Blog component
