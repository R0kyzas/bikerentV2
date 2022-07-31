import React, {useState} from "react";
import { InertiaLink, useForm,usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import Authenticated from '@/Layouts/Admin/Authenticated';
import CurrencyInput from 'react-currency-input-field';
import Select from 'react-select'

const Create = (props) => {

    const { categories, cities } = usePage().props;
    const { data, setData, errors, post } = useForm({
        title: "",
        idn: "",
        price: 0,
        category_id: '',
        city_id: '',
        active: false,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("bikes.store"));
    }

    const handleCategory = (e) => {
        const categoryId = e.target.value;
        data.category_id = categoryId;
        setData(data.category_id);
    }

    const handleCity = (e) => {
        const cityId = e.target.value;
        data.city_id = cityId;
        setData(data.city_id);
    }

    console.log(categories)
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
                                        <label className="">Title</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Title"
                                            name="title"
                                            value={data.title}
                                            onChange={(e) =>
                                                setData("title", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.title}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Description</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Description"
                                            name="description"
                                            value={data.description}
                                            onChange={(e) =>
                                                setData("description", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.description}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">IDN</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2"
                                                label="IDN"
                                                name="idn"
                                                value={data.idn}
                                                onChange={(e) => 
                                                    setData('idn', e.target.value)
                                                }
                                            />
                                            <span className="text-red-600">
                                                {errors.idn}
                                            </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Category</label>
                                            <select name="category_id" 
                                            onChange={(e)=> handleCategory(e)}>
                                                <option value="">Select Category</option>
                                                {categories.map((item, index) => (
                                                    item.active === 1 ? 
                                                        <option key={index} value={item.id}>{item.title}</option>
                                                        :
                                                        ""
                                                ))}
                                            </select>
                                            <span className="text-red-600">
                                                {errors.category_id}
                                            </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">City</label>
                                            <select name="city_id" 
                                            onChange={(e)=> handleCity(e)}>
                                                <option value="">Select Category</option>
                                                {cities.map((item, index) => (
                                                    item.active === 1 ? 
                                                        <option key={index} value={item.id}>{item.city}, {item.address}</option>
                                                        :
                                                        ""
                                                ))}
                                            </select>
                                            <span className="text-red-600">
                                                {errors.city_id}
                                            </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Price</label>
                                        <CurrencyInput
                                            name="price"
                                            defaultValue={0}
                                            value={data.price}
                                            decimalsLimit={2}
                                            onValueChange={(value, name) =>
                                                setData(name, value)
                                            }
                                        />
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