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

  // データ取得
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    axios
      .get("http://localhost:8080/reviews")
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  };

  // 削除機能の追加
  const handleDelete = (id: number) => {
    if (window.confirm("本当に削除しますか？")) {
      axios
        .delete(`http://localhost:8080/reviews/${id}`)
        .then(() => {
          alert("レビューを削除しました。");
          setReviews(reviews.filter((review) => review.ID !== id));
        })
        .catch((error) => {
          console.error("Error deleting review:", error);
          alert("削除に失敗しました。");
        });
    }
  };

  return (
    <div>
      <h2>レビュー一覧</h2>
      {reviews.length === 0 ? (
        <p>レビューがありません</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.ID}>
              <strong>{review.BookTitle}</strong>: {review.Content}(
              {new Date(review.CreatedAt).toLocaleString()})
              <button
                onClick={() => handleDelete(review.ID)}
                style={{ marginLeft: "10px", color: "red" }}
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewList;
