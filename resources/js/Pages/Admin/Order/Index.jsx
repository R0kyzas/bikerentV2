import React, {useEffect, useState} from 'react';
import Authenticated from '@/Layouts/Admin/Authenticated';
import { usePage, useForm } from '@inertiajs/inertia-react';
import OrderStatusHandle from '@/Components/OrderStatusHandle';
import SuccessNotification from '@/Components/SuccessNotification';
import ErrorNotification from '@/Components/ErrorNotification';
import CancelReasonModal from '@/Components/CancelReasonModal';
import FilterById from '@/Pages/FilterById';

const Index = (props) => {
    const { orders, flash } = usePage().props;
    const { data, setData, post, errors } = useForm({
        id: "",
        cancel_reason: "",
    });

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

    function handleIputValue(e) {
        const inputValueId = e.target.value;
        data.id = inputValueId;
        setData(data.id);
    }

    function handleFilterSubmit(e) {
        e.preventDefault();
        console.log(data.id);
    }
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
                                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                            </div>
                                            <input type="text" id="table-search" className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for items" />
                                        </div>
                                    </div>
                                </div>
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th scope="col" className="py-3 px-6 text-center">
                                            <FilterById title={'ID'} value={data} handleIputValue={handleIputValue} handleFilterSubmit={handleFilterSubmit} name={'searchById'}/>
                                            
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