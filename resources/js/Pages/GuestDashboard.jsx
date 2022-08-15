import React from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link, usePage } from "@inertiajs/inertia-react";
import PagePagination from "@/Components/PagePagination";

export default function GuestDashboard(props) {
    const { bikes } = usePage().props;

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
                                    href={route("login")}
                                    className="font-semibold text-xl leading-tight text-main-color "
                                >
                                    Bikes
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="bg-white">
                    <main className="mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="relative z-10 flex items-center justify-between pt-8 pb-6 border-b border-gray-200">
                            <div className="flex"></div>

                            <div className="flex items-center">
                                <div className="relative flex justify-end inline-block text-left"></div>

                                <span className="text-sm font-medium text-gray-700 hover:text-gray-900 p-2 -m-2 ml-5">
                                    Bicycles quantity: {bikes.length}
                                </span>
                            </div>
                        </div>

                        <section
                            aria-labelledby="products-heading"
                            className="pt-6"
                        >
                            <h2 id="products-heading" className="sr-only">
                                Products
                            </h2>
                            <PagePagination />
                        </section>
                    </main>
                </div>
            </div>
        </>
    );
}
