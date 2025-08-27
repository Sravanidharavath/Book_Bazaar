import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaCartShopping } from 'react-icons/fa6';
import { useCart } from '../pages/CartContext';

const BookCards = ({ headline, books }) => {
  const { cartItems, addToCart } = useCart();

  const handleAddToCart = (e, book) => {
    e.preventDefault();
  
    const cartItem = {
      id: book._id, // ✅ unique ID
      title: book.bookTitle,
      author: book.authorName,
      image: book.imageURL,
      price: book.price,
    };
  
    addToCart(cartItem); // ✅ Let context manage quantity
  };
  

  // Total items in cart
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="my-16 px-4 lg:px-24">
      <h2 className="text-4xl text-center font-bold text-black mb-6">{headline}</h2>

      {/* <div className="text-right text-lg font-semibold text-blue-700 mb-4">
        Cart Items: {cartCount}
      </div> */}

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 4, spaceBetween: 30 },
          1024: { slidesPerView: 5, spaceBetween: 40 },
        }}
        modules={[Pagination]}
        className="mySwiper w-full h-full"
      >
        {books.map((book) => (
          <SwiperSlide key={book._id}>
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-3 relative">
              {/* Book Image */}
              <Link to={`/book/${book._id}`}>
                <img
                  src={book.imageURL}
                  alt={book.bookTitle}
                  className="w-full h-68 object-cover rounded"
                />
              </Link>

              {/* Add to Cart Button */}
              <button
                className="absolute top-3 right-3 bg-blue-600 hover:bg-black p-2 rounded"
                onClick={(e) => handleAddToCart(e, book)}
                title="Add to cart"
              >
                <FaCartShopping className="text-white w-5 h-5" />
              </button>

              {/* Book Info */}
              <div className="mt-3 px-2">
                <h3 className="text-lg font-bold truncate">{book.bookTitle}</h3>
                <p className="text-sm text-gray-600 truncate">by {book.authorName}</p>
                <p className="text-md font-semibold mt-1">₹ {book.price}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BookCards;
