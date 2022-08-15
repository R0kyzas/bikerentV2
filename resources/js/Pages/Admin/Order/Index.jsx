import React, { useEffect, useState } from "react";
import Authenticated from "@/Layouts/Admin/Authenticated";
import { usePage, useForm } from "@inertiajs/inertia-react";
import AdminOrderStatusHandle from "@/Components/AdminOrderStatusHandle";
import SuccessNotification from "@/Components/SuccessNotification";
import ErrorNotification from "@/Components/ErrorNotification";
import CancelReasonModal from "@/Components/CancelReasonModal";

const Index = (props) => {
    const { orders, flash } = usePage().props;
    const { data, setData, post, errors } = useForm(orders);

    const [showNotification, setshowNotification] = useState(true);

    const [show, setShow] = useState(false);

    const [cancelID, setCancelID] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const notificationTimer = setTimeout(() => {
            setshowNotification(false);
        }, 10000);

        return () => {
            clearTimeout(notificationTimer);
            setshowNotification(true);
        };
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        post(route("admin.orders.cancel", cancelID));
        if (data.cancel_reason.length >= 4 && data.cancel_reason.length <= 255)
            handleClose();
    }

    return (
        <Authenticated errors={props.errors}>
            <SuccessNotification
                showNotification={showNotification}
                success={flash.success}
            />
            <ErrorNotification
                showNotification={showNotification}
                error={flash.error}
            />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="overflow-x-auto relative sm:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 text-center"
                                            >
                                                Order nr
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 text-center"
                                            >
                                                User
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 text-center"
                                            >
                                                Quantity
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 text-center"
                                            >
                                                Total price
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 text-center"
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 text-center"
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((item, i) => (
                                            <tr
                                                key={i}
                                                className="bg-white border-b"
                                            >
                                                <th
                                                    scope="row"
                                                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap text-center"
                                                >
                                                    {item.order_nr}
                                                </th>
                                                <td className="py-4 px-6 text-center">
                                                    {item.user?.email}
                                                </td>
                                                {item.order_items.map(
                                                    (order) => (
                                                        <td className="py-4 px-6 text-center">
                                                            {order.quantity}
                                                        </td>
                                                    )
                                                )}
                                                <td className="py-4 px-6 text-center">
                                                    {item.total_price}
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    {item.status}
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    <AdminOrderStatusHandle
                                                        status={item.status}
                                                        itemId={item.id}
                                                        cancelReason={
                                                            item.cancel_reason
                                                        }
                                                        handleShow={handleShow}
                                                        setCancelID={
                                                            setCancelID
                                                        }
                                                        item={item}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                        {orders.length === 0 && (
                                            <tr className="bg-white border-b">
                                                <th
                                                    scope="row"
                                                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                                                    colSpan="7"
                                                >
                                                    No orders
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
                        name={"cancel_reason"}
                        setData={setData}
                    />
                </div>
            </div>
        </Authenticated>
    );
};

export default Index;
