import React, { Children, useState } from 'react'
import { Button, Checkbox, Label, Select, TextInput, Textarea } from "flowbite-react"

const UploadBook = () => {
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
  const handleBookSubmit = (event) =>{
    event.preventDefault();
    const form = event.target;

    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageURL = form.imageURL.value;
    const category = form.categoryName.value;
    const bookDescription = form.bookDescription.value;
    const bookPDFURL = form.bookPDFURL.value;
    const price = form.price.value;
    
    const bookObj = {
      bookTitle, authorName, imageURL, category, bookDescription, bookPDFURL,price
    }
    console.log(bookObj);

    // send data to database

    fetch("http://localhost:5000/upload-book",{
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(bookObj),
    }).then(res => res.json()).then(data => {
      console.log(data);
      alert("Book uploaded successfully!!!")
      form.reset();
    })
  }

  return (
    <div className='w-full px-4 my-12 bg-white text-black '>
     <h2 className='mb-8 text-3xl font-bold '>Upload A Book</h2>

      <form onSubmit={handleBookSubmit} className="flex max-w-full flex-col gap-4">
      
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
          />
        </div>

      {/* Book cost */}
<div>
  <div className='mb-2 block'>
    <Label htmlFor='price' value='Book Price' >Book Price</Label>
  </div>
  <TextInput
    id='price'
    name='price'
    placeholder='book price'
    required
    type='text'
  />
</div>

      
        <Button type="submit" className='mt-5 bg-[#2d90b1] p-2 font-bold text-2xl '>
          Upload Book
        </Button>
        
      </form>
    </div>
  )
}

export default UploadBook
