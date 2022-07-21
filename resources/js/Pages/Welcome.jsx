import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, Head } from '@inertiajs/inertia-react';

export default function Welcome(props) {


    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100 nav-modify">
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
                                    <Link href={route('dashboard')} className="text-md text-main-color">
                                        Dashboard
                                    </Link>
                                    ) : (
                                    <>
                                        <Link href={route('login')} className="text-md text-main-color ">
                                            Log in
                                        </Link>

                                        <Link href={route('register')} className="ml-4 text-md text-main-color">
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            </div>
        </>
    );
}
