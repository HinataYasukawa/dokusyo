import React, { useEffect, useState } from "react";
import axios from "axios";

interface Review {
  ID: number;
  BookTitle: string;
  Content: string;
  CreatedAt: string;
}

const ReviewList: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/reviews")
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []);

  return (
    <div>
      <h2>レビュー一覧</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.ID}>
            <strong>{review.BookTitle}</strong>: {review.Content} (
            {new Date(review.CreatedAt).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
