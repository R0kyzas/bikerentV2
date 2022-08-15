import React from "react";
import ReactStars from "react-rating-stars-component";

const StarRating = ({ data }) => {
    let totalRating = 0;
    let ratingCount = 0;
    if (Object.keys(data).length !== 0) {
        data.map((review) => {
            totalRating += review.rating;
            ratingCount++;
        });
        let avgRating = Math.round((totalRating / ratingCount) * 10) / 10;

        return (
            <div className="flex items-center">
                <ReactStars
                    edit={false}
                    value={avgRating}
                    count={5}
                    size={24}
                    activeColor="#ffd700"
                />
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                    {avgRating}
                </span>
            </div>
        );
    }
    return (
        <div className="flex items-center">
            <ReactStars
                edit={false}
                value={0}
                count={5}
                size={24}
                activeColor="#ffd700"
            />
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                0
            </span>
        </div>
    );
};

export default StarRating;
