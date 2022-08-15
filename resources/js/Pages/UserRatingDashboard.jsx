import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link, useForm, usePage } from "@inertiajs/inertia-react";
import ReactStars from "react-rating-stars-component";

export default function Dashboard(props) {
    const { order } = usePage().props;

    const { data, setData, post } = useForm({
        user_id: order.user_id,
        bike_id: order.order_items[0].bike_id,
        review_status: 0,
        comment: "",
        rating: 1,
    });
    const thirdExample = {
        size: 40,
        count: 5,
        isHalf: false,
        value: data.rating,
        name: "rating",
        onChange: (newValue) => {
            data.rating = newValue;
            setData("rating", data.rating);
        },
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("user.review.store", order.id));
    };

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <header className="drop-shadow-2xl flex shadow-lg bg-white">
                <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                    <div className="flex">
                        <div className="shrink-0 flex items-center">
                            <Link
                                href={route("home")}
                                className="font-semibold text-xl leading-tight text-main-color "
                            >
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
                            <div className="w-2/5 mb-10 rounded-t border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                <form onSubmit={handleSubmit}>
                                    <div className="w-full">
                                        <h1 className="text-center text-xl text-gray-600">
                                            Please rate our bike
                                        </h1>
                                        <ReactStars {...thirdExample} />
                                        <textarea
                                            type="text"
                                            className="form-control block w-full px-3 py-1.5
                                                                    text-base
                                                                    font-normal
                                                                    text-gray-700
                                                                    bg-white bg-clip-padding
                                                                    border border-solid border-gray-300
                                                                    rounded
                                                                    transition
                                                                    ease-in-out
                                                                    my-5
                                                                    m-0
                                                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            name={"comment"}
                                            value={data.comment}
                                            onChange={(e) =>
                                                setData(
                                                    "comment",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <button
                                            data-modal-toggle="popup-modal"
                                            type="submit"
                                            className="bg-main-color text-white font-bold py-2 px-4 rounded"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
