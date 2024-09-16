"use client"

import React, { useEffect, useState } from 'react';
const GetProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/product');
                const data = await res.json();
    
                if (Array.isArray(data)) { // Expecting array directly
                    setProducts(data);
                } else {
                    console.error('Failed to fetch products:', data);
                }
            } catch (err) {
                console.error('Failed to fetch products:', err);
            }
        };
    
        fetchProducts();
    }, []);
    

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-4xl">
                <h1 className="text-2xl font-bold mb-6 text-center">Product List</h1>
                <table className="min-w-full bg-white border border-gray-300 rounded">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600">Name</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600">Description</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600">Price</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600">Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product.id}>
                                    <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">{product.name}</td>
                                    <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">{product.description}</td>
                                    <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">${product.price}</td>
                                    <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">{product.category.name}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">No products available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GetProductList;
