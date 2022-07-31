import React, {useState} from 'react';
import { usePage } from "@inertiajs/inertia-react";

const renderData = (data) => {
    // const { bikes } = usePage().props;
    return (
        <div className="lg:col-span-3" >
            {data.map((item, i) => (
                    item.active === 1 ?             
                        <div className="flex flex-col mb-5" key={i}>
                            <div
                                className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-2xl p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white"
                            >
                                <div className="w-full md:w-1/3 bg-white grid place-items-center">
                                    <img src="https://images.pexels.com/photos/4381392/pexels-photo-4381392.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="tailwind logo" class="rounded-xl" />
                                </div>
                                <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                                    <div className="flex justify-between item-center">
                                        <p className="text-gray-500 font-medium hidden md:block">{item.idn}</p>
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20"
                                                fill="currentColor">
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <p className="text-gray-600 font-bold text-sm ml-1">
                                                    4.96
                                                <span className="text-gray-500 font-normal">(76 reviews)</span>
                                            </p>
                                        </div>
                                    </div>
                                    <h3 className="font-black text-gray-800 md:text-3xl text-xl">{item.title}</h3>
                                    <p className="md:text-lg text-gray-500 text-base">
                                        {item.description}
                                    </p>
                                    <p className="text-xl font-black text-gray-800">
                                        {item.price}€ / Day
                                    </p>
                                </div>
                            </div>
                        </div>  
                    :
                    ""
                ))
            }
            {data.length === 0 && (
                <div className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">Loading...</div>
            )}
        </div>
    )
}

const PagePagination = () => {
    const { bikes } = usePage().props;

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(4);

    const [pageNumberLimit, setPageNumberLimit] = useState(20);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(20);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const handleClick = (e) => { setCurrentPage(Number(e.target.id)); }

    const pages = [];

    for (let i = 1; i <= Math.ceil(bikes.length / itemsPerPage); i++) { pages.push(i); }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = bikes.slice(indexOfFirstItem,indexOfLastItem);

    const renderPageNumbers = pages.map((number) => {
        if(number < maxPageNumberLimit + 1 && number > minPageNumberLimit){
            return (
                    <li
                        key={number} 
                        id={number} 
                        className={currentPage === number ? "py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 active" : "py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"}
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

        if(currentPage + 1 > maxPageNumberLimit){
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    }

    const handlePrevBtn = () => {
        setCurrentPage(currentPage - 1);

        if((currentPage - 1 ) % pageNumberLimit === 0){
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    }

    return (
        <>
            {renderData(currentItems)}
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
                        disabled={currentPage === pages[pages.length - 1] ? true : false}
                    >
                        Next
                    </button>  
                </li>
            </ul>
        </>
    )
}

export default PagePagination;
