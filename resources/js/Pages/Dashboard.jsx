import React, { useState, useEffect } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link, usePage, InertiaLink } from "@inertiajs/inertia-react";
import OrderDropdown from "@/Components/OrderDropdown";
import SuccessNotification from "@/Components/SuccessNotification";
import ErrorNotification from "@/Components/ErrorNotification";

export default function Dashboard(props) {
    const { orders, flash } = usePage().props;
    const [showNotification, setshowNotification] = useState(true);

    useEffect(() => {
        const notificationTimer = setTimeout(() => {
            setshowNotification(false);
        }, 10000);

        return () => {
            clearTimeout(notificationTimer);
            setshowNotification(true);
        };
    }, []);

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <header className="drop-shadow-2xl flex shadow-lg bg-white">
                <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                    <div className="flex">
                        <div className="shrink-0 flex items-center">
                            <Link
                                href={route("home")}
                                className="font-semibold text-xl leading-tight text-main-color "
                            >
                                Bikes
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
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
                            {orders.map((item) => (
                                <>
                                    {item.user.id === props.auth.user.id && (
                                        <>
                                            <div className="w-full mb-10 rounded-t border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                                <OrderDropdown>
                                                    <OrderDropdown.Trigger>
                                                        <p className="focus:outline-none text-main-color text-md font-bold">
                                                            Order number:{" "}
                                                            {item.order_nr}
                                                        </p>
                                                        <button
                                                            type="button"
                                                            id="menu-button"
                                                            aria-expanded="true"
                                                            aria-haspopup="true"
                                                        >
                                                            <svg
                                                                className="-mr-1 ml-2 h-5 w-5"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                                aria-hidden="true"
                                                            >
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                    clip-rule="evenodd"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </OrderDropdown.Trigger>

                                                    <OrderDropdown.Content>
                                                        <div className="pt-5 h-9 bg-main-color text-white p-10 rounded shadow-lg drop-shadow-2xl ">
                                                            <p>
                                                                Order Status:{" "}
                                                                <span className="font-bold text-base">
                                                                    {
                                                                        item.status
                                                                    }
                                                                </span>
                                                            </p>
                                                        </div>

                                                        <div className="flex justify-around pt-10">
                                                            <div className="w-2/5 h-auto">
                                                                <h1 className="text-center text-xl text-gray-600 border-b-2">
                                                                    Order items
                                                                </h1>

                                                                <div className="col-span-1">
                                                                    <ul className="py-6 space-y-6">
                                                                        {item.order_items.map(
                                                                            (
                                                                                orderItem
                                                                            ) => (
                                                                                <li className="grid grid-cols-6 gap-2">
                                                                                    <div className="col-span-1 self-center">
                                                                                        <img
                                                                                            src="https://svgsilh.com/svg_v2/2028197.svg"
                                                                                            alt="Product"
                                                                                            className="rounded w-full"
                                                                                        />
                                                                                    </div>
                                                                                    <div className="flex flex-col col-span-3 pt-2">
                                                                                        <span className="text-gray-600 text-md font-semi-bold justify-end">
                                                                                            {
                                                                                                orderItem
                                                                                                    .bike
                                                                                                    .title
                                                                                            }
                                                                                        </span>
                                                                                        <span className="text-gray-400 text-sm inline-block pt-2 justify-end">
                                                                                            {
                                                                                                orderItem
                                                                                                    .bike
                                                                                                    .idn
                                                                                            }
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="col-span-2 pt-3">
                                                                                        <div className="flex items-center space-x-2 text-sm justify-between ">
                                                                                            <span className="text-gray-400 justify-end">
                                                                                                {
                                                                                                    orderItem.quantity
                                                                                                }{" "}
                                                                                                x
                                                                                                €
                                                                                                {
                                                                                                    orderItem.unit_price
                                                                                                }
                                                                                            </span>
                                                                                            <span className="text-main-color font-semibold inline-block">
                                                                                                €
                                                                                                {orderItem.quantity *
                                                                                                    orderItem.unit_price}
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </li>
                                                                            )
                                                                        )}
                                                                        <div className="font-semibold text-xl flex justify-end text-gray-600">
                                                                            <span>
                                                                                Total
                                                                                €
                                                                                {
                                                                                    item.total_price
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </ul>
                                                                </div>
                                                            </div>

                                                            <div className="w-2/5 h-auto">
                                                                <h1 className="text-center text-xl text-gray-600 border-b-2">
                                                                    Order
                                                                    details
                                                                </h1>
                                                                {item.order_items.map(
                                                                    (
                                                                        orderDetail
                                                                    ) => (
                                                                        <div className="col-span-1">
                                                                            {console.log(
                                                                                item.order_id
                                                                            )}
                                                                            <ul className="pt-6 space-y-6">
                                                                                <li className="grid grid-cols-4">
                                                                                    <div className="col-span-2 self-center pb-5">
                                                                                        <div className="rounded w-full">
                                                                                            Pickup
                                                                                            address:{" "}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-span-2">
                                                                                        <div className="flex items-center space-x-2 text-sm justify-end ">
                                                                                            <span className="text-gray-400">
                                                                                                {
                                                                                                    orderDetail
                                                                                                        .bike
                                                                                                        .city
                                                                                                        .city
                                                                                                }
                                                                                                ,{" "}
                                                                                                {
                                                                                                    orderDetail
                                                                                                        .bike
                                                                                                        .city
                                                                                                        .address
                                                                                                }
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-span-2 self-center pb-5">
                                                                                        <div className="rounded w-full">
                                                                                            Bike
                                                                                            category:{" "}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-span-2">
                                                                                        <div className="flex items-center space-x-2 text-sm justify-end ">
                                                                                            <span className="text-gray-400">
                                                                                                {
                                                                                                    orderDetail
                                                                                                        .bike
                                                                                                        .category
                                                                                                        .title
                                                                                                }
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-span-2 self-center pb-5">
                                                                                        <div className="rounded w-full">
                                                                                            Bike
                                                                                            IDN:{" "}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-span-2">
                                                                                        <div className="flex items-center space-x-2 text-sm justify-end ">
                                                                                            <span className="text-gray-400">
                                                                                                {
                                                                                                    orderDetail
                                                                                                        .bike
                                                                                                        .idn
                                                                                                }
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-span-2 self-center pb-5">
                                                                                        <div className="rounded w-full">
                                                                                            Payment
                                                                                            method:{" "}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-span-2">
                                                                                        <div className="flex items-center space-x-2 text-sm justify-end ">
                                                                                            <span className="text-gray-400">
                                                                                                Pay
                                                                                                upon
                                                                                                collection
                                                                                                of
                                                                                                the
                                                                                                product
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </li>
                                                                            </ul>
                                                                            {console.log(
                                                                                item
                                                                            )}
                                                                            {item.status ===
                                                                                "Completed" &&
                                                                                item.review_status ===
                                                                                    0 && (
                                                                                    <div className="w-full flex justify-center mb-2">
                                                                                        <InertiaLink
                                                                                            className="bg-main-color text-white font-bold py-2 px-4 rounded"
                                                                                            href={route(
                                                                                                "show.review",
                                                                                                orderDetail.order_id
                                                                                            )}
                                                                                        >
                                                                                            Write
                                                                                            review
                                                                                            about
                                                                                            Bike
                                                                                        </InertiaLink>
                                                                                    </div>
                                                                                )}
                                                                            {item.status ===
                                                                                "Completed" &&
                                                                                item.review_status ===
                                                                                    1 && (
                                                                                    <div className="w-full flex justify-center mb-2">
                                                                                        Thank
                                                                                        you
                                                                                        for
                                                                                        review.
                                                                                    </div>
                                                                                )}
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    </OrderDropdown.Content>
                                                </OrderDropdown>
                                            </div>
                                        </>
                                    )}
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
