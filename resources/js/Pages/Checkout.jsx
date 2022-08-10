import React, {useState, useEffect} from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Link, usePage, useForm } from '@inertiajs/inertia-react';
import SuccessNotification from '@/Components/SuccessNotification';
import { bindKey } from 'lodash';
import { Inertia } from '@inertiajs/inertia';

export default function Checkout(props) {
    const { basket, flash } = usePage().props;
    // const { data, setData, post, errors } = useForm({
    //     id: basket.items.id,
    //     title: basket.items.title,
    //     price: basket.items.price,
    //     quantity: basket.items.quantity,
    // });
    const [showNotification, setshowNotification] = useState(true);
    
    useEffect(() => {
        const notificationTimer = setTimeout(()=>{
            setshowNotification(false);
        }, 3500);

        return () => {
            clearTimeout(notificationTimer);
            setshowNotification(true);
        };
    }, []);
    
    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post(route("user.basket.store",basket));
    }
    
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <header class="drop-shadow-2xl flex shadow-lg bg-white">
                  <div class="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                    <div className="flex">
                        <div className="shrink-0 flex items-center">
                          <Link href={route('home')} className="font-semibold text-xl leading-tight text-main-color ">
                            Bikes
                          </Link>
                        </div>
                    </div>
                  </div>
            </header>
            {/* <SuccessNotification showNotification={showNotification} success={flash.success} /> */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="grid grid-cols-3">
        <div class="lg:col-span-2 col-span-3 space-y-8 px-12">
            <div class="rounded-md mt-7">
                    <section>
                        <div class="py-6 bg-white text-gray-600">
                            <div class="flex border-b border-gray-200 h-12 py-3 items-center justify-evenly">
                        <h2 class="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">Delivery</h2>
                                <span class="text-right px-2">Pickup in store</span>
                            </div>
                        </div>
                    </section>
            </div>
            <div class="rounded-md mt-7">
                    <section>
                        <div class="mb-3 bg-white text-gray-600">
                            <div class="flex border-b border-gray-200 h-12 py-3 items-center justify-evenly">
                        <h2 class="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">Payment method</h2>
                                <span class="text-right px-2">Pay upon collection of the product</span>
                            </div>
                        </div>
                    </section>
            </div>
            <button 
            onClick={(e)=> handleSubmit(e)}
            class="submit-button px-4 py-3 rounded-full bg-main-color text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors">
                Confirm order
            </button>
        </div>
        <div class="col-span-1 bg-white lg:block hidden">
            <h1 class="py-6 border-b-2 text-xl text-gray-600 px-8">Order Summary</h1>
            {basket.items.map((item) => (
                <ul class="py-6 border-b space-y-6 px-8">
                    <li class="grid grid-cols-6 gap-2 border-b-1">
                        <div class="col-span-1 self-center">
                            <img alt="ecommerce" class="rounded w-full" src="https://svgsilh.com/svg_v2/2028197.svg" />
                        </div>
                        <div class="flex flex-col col-span-3 pt-2">
                            <span class="text-gray-600 text-md font-semi-bold">{item.title}</span>
                            <span class="text-gray-400 text-sm inline-block pt-2">{item.idn}</span>
                        </div>
                        <div class="col-span-2 pt-3">
                            <div class="flex items-center space-x-2 text-sm justify-end">
                                <span class="text-gray-400">{item.quantity} x €{item.unitPrice}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            ))}
            <div class="px-8 border-b">
                <div class="flex justify-between py-4 text-gray-600">
                    <span>Shipping</span>
                    <span class="font-semibold text-main-color">Free</span>
                </div>
            </div>
            <div class="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
                <span>Total</span>
                <span>€{basket.totalPrice}</span>
            </div>
        </div>
    </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}