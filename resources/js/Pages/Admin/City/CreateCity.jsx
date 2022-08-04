import React from "react";
import { Inertia } from "@inertiajs/inertia";
import Authenticated from '@/Layouts/Admin/Authenticated';
import { InertiaLink, useForm } from "@inertiajs/inertia-react";

const Create = (props) => {
    const { data, setData, errors, post } = useForm({
        city: "",
        address: "",
        active: false,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("admin.cities.store"));
    }

    return (
        <Authenticated
            errors={props.errors}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-14 bg-white">
                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">City</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="City"
                                            name="city"
                                            value={data.city}
                                            onChange={(e) =>
                                                setData("city", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.city}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Address</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Address"
                                            name="address"
                                            value={data.address}
                                            onChange={(e) =>
                                                setData("address", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.address}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Active</label>
                                            <input
                                                type="checkbox"
                                                label="Active"
                                                name="active"
                                                value={data.active}
                                                checked={data.active}
                                                onChange={(e) =>
                                                    setData("active", e.target.type === 'checkbox' ? e.target.checked : e.target.value)
                                                }
                                            />
                                    </div>
                                    </div>
                                        <div className="mt-4">
                                            <button
                                                type="submit"
                                                className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                            >
                                                Save
                                            </button>
                                        </div>
                                </form>
                            </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default Create;