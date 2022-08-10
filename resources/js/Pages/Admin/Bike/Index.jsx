import React, {useEffect, useState} from 'react';
import Authenticated from '@/Layouts/Admin/Authenticated';
import { InertiaLink, usePage, useForm } from '@inertiajs/inertia-react';
import SuccessNotification from '@/Components/SuccessNotification';
import ErrorNotification from '@/Components/ErrorNotification';

const Index = (props) => {
    const { bikes, flash } = usePage().props;

    const [showNotification, setshowNotification] = useState(true);

    useEffect(() => {
        const notificationTimer = setTimeout(()=>{
            setshowNotification(false);
        }, 3500);

        return () => {
            clearTimeout(notificationTimer);
            setshowNotification(true);
        };
    }, []);

    return(
        <Authenticated
            errors={props.errors}
        >
            <SuccessNotification showNotification={showNotification} success={flash.success} />
            <ErrorNotification showNotification={showNotification} error={flash.error} />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white  shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="relative sm:rounded-lg">
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
                                            href={route("admin.bikes.create")}
                                        >
                                            Create Bike
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
                                                IDN
                                            </th>
                                            
                                            <th scope="col" className="py-3 px-6">
                                                Description
                                            </th>
                                            <th scope="col" className="py-3 px-6">
                                                Price
                                            </th>
                                            <th scope="col" className="py-3 px-6">
                                                Category
                                            </th>
                                            <th scope="col" className="py-3 px-6">
                                                Address
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
                                        {bikes?.map((item, i) => (
                                            <tr key={i} className="bg-white border-b">
                                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                                    {item.id}
                                                </th>
                                                <td className="py-4 px-6">
                                                    {item.title}
                                                </td>
                                                <td className="py-4 px-6">
                                                    {item.idn}
                                                </td>
                                                <td className="py-4 px-6">
                                                    {item.description}
                                                </td>
                                                <td className="py-4 px-6">
                                                    {item.price}
                                                </td>
                                                <td className="py-4 px-6">
                                                    {item.category?.title}
                                                </td>
                                                <td className="py-4 px-6">
                                                    {item.city?.city}, {item.city?.address}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <input type="checkbox" name="Active" checked={item.active === 0 ? 0 : 1}  readOnly/>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <InertiaLink
                                                        tabIndex="1"
                                                        className="font-medium text-blue-600"
                                                        href={route("admin.bikes.edit", item.id)}
                                                    >
                                                        Edit
                                                    </InertiaLink>
                                                </td>
                                            </tr>
                                        ))}
                                        {bikes?.length === 0 && (
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