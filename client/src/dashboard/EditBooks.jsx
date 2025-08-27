import React, { useState, useEffect } from 'react';
//const [price, setPrice] = useState('');

import { useLoaderData, useParams } from 'react-router-dom'
import { Button, Checkbox, Label, Select, TextInput, Textarea } from "flowbite-react"
const EditBooks = () => {
  const {id} = useParams();
  const {bookTitle, authorName, imageURL, category, bookDescription, bookPDFURL, price}= useLoaderData();
  const bookCategories = [
    "Fiction",
    "Non-Fiction",
    "Genres",
    "Horror",
    "Comedy",
    "Novel",
    "Mystery",
    "Programming",
    "Science Fiction",
    "Fantasy",
    "Bibliography",
    "Autobiography",
    "History",
    "Self-help",
    "Memoir",
    "Business",
    "Children Books",
    "Travel",
    "Religion",
    "Art and Design",
    "Contemporary"
  ]

  const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0]);

  const handleChangeSelectedValue = (event) => {
    console.log(event.target.value);
    setSelectedBookCategory(event.target.value);
  }
  //handle book submission
  const handleUpdate = (event) =>{
    event.preventDefault();
    const form = event.target;

    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageURL = form.imageURL.value;
    const category = form.categoryName.value;
    const bookDescription = form.bookDescription.value;
    const bookPDFURL = form.bookPDFURL.value;
    const price = form.price.value;
    
    const updateBookObj = {
      bookTitle, authorName, imageURL, category, bookDescription, bookPDFURL,price
    }
   // console.log(bookObj);
   //update book data
   fetch(`http://localhost:5000/book/${id}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updateBookObj)
   }).then(res => res.json()).then(data =>{
    alert("Book updated successfully!!!")
   })

  }

  return (
    <div className='w-full px-4 my-12 bg-white text-black '>
     <h2 className='mb-8 text-3xl font-bold '>Update the Book Data</h2>

      <form onSubmit={handleUpdate} className="flex max-w-full flex-col gap-4">
      
        {/* first row */}
        <div className='flex gap-8 '>
          {/* book title */}
        <div className='!text-black w-1/2 '>
          <div className="mb-2 block">
            <Label htmlFor="bookTitle" value="Book Title" className='!text-black'>Book Title</Label>
          </div>
          <TextInput
            id="bookTitle"
            name="bookTitle"
            placeholder="Book Name"
            required
            type="text"
            defaultValue={bookTitle}
            theme={{
              field: {
                input: {
                  base: "!bg-white !text-black w-full",
                },
              },
            }}
          />
        </div>
         {/* author name */}
        <div className='!text-black w-1/2'>
          <div className="mb-2 block">
            <Label htmlFor="authorName" value="Author Name" className='!text-black'>Author Name</Label>
          </div>
          <TextInput
            id="authorName"
            name="authorName"
            placeholder="Author Name"
            required
            type="text"
            defaultValue={authorName}
            theme={{
              field: {
                input: {
                  base: "!bg-white !text-black w-full",
                },
              },
            }}
          />
        </div>
      </div>

      {/*second row*/}
      <div className='flex gap-8 '>
          {/* imageURL name */}
        <div className='!text-black w-1/2'>
          <div className="mb-2 block ">
            <Label htmlFor="imageURL" value="Book Image URL" className='!text-black '>Book ImageURL</Label>
          </div>
          <TextInput
            id="imageURL"
            name="imageURL"
            placeholder="Book Image URL"
            required
            type="text"
            defaultValue={imageURL}
            theme={{
              field: {
                input: {
                  base: "!bg-white !text-black w-full",
                },
              },
            }}
          />
        </div>
         {/* Category */}
        <div className='!text-black w-1/2'>
          <div className="mb-2 block">
            <Label htmlFor="inputState" value="Book Category" className='!text-black'>Book Category</Label>
          </div>
            <Select id='inputState' name='categoryName' className='w-full rounded' value={selectedBookCategory}
              onChange={handleChangeSelectedValue}>
                {
                  bookCategories.map((option) => <option key={option} value={option}>{option}</option>)
                }
                
            </Select>
        </div>
      </div>
        
      {/* bookDescription */}
      <div >
        <div className='mb-2 block'>
          <Label htmlFor='bookDescription' value='Book Description' >Book Description</Label>
        </div>
        <Textarea 
          id='bookDescription'
          name='bookDescription'
          placeholder='Write your book Description...'
          required
          className='w-full'
          rows={5}
          defaultValue={bookDescription}
        />
        </div>

        {/* book PDF url*/}
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='bookPDFURL' value='Book PDF URL' >Book PDF URL</Label>

          </div>
          <TextInput
            id='bookPDFURL'
            name='bookPDFURL'
            placeholder='book pdf url'
            required
            type='text'
            defaultValue={bookPDFURL}
          />
        </div>

      {/* Book Cost */}
      <div>
        <div className='mb-2 block'>
          <Label htmlFor='price' value='Book Price' >Book Price</Label>
        </div>
        <TextInput
          id='price'
          name='price'
          placeholder='Book price'
          required
          type='text'
          defaultValue={price}
       />
     </div>

        <Button type="submit" className='mt-5 bg-[#2d90b1] p-2 font-bold text-2xl '>
          Update Book
        </Button>
        
      </form>
    </div>
  )
}

export default EditBooks