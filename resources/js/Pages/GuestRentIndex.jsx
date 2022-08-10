import React, {useState, useEffect} from "react";
import {Link, usePage, useForm, InertiaLink } from "@inertiajs/inertia-react";
import ApplicationLogo from '@/Components/ApplicationLogo';
import SuccessNotification from "@/Components/SuccessNotification";
import ErrorNotification from "@/Components/ErrorNotification";


const GuestRentIndex = (props) => {
    const { bike, flash } = usePage().props;

    const { data, setData, errors, post } = useForm({
        product: bike.id,
        quantity: 1,
    });
    const [showNotification, setshowNotification] = useState(true);
    const handleQuantity = (e) => {
        e.preventDefault();
        const quantityId = e.target.value;
        data.quantity = quantityId;
        if(bike.in_stock >= data.quantity && data.quantity >= 1) {
            
            setData(data.quantity);
        }
        console.log(data.quantity);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("basket.add.item"), data);
    }
   

    useEffect(()=>{
        setTimeout(()=>{
            setshowNotification(false);
        }, 10000);
    },[])
    return (
        <>
            <div className="min-h-screen">
                <nav className="bg-white border-b-2 border">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="shrink-0 flex items-center">
                                    <Link href="/">
                                        <ApplicationLogo className="block h-14 w-auto text-gray-500" />
                                    </Link>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="shrink-0 flex items-center">
                                {props.auth.user ? (
                                      <Link href={route('dashboard')} className="text-sm text-gray-700 underline">
                                        Profile
                                      </Link>
                                  ) : (
                                    <>
                                      <Link href={route('login')} className="text-md text-main-color ">
                                            Log in
                                        </Link>

                                            <Link href={route('register')} className="ml-4 text-md text-main-color">
                                                Register
                                            </Link>
                                    </>
                                  )
                                  
                                  }
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <header className="drop-shadow-2xl flex shadow-lg bg-white">
                  <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                    <div className="flex">
                        <div className="shrink-0 flex items-center">
                          <Link href={route('home')} className="font-semibold text-xl leading-tight text-main-color ">
                            Bikes
                          </Link>
                        </div>
                    </div>
                  </div>
                </header>
                <section class="py-12 text-gray-700 body-font overflow-hidden bg-white">
                    <SuccessNotification showNotification={showNotification} success={flash.success} />
                <ErrorNotification showNotification={showNotification} error={flash.error} />
                    <div class="container px-5 py-24 mx-auto drop-shadow-2xl flex shadow-lg bg-white">
                        <div class="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt="ecommerce" class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src="https://svgsilh.com/svg_v2/2028197.svg" />
                        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h2 class="text-sm title-font text-gray-500 tracking-widest">BIKE TITLE</h2>
                            <div className="flex justify-between">
                                <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{bike.title}</h1>
                                <div class="flex mb-4">
                                <span class="flex items-center">
                                    <svg aria-hidden="true" class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg aria-hidden="true" class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg aria-hidden="true" class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg aria-hidden="true" class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg aria-hidden="true" class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">5.0</span>
                                </span>
                                </div>
                            </div>
                            <h2 class="text-sm title-font text-gray-500 tracking-widest">BIKE DESCRIPTION</h2>
                            <p class="leading-relaxed">{bike.description}</p>
                            <div class="flex mt-6 items-center pb-5 flex-wrap border-b-2 border-gray-200 mb-5">
                            <h2 class="text-sm title-font text-gray-500 tracking-widest">OTHER INFORMATION</h2>
                            <div class="flex mb-5 items-center w-full">
                                <span class="mr-3">Category</span>
                                <div class="relative">
                                <select class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                                    <option>{bike.category_title}</option>
                                </select>
                                </div>
                            </div>
                            <div class="flex mb-5 items-center w-full">
                                <span class="mr-3">Can be taken from</span>
                                <div class="relative">
                                <select class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                                    <option>{bike.city}, {bike.address}</option>
                                </select>
                                </div>
                            </div>
                            <div class="flex mb-5 items-center w-full">
                                <span class="mr-3">In Stock:</span>
                                <input type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/5 text-center p-2.5" value={bike.in_stock} readOnly />
                            </div>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-3xl font-bold text-gray-900">€{bike.price}</span>
                                <div class="inline-flex w-2/4 items-center">
                                    <span class="mr-3">Quantity</span>
                                    <input 
                                        type="number" 
                                        class="bg-gray-50 border border-gray-300 w-1/5 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block text-center p-2.5" 
                                        value={data.quantity}
                                        name='quantity'
                                        min={1}
                                        max={bike.in_stock}
                                        onChange={(e) => handleQuantity(e)}
                                    />
                                        <button 
                                        className="flex ml-auto text-white bg-main-color border-0 py-2 px-6 rounded"
                                        onClick={(e)=> handleSubmit(e)}>
                                            Buy
                                        </button>

                                    {/* <button class="flex ml-auto text-white bg-main-color border-0 py-2 px-6 rounded">Rent bike</button> */}
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>                
            </div>
        </>
    );

}

export default GuestRentIndex;