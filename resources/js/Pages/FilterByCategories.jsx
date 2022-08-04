import React, {useState} from "react";
import { usePage } from "@inertiajs/inertia-react";
import DropdownForCategories from "@/Components/DropdownForCategories";
import { TbAdjustmentsHorizontal } from "react-icons/tb";


const FilterByCategories = () => {
    const { categories } = usePage().props;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    return(
        <DropdownForCategories>
                <DropdownForCategories.Trigger>
                    <span className="inline-flex rounded-md mr-12 ">
                        <button type="button" class="group justify-center text-sm font-medium hidden md:inline-flex text-gray-700 hover:text-gray-900" id="menu-button" aria-expanded="false" aria-haspopup="true">
                            Categories
                            <svg class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                        <button 
                            type="button" 
                            class="p-2 -m-2 ml-4 sm:ml-6 text-main-color hover:text-gray-500 flex md:hidden"
                        >
                            <TbAdjustmentsHorizontal size={25}/>
                        </button>
                    </span>
                </DropdownForCategories.Trigger>
                <DropdownForCategories.Content>
                {categories?.map((item) => (
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            className="ml-3 h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                            label="Title"
                            name="title"
                            value={item.title}
                                // onChange={(e) =>
                                //     setData("title", e.target.value)
                                // }
                        />
                        <label className="ml-3 text-sm text-gray-600">{item.title}</label>
                    </div>
                ))}
                </DropdownForCategories.Content>
        </DropdownForCategories>
        // <GuestFilterContainer 
        //         containerTitle={<span className="font-medium text-gray-900">Categories</span>}
        //     >
        //         {categories?.map((item) => (
        //             <div className="flex items-center">
        //                 <input
        //                     type="checkbox"
        //                     className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
        //                     label="Title"
        //                     name="title"
        //                     value={item.title}
        //                         // onChange={(e) =>
        //                         //     setData("title", e.target.value)
        //                         // }
        //                 />
        //                 <label className="ml-3 text-sm text-gray-600">{item.title}</label>
        //             </div>
        //         ))}
        // </GuestFilterContainer>
    )
}

export default FilterByCategories;