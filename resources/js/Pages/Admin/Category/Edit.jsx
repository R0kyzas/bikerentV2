import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink, usePage, useForm } from "@inertiajs/inertia-react";
import Authenticated from '@/Layouts/Admin/Authenticated';

const Edit = (props) => {
    const { category } = usePage().props;
    const { data, setData, put, errors } = useForm({
        title: category.title,
        active: category.active,
    });
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleSubmit(e) {
        e.preventDefault();
        put(route("categories.update", category.id));
    }

    function destroy() {
        Inertia.delete(route("categories.destroy", category.id));  
    }

    return (
        <Authenticated
            errors={props.errors}
        >

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-14 bg-white">
                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Title</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Title"
                                            name="title"
                                            value={data.title}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.title}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Active</label>
                                        <input
                                            type="checkbox"
                                            label="Active"
                                            name="active"
                                            value={data.active}
                                            checked={data.active}
                                            onChange={(e) =>
                                                setData("active", e.target.type === 'checkbox' ? e.target.checked : e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-white bg-green-500 rounded"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={handleShow}
                                        tabIndex="-1"
                                        type="button"
                                        className="px-4 py-2 text-white bg-red-500 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <>
                        <div id="popup-modal" tabIndex="-1" className={!show ? 'hidden': 'flex justify-center items-center overflow-y-auto bg-black bg-opacity-70 fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full'} >
                            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                                <div className="relative bg-white rounded-lg shadow">
                                    <button type="button" onClick={handleClose} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="popup-modal">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                    <div className="p-6 text-center">
                                        <svg aria-hidden="true" className="mx-auto mb-4 w-14 h-14 text-gray-400 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <h3 className="mb-5 text-lg font-normal text-gray-500">Are you sure you want to delete this product?</h3>
                                        <button data-modal-toggle="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={destroy}>
                                            Yes, I'm sure
                                        </button>
                                        <button data-modal-toggle="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 " onClick={handleClose}>No, cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </>
                        </div>
                    </div>
        </Authenticated>
    );
};

export default Edit;