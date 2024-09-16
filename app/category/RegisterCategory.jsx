"use client";

import React, { useState } from 'react'

const RegisterCategory = () => {

    const [name, setName] = useState("");

    const handleSubmit = async(e) => {

        e.preventDefault();

        const registerCategory = await fetch('http://localhost:3000/api/category', {
            method: 'POST',
            body: JSON.stringify({name: name})
        });

        alert("Registered Successful✅");

        setName("");


    }


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
            <h2 className="text-2xl font-bold mb-6 text-center">Category Form</h2>
        
            
    
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Category Name
              </label>
              <input
              value={name}
              onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder='Enter category name'
                className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
    
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      );
}

export default RegisterCategory
