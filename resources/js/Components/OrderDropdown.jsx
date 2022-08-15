import React, { useState, useContext, Fragment } from 'react';
import { Link } from '@inertiajs/inertia-react';
import { Transition } from '@headlessui/react';

const DropDownContext = React.createContext();

const OrderDropdown = ({ children }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div className="relative">{children}</div>
        </DropDownContext.Provider>
    );
};

const Trigger = ({ children }) => {
    const { toggleOpen } = useContext(DropDownContext);

    return (
        <>
            <div className="flex items-center justify-between" onClick={toggleOpen}>{children}</div>
        </>
    );
};

const Content = ({ children }) => {
    const { open, setOpen } = useContext(DropDownContext);

    return (
        <>
            <Transition
                as={Fragment}
                show={open}
            >
                <div
                    className={`z-50 mt-2`}
                    onClick={() => setOpen(true)}
                >
                    <div className={`flex flex-wrap justify-center`}>{children}</div>
                </div>
            </Transition>
        </>
    );
};

const DropdownLink = ({ href, method = 'post', as = 'a', children }) => {
    return (
        <Link
            href={href}
            method={method}
            as={as}
            className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
        >
            {children}
        </Link>
    );
};

OrderDropdown.Trigger = Trigger;
OrderDropdown.Content = Content;
OrderDropdown.Link = DropdownLink;

export default OrderDropdown;
