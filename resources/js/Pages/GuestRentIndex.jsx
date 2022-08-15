import React, { useState, useEffect } from "react";
import { Link, usePage, useForm } from "@inertiajs/inertia-react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import SuccessNotification from "@/Components/SuccessNotification";
import ErrorNotification from "@/Components/ErrorNotification";
import StarRating from "@/Components/StarRating";

const GuestRentIndex = (props) => {
    const { bike, flash } = usePage().props;

    const { data, setData, post } = useForm({
        product: bike.id,
        quantity: 1,
    });
    const [showNotification, setshowNotification] = useState(true);
    const handleQuantity = (e) => {
        e.preventDefault();
        const quantityId = e.target.value;
        data.quantity = quantityId;
        if (bike.in_stock >= data.quantity && data.quantity >= 1) {
            setData(data.quantity);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("basket.add.item"), data);
    };

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
        <>
            <div className="min-h-screen">
                <nav className="bg-white border-b-2 border">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="shrink-0 flex items-center">
                                    <Link href="/">
                                        <ApplicationLogo className="block h-14 w-auto text-gray-500" />
                                    </Link>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="shrink-0 flex items-center">
                                    {props.auth.user ? (
                                        <Link
                                            href={route("dashboard")}
                                            className="text-sm text-gray-700 underline"
                                        >
                                            Profile
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route("login")}
                                                className="text-md text-main-color "
                                            >
                                                Log in
                                            </Link>

                                            <Link
                                                href={route("register")}
                                                className="ml-4 text-md text-main-color"
                                            >
                                                Register
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
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
                <section className="py-12 text-gray-700 body-font overflow-hidden bg-white">
                    <SuccessNotification
                        showNotification={showNotification}
                        success={flash.success}
                    />
                    <ErrorNotification
                        showNotification={showNotification}
                        error={flash.error}
                    />
                    <div className="container px-5 py-24 mx-auto drop-shadow-2xl flex shadow-lg bg-white">
                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                            <img
                                alt="ecommerce"
                                className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                                src="https://svgsilh.com/svg_v2/2028197.svg"
                            />
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                    BIKE TITLE
                                </h2>
                                <div className="flex justify-between">
                                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                        {bike.title}
                                    </h1>
                                    <div className="flex mb-4">
                                        <span className="flex items-center">
                                            <StarRating data={bike.ratings} />
                                        </span>
                                    </div>
                                </div>
                                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                    BIKE DESCRIPTION
                                </h2>
                                <p className="leading-relaxed">
                                    {bike.description}
                                </p>
                                <div className="flex mt-6 items-center pb-5 flex-wrap border-b-2 border-gray-200 mb-5">
                                    <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                        OTHER INFORMATION
                                    </h2>
                                    <div className="flex mb-5 items-center w-full">
                                        <span className="mr-3">Category</span>
                                        <div className="relative">
                                            <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                                                <option>
                                                    {bike.category_title}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex mb-5 items-center w-full">
                                        <span className="mr-3">
                                            Can be taken from
                                        </span>
                                        <div className="relative">
                                            <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                                                <option>
                                                    {bike.city}, {bike.address}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex mb-5 items-center w-full">
                                        <span className="mr-3">In Stock:</span>
                                        <input
                                            type="number"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/5 text-center p-2.5"
                                            value={bike.in_stock}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-3xl font-bold text-gray-900">
                                        €{bike.price}
                                    </span>
                                    <div className="inline-flex w-2/4 items-center">
                                        <span className="mr-3">Quantity</span>
                                        <input
                                            type="number"
                                            className="bg-gray-50 border border-gray-300 w-1/5 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block text-center p-2.5"
                                            value={data.quantity}
                                            name="quantity"
                                            min={1}
                                            max={bike.in_stock}
                                            onChange={(e) => handleQuantity(e)}
                                        />
                                        <button
                                            className="flex ml-auto text-white bg-main-color border-0 py-2 px-6 rounded"
                                            onClick={(e) => handleSubmit(e)}
                                        >
                                            Buy
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default GuestRentIndex;
