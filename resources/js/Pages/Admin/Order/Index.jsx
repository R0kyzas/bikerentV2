import React, {useEffect, useState} from 'react';
import Authenticated from '@/Layouts/Admin/Authenticated';
import { usePage, useForm, InertiaLink } from '@inertiajs/inertia-react';
import OrderStatusHandle from '@/Components/OrderStatusHandle';
import SuccessNotification from '@/Components/SuccessNotification';
import ErrorNotification from '@/Components/ErrorNotification';
import CancelReasonModal from '@/Components/CancelReasonModal';
import FilterById from '@/Pages/FilterById';
import { Inertia } from '@inertiajs/inertia';
import Button from '@/Components/Button';

const Index = (props) => {
    const { orders, flash } = usePage().props;
    const { data, setData, post, errors } = useForm(orders);

    const [query, setQuery] = useState('');

    const search = (e) => {
        e.preventDefault();
        Inertia.get(
            route(route().current()),
            {search: query},
        );
    }

    const resetSearch = (e) => {
        e.preventDefault();
        Inertia.get(route('admin.orders.index'));
    }

    const [showNotification, setshowNotification] = useState(true);

    const [show, setShow] = useState(false);

    const [cancelID, setCancelID] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        setTimeout(()=>{
            setshowNotification(false);
        }, 3500);
    },[])
    

    function handleSubmit(e) {
        e.preventDefault();
        post(route("admin.orders.cancel", cancelID));
        if(data.cancel_reason.length >= 4 && data.cancel_reason.length <= 255) handleClose();
    }

    // function handleSearchSubmit(e) {
    //     e.preventDefault();
    //     get(route("admin.orders.index"))
    // }

    // function handleFilterId(id) {
    //    const filteredData = orders.filter((item) => {
    //     const getId = `${item.id}`;
    //         if(getId.includes(id)){
    //             return item;
    //         }
    //     });
    //     setData(filteredData)
    // }

    // function handleFilterStatus(status) {
    //     const filteredData = orders.filter((item) => {
    //      const getStatus = `${item.status}`;
    //         if(getStatus.toLowerCase().includes(status.toLowerCase())){
    //              return item;
    //          }
    //      });
    //      setData(filteredData)
    //  }
    return(
        <Authenticated
            errors={props.errors}
        >
            <SuccessNotification showNotification={showNotification} success={flash.success} />
            <ErrorNotification showNotification={showNotification} error={flash.error} />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="overflow-x-auto relative sm:rounded-lg">
                                <div className='flex justify-between mb-4'>
                                    <div className="bg-white">
                                        <label htmlFor="table-search" className="sr-only">Search</label>
                                        <div className="relative mt-1">
                                            <div className="flex items-center">
                                            <input 
                                                type="search" 
                                                className="block p-2 pl-5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                name="search"
                                                value={query}
                                                id="search"
                                                autoComplete="search"
                                                placeholder={`Search here...`}
                                                onChange={(e) => setQuery(e.target.value)}
                                                />
                                                <Button 
                                                    className="ml-3"
                                                    onClick={(e)=> search(e)}
                                                >
                                                    Search
                                                </Button>
                                                <InertiaLink
                                                    className="inline-flex items-center ml-3 px-4 py-2 border border-transparent rounded-md bg-main-color font-semibold text-xs text-white uppercase tracking-widest active: transition ease-in-out duration-150"
                                                    href={route("admin.orders.index")}
                                                >
                                                    Reset
                                                </InertiaLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th scope="col" className="py-3 px-6 text-center">
                                                ID
                                            </th>
                                            <th scope="col" className="py-3 px-6 text-center">
                                                Bike ID
                                            </th>
                                            <th scope="col" className="py-3 px-6 text-center">
                                                User
                                            </th>
                                            <th scope="col" className="py-3 px-6 text-center">
                                                Rent days
                                            </th>
                                            <th scope="col" className="py-3 px-6 text-center">
                                                Quantity
                                            </th>
                                            <th scope="col" className="py-3 px-6 text-center">
                                                Status
                                            </th>
                                            <th scope="col" className="py-3 px-6 text-center">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders?.map((item, i) => (
                                            <tr key={i} className="bg-white border-b">
                                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap text-center">
                                                    {item.id}
                                                </th>
                                                <td className="py-4 px-6 text-center">
                                                    {item.bike?.id}
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    {item.user?.email}
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    {item.rent_days}
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    {item.quantity}
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    {item.status}
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    <OrderStatusHandle status={item.status} itemId={item.id} cancelReason={item.cancel_reason} handleShow={handleShow} setCancelID={setCancelID} item={item}/>
                                                </td>
                                            </tr>
                                        ))}
                                        {orders?.length === 0 && (
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
                    <CancelReasonModal 
                        handleSubmit={handleSubmit} 
                        handleClose={handleClose} 
                        show={show} 
                        dataValue={data.cancel_reason} 
                        errors={errors.cancel_reason} 
                        name={'cancel_reason'}
                        setData={setData}
                    />
                </div>
            </div>
        </Authenticated>
    )
}

export default Index;