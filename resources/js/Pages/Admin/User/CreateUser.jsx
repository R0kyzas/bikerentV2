import React from "react";
import { Inertia } from "@inertiajs/inertia";
import Authenticated from '@/Layouts/Admin/Authenticated';
import { InertiaLink, useForm } from "@inertiajs/inertia-react";

const Create = (props) => {
    const { data, setData, errors, post } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("users.store"));
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
                                        <label className="">Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Name"
                                            name="name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.name}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Email</label>
                                            <input
                                                type="email"
                                                className="w-full px-4 py-2"
                                                label="Email"
                                                name="email"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData("email", e.target.value)
                                                }
                                            />
                                            <span className="text-red-600">
                                                {errors.email}
                                            </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Password</label>
                                            <input
                                                type="password"
                                                className="w-full px-4 py-2"
                                                label="Password"
                                                name="password"
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData("password", e.target.value)
                                                }
                                            />
                                            <span className="text-red-600">
                                                {errors.password}
                                            </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Confirm Password</label>
                                            <input
                                                type="password"
                                                className="w-full px-4 py-2"
                                                label="Confirm Password"
                                                name="password_confirmation"
                                                value={data.password_confirmation}
                                                onChange={(e) =>
                                                    setData("password_confirmation", e.target.value)
                                                }
                                            />
                                            <span className="text-red-600">
                                                {errors.password_confirmation}
                                            </span>
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