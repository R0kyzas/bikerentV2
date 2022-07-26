import React, { useState } from "react";
import { usePage, Link } from "@inertiajs/inertia-react";
import StarRating from "./StarRating";

const renderData = (data) => {
    return (
        <div className="flex flex-wrap gap-2 justify-center">
            {data.map((item) =>
                item.active === 1 ? (
                    <div className="p-4">
                        <div className="max-w-sm min-h-full bg-white rounded-lg shadow-md">
                            <a href="#">
                                <img
                                    className="p-8 rounded-t-lg"
                                    src="https://svgsilh.com/svg_v2/2028197.svg"
                                    alt="product image"
                                />
                            </a>
                            <div className="px-5 pb-5">
                                <a href="#">
                                    <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                                        {item.title}
                                    </h5>
                                </a>
                                <div className="flex items-center mt-2.5 mb-5">
                                    <StarRating data={item.ratings} />
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-3xl font-bold text-gray-900 ">
                                        €{item.price}
                                    </span>
                                    <Link
                                        href={route("rent", item.id)}
                                        className="text-white bg-main-color focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )
            )}
            {data.length === 0 && (
                <div className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                    No items
                </div>
            )}
        </div>
    );
};

const PagePagination = () => {
    const { bikes } = usePage().props;

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);

    const [pageNumberLimit, setPageNumberLimit] = useState(20);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(20);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const handleClick = (e) => {
        setCurrentPage(Number(e.target.id));
    };

    const pages = [];

    for (let i = 1; i <= Math.ceil(bikes.length / itemsPerPage); i++) {
        pages.push(i);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = bikes.slice(indexOfFirstItem, indexOfLastItem);

    const renderPageNumbers = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li
                    key={number}
                    id={number}
                    className={
                        currentPage === number
                            ? "py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 active"
                            : "py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                    }
                    onClick={handleClick}
                >
                    {number}
                </li>
            );
        }

        return null;
    });

    const handleNextBtn = () => {
        setCurrentPage(currentPage + 1);

        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    const handlePrevBtn = () => {
        setCurrentPage(currentPage - 1);

        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    return (
        <>
            {renderData(currentItems)}
            <div className="my-8">
                <ul className="flex items-center justify-center lg:col-span-4 page-numbers">
                    <li className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                        <button
                            onClick={handlePrevBtn}
                            disabled={currentPage === pages[0] ? true : false}
                        >
                            Previous
                        </button>
                    </li>
                    {renderPageNumbers}
                    <li className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                        <button
                            onClick={handleNextBtn}
                            disabled={
                                currentPage === pages[pages.length - 1]
                                    ? true
                                    : false
                            }
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default PagePagination;
