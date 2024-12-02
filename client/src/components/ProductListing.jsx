import React, { useState } from "react";
import { FiArrowRightCircle } from "react-icons/fi";
import DefaultImage from "../images/NoImage.jpg";
import { products } from "../data/Products";
import teamColor from "../data/color";
import { useSelector } from "react-redux";

const ProductShowcase = ({ heading }) => {
  const team = useSelector((state) => state.user.userinfo.team);
  const teamData = teamColor.find((teamItem) => teamItem.team === team);
  const myTeam = teamData?.shortTeam;

  const [visibleProductsForTeam, setVisibleProductsForTeam] = useState(5);
  const [visibleProductsForType, setVisibleProductsForType] = useState(5);

  const handleViewProduct = (product) => {
    // navigate(`/product/${product.id}`);
  };

  const loadMoreProductsForTeam = () => {
    setVisibleProductsForTeam((prev) => prev + 3);
  };

  const loadMoreProductsForType = () => {
    setVisibleProductsForType((prev) => prev + 3);
  };

  // Group products by type
  const groupedByType = products.reduce((acc, product) => {
    acc[product.type] = acc[product.type] || [];
    acc[product.type].push(product);
    return acc;
  }, {});

  // Filter products for the user's team
  const filteredByTeam = products.filter((product) => product.team === myTeam);

  return (
    <div className="mb-20">
      <h4 className="mb-4 mx-6 my-20 text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white">
        {heading}
      </h4>
      {/* Filtered by Team */}
      <div>
        <h5 className="mb-4 text-2xl tracking-tight font-bold text-gray-700 dark:text-gray-300">
          Products by Your Team
        </h5>
        <div className="flex overflow-x-auto space-x-4 p-4">
          {filteredByTeam.length > 0 ? (
            filteredByTeam
              .slice(0, visibleProductsForTeam)
              .map((product, idx) => (
                <div
                  key={idx}
                  className="min-w-[290px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <a className="block h-full w-full">
                      <img
                        className="object-cover w-full h-full rounded-t-lg"
                        src={product.image || DefaultImage}
                        alt={product.name}
                      />
                    </a>
                  </div>
                  <div className="p-5">
                    <a>
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
                        {product.name}'s {product.type}
                      </h5>
                    </a>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        ${product.price}
                      </span>
                      <button
                        onClick={() => handleViewProduct(product)}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        style={{ cursor: "pointer" }}
                      >
                        View
                        <svg
                          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-gray-500 font-semibold">
              No products available for your team.
            </p>
          )}
        </div>
        {visibleProductsForTeam < filteredByTeam.length && (
          <div className="flex justify-center mt-4">
            <button
              onClick={loadMoreProductsForTeam}
              className="px-3 py-2 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              <FiArrowRightCircle className="h-16 w-16 text-black" />
            </button>
          </div>
        )}
      </div>

      {/* Group by Type */}
      <div>
        {Object.keys(groupedByType).map((type) => (
          <div key={type} className="mb-8">
            <h6 className="text-xl font-semibold text-gray-600 dark:text-gray-400">
              {type}
            </h6>
            <div className="flex overflow-x-auto space-x-4 p-4">
              {groupedByType[type]
                .slice(0, visibleProductsForType)
                .map((product, idx) => (
                  <div
                    key={idx}
                    className="min-w-[290px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  >
                    <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <a className="block h-full w-full">
                        <img
                          className="object-cover w-full h-full rounded-t-lg"
                          src={product.image || DefaultImage}
                          alt={product.name}
                        />
                      </a>
                    </div>
                    <div className="p-5">
                      <a>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
                          {product.name}'s {product.type}
                        </h5>
                      </a>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                          ${product.price}
                        </span>
                        <button
                          onClick={() => handleViewProduct(product)}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          style={{ cursor: "pointer" }}
                        >
                          View
                          <svg
                            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              {visibleProductsForType < groupedByType[type].length && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={loadMoreProductsForType}
                    className="px-3 py-2 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    <FiArrowRightCircle className="h-16 w-16 text-black" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductShowcase;
