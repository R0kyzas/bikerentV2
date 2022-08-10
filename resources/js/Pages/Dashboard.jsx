import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Link } from '@inertiajs/inertia-react';

export default function Dashboard(props) {

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

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div class="inline-flex w-full justify-between rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    <p>
                                        Options
                                    </p>
                                    <button type="button" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                        <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
