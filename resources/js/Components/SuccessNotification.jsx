import React from "react";

const SuccessNotification = ({showNotification, success}) => {
    return (
        <>
            {showNotification && success && (
                <div className="h-full flex justify-center py-6">
                    <div className="flex max-w-xs w-full mt-4 mr-4 bg-white rounded shadow p-4">
                        <div className='mr-4'>
                            <img src="/images/success-message.png" alt="success" className="w-6 h-6 text-green-600"/>
                        </div>
                        <div className='flex-1 text-gray-800'>
                            {success}
                        </div>
                    </div>
                    
                </div>
            )}
        </>
    )
}

export default SuccessNotification;