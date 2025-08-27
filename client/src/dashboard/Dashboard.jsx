import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalBooks: 0,
    outOfStockBooks: [],
    inStockBooks: [],
    lowStockBooks: [],
    bestSellingBook: null,
    todayOrders: 0,
    totalStock: 0,
    revenue: 0,
    categoryCounts: {},
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get("http://localhost:5000/all-books");
        setMetrics({
          totalBooks: response.data.totalBooks || 0,
          outOfStockBooks: response.data.outOfStockBooks || [],
          inStockBooks: response.data.inStockBooks || [],
          lowStockBooks: response.data.lowStockBooks || [],
          bestSellingBook: response.data.bestSellingBook || null,
          todayOrders: response.data.todayOrders || 0,
          totalStock: response.data.totalStock || 0,
          revenue: response.data.revenue || 0,
          categoryCounts: response.data.categoryCounts || {},
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen min-h-screen bg-gray-100 overflow-auto">
      <div className="p-6 py-10">
        <h1 className="text-4xl font-bold mb-10">Dashboard</h1>

        {/* Top summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow min-h-[150px]">
            <p className="text-sm">Total Books</p>
            <h2 className="text-3xl font-bold mt-2">{metrics.totalBooks}</h2>
            <ul className="mt-3 space-y-1 text-sm">
              {Object.entries(metrics.categoryCounts).map(([category, count]) => (
                <li key={category}>
                  {category}: {count}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-green-500 text-white p-6 rounded-lg shadow min-h-[150px]">
            <p className="text-sm">Total Stock</p>
            <h2 className="text-3xl font-bold mt-2">{metrics.totalStock}</h2>
          </div>

          <div className="bg-yellow-400 text-white p-6 rounded-lg shadow min-h-[150px]">
            <p className="text-sm">Orders Today</p>
            <h2 className="text-3xl font-bold mt-2">{metrics.todayOrders}</h2>
          </div>

          <div className="bg-purple-500 text-white p-6 rounded-lg shadow min-h-[150px]">
            <p className="text-sm">Revenue</p>
            <h2 className="text-3xl font-bold mt-2">${metrics.revenue}</h2>
          </div>
        </div>

        {/* Bottom cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Out of stock */}
          <div className="bg-white p-6 rounded-lg shadow min-h-[200px]">
            <h2 className="font-semibold text-lg mb-4">Out of Stock Books</h2>
            {metrics.outOfStockBooks.length > 0 ? (
              <>
                <p className="text-sm text-gray-600 mb-3">
                  The following books are currently out of stock and need to be restocked to meet demand.
                </p>
                {metrics.outOfStockBooks.map((book) => (
                  <p key={book._id} className="mb-1">
                    <span className="font-medium">{book.title}</span>{" "}
                    <span className="text-sm text-gray-500">({book.category})</span>
                  </p>
                ))}
              </>
            ) : (
              <p className="text-gray-500">Great! No books are out of stock currently.</p>
            )}
          </div>

          {/* Best selling book */}
          <div className="bg-white p-6 rounded-lg shadow min-h-[200px]">
            <h2 className="font-semibold text-lg mb-4">Best Selling Book</h2>
            {metrics.bestSellingBook ? (
              <>
                <p className="text-sm text-gray-600 mb-3">
                  This book has recorded the highest number of sales on the platform.
                </p>
                <p className="mb-1">
                  <span className="font-medium">Title:</span> {metrics.bestSellingBook.title}
                </p>
                <p className="mb-1">
                  <span className="font-medium">Category:</span> {metrics.bestSellingBook.category}
                </p>
                <p className="mb-1">
                  <span className="font-medium">Units Sold:</span> {metrics.bestSellingBook.sold}
                </p>
              </>
            ) : (
              <p className="text-gray-500">No sales data available yet.</p>
            )}
          </div>

          {/* Low stock books */}
          <div className="bg-white p-6 rounded-lg shadow min-h-[200px]">
            <h2 className="font-semibold text-lg mb-4">Low Stock Books</h2>
            {metrics.lowStockBooks.length > 0 ? (
              <>
                <p className="text-sm text-gray-600 mb-3">
                  These books have limited stock left. Consider restocking soon to avoid going out of stock.
                </p>
                <ul className="space-y-2">
                  {metrics.lowStockBooks.map((book) => (
                    <li key={book._id}>
                      <span className="font-medium">{book.title}</span> - {book.stock} left{" "}
                      <span className="text-sm text-gray-500">({book.category})</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-gray-500">All books are well-stocked.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
