import React, {useState} from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/inertia-react';
import PagePagination from '@/Components/PagePagination';
import Filter from './Filter';
import FilterSortBy from './FilterSortBy';
import FilterByCategories from './FilterByCategories';
import FilterByCities from './FilterByCities';

export default function GuestDashboard(props) {
    // const { bikes } = usePage().props;

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
                                            <Link href={route('login')} className="text-md text-main-color ">
                                                Log in
                                            </Link>

                                            <Link href={route('register')} className="ml-4 text-md text-main-color">
                                                Register
                                            </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <header class="drop-shadow-2xl flex shadow-lg bg-white">
                  <div class="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                    <div className="flex">
                        <div className="shrink-0 flex items-center">
                          <Link href={route('login')} className="font-semibold text-xl leading-tight text-main-color ">
                            Bikes
                          </Link>

                          <Link href={route('register')} className="ml-10 font-semibold text-xl leading-tight text-main-color">
                            Contact us
                          </Link>
                          
                          <Link href={route('register')} className="ml-10 font-semibold text-xl leading-tight text-main-color">
                            Reviews
                          </Link>

                          <Link href={route('register')} className="ml-10 font-semibold text-xl leading-tight text-main-color">
                            Offers
                          </Link>
                        </div>
                    </div>
                  </div>
                </header>
        <div className='bg-white'>

    {/* <div class="relative z-40 lg:hidden" role="dialog" aria-modal="true">

      <div class="fixed inset-0 bg-black bg-opacity-25"></div>

      <div class="fixed inset-0 flex z-40">

        <div class="ml-auto relative w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
          <div class="px-4 flex items-center justify-between">
            <h2 class="text-lg font-medium text-gray-900">Filters</h2>
            <button onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
              type="button" class="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400">
              <span class="sr-only">Close menu</span>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                <path className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </div> */}


    <main class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="relative z-10 flex items-center justify-between pt-8 pb-6 border-b border-gray-200">
        <div className='flex'>
          <FilterByCategories />
          <FilterByCities />
        </div>

        <div class="flex items-center">
          <div class="relative flex justify-end inline-block text-left">
            <FilterSortBy />
          </div>
              
          <span className="text-sm font-medium text-gray-700 hover:text-gray-900 p-2 -m-2 ml-5">Bicycles quantity: 10</span>

          {/* <button type="button" class="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden">
            <span class="sr-only">Filters</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
            </svg>
          </button> */}
        </div>
      </div>

      <section aria-labelledby="products-heading" class="pt-6">
        <h2 id="products-heading" class="sr-only">Products</h2>
          <PagePagination />
      </section>
    </main>
  </div>

            </div>
        </>
    );
}
