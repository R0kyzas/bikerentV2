import React, {useState} from "react";
import { usePage } from "@inertiajs/inertia-react";
import GuestFilterContainer from "@/Components/GuestFilterContainer";


const Filter = () => {
    const { categories, cities } = usePage().props;

    const [categoryFilter, setCategoryFilter] = useState(false);
    

    return (
        <>
            <form class="hidden lg:block">
            {/* <ul role="list" class="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200">
              <li>
                <a href="#"> Totes </a>
              </li>

              <li>
                <a href="#"> Backpacks </a>
              </li>

              <li>
                <a href="#"> Travel Bags </a>
              </li>

              <li>
                <a href="#"> Hip Bags </a>
              </li>

              <li>
                <a href="#"> Laptop Sleeves </a>
              </li>
            </ul> */}

            <div className="border-b border-gray-200 pb-6">
              <h3 className="-my-3 flow-root">
                <button type="button" className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
                  <span className="font-medium text-gray-900"> Color </span>
                  <span className="ml-6 flex items-center">

                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                    </svg>

                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </button>
              </h3>
              <div className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input id="filter-color-0" name="color[]" value="white" type="checkbox" className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"/>
                    <label for="filter-color-0" className="ml-3 text-sm text-gray-600"> White </label>
                  </div>

                </div>
              </div>
            </div>

            <GuestFilterContainer 
                containerTitle={<span className="font-medium text-gray-900">Categories</span>}
            >
                {categories?.map((item) => (
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
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
            </GuestFilterContainer>
            
            <GuestFilterContainer 
                containerTitle={<span className="font-medium text-gray-900">Cities</span>}
            >
                {cities?.map((item) => (
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                label="City"
                                name="city"
                                value={item.city}
                                // onChange={(e) =>
                                //     setData("title", e.target.value)
                                // }
                            />
                            <label className="ml-3 text-sm text-gray-600">{item.city}</label>
                        </div>
                ))}
            </GuestFilterContainer>
          </form>
        </>
    )

}

export default Filter;
