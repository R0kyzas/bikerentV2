import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/inertia-react';

export default function Authenticated({ children }) {

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-14 w-auto text-gray-500" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink href={route('admin.orders.index')} active={route().current('admin.orders.index')}>
                                    Orders
                                </NavLink>
                                <NavLink href={route('admin.bikes.index')} active={route().current('admin.bikes.index')}>
                                    Bikes 
                                </NavLink>
                                <NavLink href={route('admin.users.index')} active={route().current('admin.users.index')}>
                                    Users
                                </NavLink>
                                <NavLink href={route('admin.categories.index')} active={route().current('admin.categories.index')}>
                                    Categories
                                </NavLink>
                                <NavLink href={route('admin.cities.index')} active={route().current('admin.cities.index')}>
                                    Cities
                                </NavLink>
                            </div>
                        </div>

                        <div className="sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>

                    </div>
                </div>
            </nav>

            <main>{children}</main>
        </div>
    );
}
