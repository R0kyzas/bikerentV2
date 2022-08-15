import React, { useState, useEffect } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link, usePage, InertiaLink } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import SuccessNotification from "@/Components/SuccessNotification";
import ErrorNotification from "@/Components/ErrorNotification";

export default function Checkout(props) {
    const { basket, flash } = usePage().props;
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

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post(route("user.basket.store", basket));
    }

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
                        <div className="grid grid-cols-3 pb-5">
                            <div className="lg:col-span-2 col-span-3 space-y-8 px-12">
                                <div className="rounded-md mt-7">
                                    <section>
                                        <div className="py-6 bg-white text-gray-600">
                                            <div className="flex border-b border-gray-200 h-12 py-3 items-center justify-evenly">
                                                <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
                                                    Delivery
                                                </h2>
                                                <span className="text-right px-2">
                                                    Pickup in store
                                                </span>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                <div className="rounded-md mt-7">
                                    <section>
                                        <div className="mb-3 bg-white text-gray-600">
                                            <div className="flex border-b border-gray-200 h-12 py-3 items-center justify-evenly">
                                                <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
                                                    Payment method
                                                </h2>
                                                <span className="text-right px-2">
                                                    Pay upon collection of the
                                                    product
                                                </span>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                <button
                                    onClick={(e) => handleSubmit(e)}
                                    className="submit-button px-4 py-3 rounded-full bg-main-color text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors"
                                >
                                    Confirm order
                                </button>
                            </div>
                            <div className="col-span-1 bg-white lg:block hidden">
                                <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">
                                    Order Summary
                                </h1>
                                {basket.items.map((item) => (
                                    <ul className="py-6 border-b space-y-6 px-8">
                                        <li className="grid grid-cols-6 gap-2 border-b-1">
                                            <div className="col-span-1 self-center">
                                                <img
                                                    className="p-8 rounded-t-lg"
                                                    src="https://svgsilh.com/svg_v2/2028197.svg"
                                                    alt="product image"
                                                />
                                            </div>
                                            <div className="flex flex-col col-span-3 pt-2">
                                                <span className="text-gray-600 text-md font-semi-bold">
                                                    {item.title}
                                                </span>
                                                <span className="text-gray-400 text-sm inline-block pt-2">
                                                    {item.idn}
                                                </span>
                                            </div>
                                            <div className="col-span-2 pt-3">
                                                <div className="flex space-x-2 text-sm justify-end">
                                                    <span className="text-gray-400">
                                                        {item.quantity} x €
                                                        {item.unitPrice}
                                                    </span>
                                                    <InertiaLink
                                                        href={route(
                                                            "remove.item",
                                                            item.id
                                                        )}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-4 w-4 mr-2"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                            />
                                                        </svg>
                                                    </InertiaLink>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                ))}
                                <div className="px-8 border-b">
                                    <div className="flex justify-between py-4 text-gray-600">
                                        <span>Shipping</span>
                                        <span className="font-semibold text-main-color">
                                            Free
                                        </span>
                                    </div>
                                </div>
                                <div className="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
                                    <span>Total</span>
                                    <span>€{basket.totalPrice}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
