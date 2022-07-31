import React, {useEffect, useState} from 'react';
import Authenticated from '@/Layouts/Admin/Authenticated';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';

const Index = (props) => {
    const { categories,flash } = usePage().props;
    const [showNotification, setshowNotification] = useState(true);

    useEffect(()=>{
        setTimeout(()=>{
            setshowNotification(false);
        }, 3500);
    },[])

    console.log(categories);
    return(
        <Authenticated
            errors={props.errors}
        >
            {showNotification && flash.success && (
                <div className="h-full flex justify-center py-6">
                    <div className="flex max-w-xs w-full mt-4 mr-4 bg-white rounded shadow p-4">
                        <div className='mr-4'>
                            <img src="/images/success-message.png" alt="success" className="w-6 h-6 text-green-600"/>
                        </div>
                        <div className='flex-1 text-gray-800'>
                            {flash.success}
                        </div>
                    </div>
                    
                </div>
            )}
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="overflow-x-auto relative sm:rounded-lg">
                                <div className='flex justify-between mb-4'>
                                    <div className="bg-white">
                                        <label htmlFor="table-search" className="sr-only">Search</label>
                                        <div className="relative mt-1">
                                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                            </div>
                                            <input type="text" id="table-search" className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for items" />
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <InertiaLink
                                            className="px-6 py-2 text-white bg-main-color rounded-md focus:outline-none"
                                            href={route("categories.create")}
                                        >
                                            Create Category
                                        </InertiaLink>
                                    </div>
                                </div>
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th scope="col" className="py-3 px-6">
                                                ID
                                            </th>
                                            <th scope="col" className="py-3 px-6">
                                                Title
                                            </th>
                                            <th scope="col" className="py-3 px-6">
                                                Active
                                            </th>
                                            <th scope="col" className="py-3 px-6">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories?.map((item, i) => (
                                            <tr key={i} className="bg-white border-b">
                                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                                    {item.id}
                                                </th>
                                                <td className="py-4 px-6">
                                                    {item.title}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <input type="checkbox" name="Active" checked={item.active === 0 ? 0 : 1}  readOnly/>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <InertiaLink
                                                        tabIndex="1"
                                                        className="font-medium text-blue-600"
                                                        href={route("categories.edit", item.id)}
                                                    >
                                                        Edit
                                                    </InertiaLink>
                                                </td>
                                            </tr>
                                        ))}
                                        {categories?.length === 0 && (
                                            <tr className="bg-white border-b">
                                                <th scope="row" 
                                                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                                                    colSpan="7"
                                            >
                                                Loading...
                                                </th>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}

export default Index;