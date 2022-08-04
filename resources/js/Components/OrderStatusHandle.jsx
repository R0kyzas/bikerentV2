import React, {useState} from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

const OrderStatusHandle = ({status, itemId, cancelReason, handleShow, setCancelID, item}) => {

    const [show, setShow] = useState(false);

    const closeCancelDetailsModal = () => setShow(false);
    const showCancelDetailsModal = () => setShow(true);

    const d = new Date(item.updated_at)
    const saveConverted = d.toLocaleString();
    
    const renderCancelDetails = (reason) => {
        return (
            <div aria-hidden="true" className={!show ? 'hidden':'flex justify-center items-center overflow-y-auto bg-black bg-opacity-70 fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full'}>
                <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex justify-between items-start p-4 rounded-t border-b">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Cancel reason details
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="defaultModal" onClick={closeCancelDetailsModal}>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="pt-1">
                            <p className="text-base font-bold leading-relaxed text-gray-500">
                                Date: <span className="text-base font-medium leading-relaxed text-gray-500">{saveConverted}</span>
                            </p>
                        </div>
                        <div className="pb-5 pl-5">
                            <p className="text-base font-bold text-left leading-relaxed text-gray-500">
                                Reason: 
                            </p>
                            <p className="text-base text-left leading-relaxed text-gray-500">
                                {reason}
                            </p>
                        </div>
                        <div className="flex items-center justify-center p-6 space-x-2 rounded-b border-t border-gray-200">
                            <button data-modal-toggle="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={closeCancelDetailsModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if(status === 'Pending') {
        return (
            <>
                <InertiaLink
                    className="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-amber-400 hover:bg-amber-500 mr-2"
                    href={route("admin.orders.confirm", itemId)}
                >
                    Accept
                </InertiaLink>
                <button className='text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-700 hover:bg-red-800' onClick={() => handleShow(setCancelID(itemId))}>
                    Cancel
                </button>
            </>
        );
    }else if(status === 'Accepted'){
        return (
            <InertiaLink
                className="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-lime-600 hover:bg-lime-700"
                href={route("admin.orders.complete", itemId)}
            >
                Complete
            </InertiaLink>
        );
    }else if(status === 'Canceled'){
        return (
            <>
                <button className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center' onClick={showCancelDetailsModal}>
                    Cancel details
                </button>
                {renderCancelDetails(cancelReason)}
            </>
        )
    }else if(status === 'Completed'){
        return (
            <>
                {saveConverted}
            </>
        );
    }
    
    return null;
}

export default OrderStatusHandle;