import React from "react";
import Input from "@/Components/Input";
import DropdownForInputFilter from "@/Components/DropdownForInputFilter";
import { InertiaLink, usePage } from '@inertiajs/inertia-react';

const FilterById = ({title, valueId, name,handleFilterSubmit, handleIputValue}) => {

    return (
        <>
            <DropdownForInputFilter>
                <DropdownForInputFilter.Trigger>
                    <span className="inline-flex rounded-md">
                        <button type="button" className="group hidden md:inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" aria-expanded="false" aria-haspopup="true">
                            <span>{title}</span>
                            <svg className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </span>
                </DropdownForInputFilter.Trigger>
                <DropdownForInputFilter.Content>
                
                    <input
                        type="text"
                        name={name}
                        value={valueId}
                        className="block w-full"
                        onChange={(e) => handleIputValue(e)
                        }
                    />
                    <button type="button" class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-main-color rounded-r-lg border border-main-color" onClick={handleFilterSubmit}>
                        <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <span class="sr-only">Search</span>
                    </button>
                </DropdownForInputFilter.Content>
            </DropdownForInputFilter>
        </>
    )
}

export default FilterById;