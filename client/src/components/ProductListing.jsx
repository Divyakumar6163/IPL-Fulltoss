// ProductListing.jsx
import React from "react";
import { products } from "../data/Products";

const ProductListing = ({ team }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div
          key={product.id}
          className={`bg-white text-${team.color}-500 p-4 rounded-lg`}
        >
          <h3 className="text-lg font-bold">{product.name}</h3>
          <p>{product.description}</p>
          <button className={`btn-${team.color} mt-4`}>Buy Now</button>
        </div>
      ))}
    </div>
  );
};

export default ProductListing;
