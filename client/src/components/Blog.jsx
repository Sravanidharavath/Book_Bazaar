import React, { useState } from 'react';

const Blog = () => {
  const [expandedPostId, setExpandedPostId] = useState(null);

  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Must-Read Books for Students",
      excerpt: "Explore the most essential books that every student should read — from classics to modern must-reads.",
      content: "These books include To Kill a Mockingbird, 1984, The Catcher in the Rye, and others that shape perspective, critical thinking, and empathy in students.",
      image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1740688699i/56487333.jpg",
      date: "July 15, 2025",
    },
    {
      id: 2,
      title: "How to Sell Your Old Books Online",
      excerpt: "A step-by-step guide on how to list, price, and ship your used books through Online Book Bazaar.",
      content: "Start by creating an account. Then list your books with good images and honest descriptions. Price them fairly, pack securely, and ship via trusted couriers.",
      image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1735859205i/218460303.jpg",
      date: "July 10, 2025",
    },
    {
      id: 3,
      title: "Why Reading Physical Books is Still Important",
      excerpt: "Despite the rise of eBooks, physical books offer unique advantages. Here's why they still matter.",
      content: "Physical books reduce screen fatigue, improve focus, and create deeper engagement. Plus, they don't require batteries and can be passed down generations.",
      image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1729776933i/218569826.jpg",
      date: "July 5, 2025",
    },
    {
      id: 4,
      title: "Reading Books for Students",
      excerpt: "Explore the most essential books that every student should read — from classics to modern must-reads.",
      content: "Books like The Alchemist and Sapiens inspire students to dream, think critically, and understand the world from a broader perspective.",
      image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1724983072i/216879594.jpg",
      date: "July 21, 2025",
    },
    {
      id: 5,
      title: "Online Books for Cooking",
      excerpt: "A step-by-step guide on how to list, price, and ship your used books like cooking books through Online Book Bazaar.",
      content: "Cooking books online offer recipes, tips, and videos on a wide range of cuisines. They're perfect for home chefs wanting to explore new dishes.",
      image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546071216i/5907.jpg",
      date: "July 10, 2025",
    },
    {
      id: 6,
      title: "Knowing About Animals in Books is Still Important",
      excerpt: "Despite the rise of eBooks, physical books offer unique advantages. Here's why they still matter.",
      content: "Animal-themed books teach empathy, biology, and care for nature. They are educational for kids and enjoyable for adults who love wildlife.",
      image: "https://play.google.com/books/publisher/content/images/frontcover/SddBEQAAQBAJ?fife=w256-h256",
      date: "July 5, 2025",
    },
  ];

  const toggleExpand = (id) => {
    setExpandedPostId(expandedPostId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 lg:px-24">
      <h1 className="text-4xl font-bold text-blue-700 text-center mb-10">Our Blog</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white shadow rounded-lg overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-5">
              <h2 className="text-xl font-semibold text-blue-700 mb-2">{post.title}</h2>
              <p className="text-sm text-gray-500 mb-3">{post.date}</p>
              <p className="text-gray-700 mb-4">{post.excerpt}</p>

              {expandedPostId === post.id && (
                <p className="text-gray-600 mb-4">{post.content}</p>
              )}

              <button
                onClick={() => toggleExpand(post.id)}
                className="text-blue-600 font-medium hover:underline"
              >
                {expandedPostId === post.id ? "Show Less ↑" : "Read More →"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
