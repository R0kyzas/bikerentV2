import React from "react";
import { usePage } from "@inertiajs/inertia-react";
import DropdownForCities from "@/Components/DropdownForCities";

const FilterByCities = () => {
    const { cities } = usePage().props;
    return(
        <DropdownForCities>
                <DropdownForCities.Trigger>
                    <span className="inline-flex rounded-md mr-12">
                        <button type="button" class="group hidden md:inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" id="menu-button" aria-expanded="false" aria-haspopup="true">
                            Cities
                            <svg class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </span>
                </DropdownForCities.Trigger>
                <DropdownForCities.Content>
                {cities?.map((item) => (
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            className="ml-3 h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                            label="Title"
                            name="title"
                            value={item.city}
                                // onChange={(e) =>
                                //     setData("title", e.target.value)
                                // }
                        />
                        <label className="ml-3 text-sm text-gray-600">{item.city}</label>
                    </div>
                ))}
                </DropdownForCities.Content>
        </DropdownForCities>
    )
}

export default FilterByCities;