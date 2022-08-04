import React from "react";

const ErrorNotification = ({showNotification, error}) => {
    return (
        <>
            {showNotification && error && (
                <div className="h-full flex justify-center py-6">
                    <div className="flex max-w-xs w-full mt-4 mr-4 bg-white rounded shadow p-4">
                        <div className='mr-4'>
                            <img src="/images/error-message.png" alt="error" className="w-6 h-6 text-red-600"/>
                        </div>
                        <div className='flex-1 text-gray-800'>
                            {error}
                        </div>
                    </div>
                    
                </div>
            )}
        </>
    )
}

export default ErrorNotification;