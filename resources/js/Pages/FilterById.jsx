import React, { useState } from "react";
import Input from "@/Components/Input";
import DropdownForInputFilter from "@/Components/DropdownForInputFilter";
import {BsFillTrashFill} from "react-icons/bs"
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import { set } from "lodash";
import { IconContext } from "react-icons/lib";

const FilterById = ({title, name, onStatusFilter, get}) => {

    const [status, setStatus] = useState("");

    const handleStatusChange = (event) => {
        const {value} = event.target;
        setStatus(value);
        onStatusFilter(status);
        get(route("admin.orders.index", value));
    }

    const handleSubmit = () => {
        
    }

    return (
        <>
                    <input
                        type="text"
                        name={name}
                        className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for items"
                        value={status}
                        onChange={handleStatusChange}
                        
                    />

        </>
    )
}

export default FilterById;