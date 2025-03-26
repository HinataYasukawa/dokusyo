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
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newContent, setNewContent] = useState("");

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

  // 削除機能
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

  // 編集モード切り替え
  const handleEdit = (review: Review) => {
    setEditingReview({ ...review }); // 既存のレビュー情報をコピー
  };

  // 編集キャンセル
  const handleCancelEdit = () => {
    setEditingReview(null); // 編集モードを終了
  };

  // 編集内容の保存
  const handleUpdate = () => {
    if (editingReview) {
      axios
        .put(`http://localhost:8080/reviews/${editingReview.ID}`, editingReview)
        .then(() => {
          alert("レビューを更新しました。");
          setReviews(
            reviews.map((review) =>
              review.ID === editingReview.ID ? editingReview : review
            )
          );
          setEditingReview(null); // 編集モード終了
        })
        .catch((error) => {
          console.error("Error updating review:", error);
          alert("更新に失敗しました。");
        });
    }
  };

  //新規投稿
  const handleCreate = () => {
    if (!newBookTitle || !newContent) {
      alert("タイトルと内容を入力してください。");
      return;
    }

    const newReview = {
      BookTitle: newBookTitle,
      Content: newContent,
    };

    axios
      .post("http://localhost:8080/reviews", newReview)
      .then((response) => {
        alert("レビューを投稿しました。");
        setNewBookTitle("");
        setNewContent("");
        fetchReviews();
      })
      .catch((error) => {
        console.error("Error creating review:", error);
        alert("投稿に失敗しました");
      });
  };

  return (
    <div>
      <h2>新しいレビューの投稿</h2>
      <div>
        <label>
          タイトル:
          <input
            type="text"
            value={newBookTitle}
            onChange={(e) => setNewBookTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          内容:
          <input
            type="text"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
        </label>
        <br />
        <button onClick={handleCreate}>投稿</button>
      </div>
      <hr />

      <h2>レビュー一覧</h2>

      {editingReview && (
        <div>
          <h3>レビューの編集</h3>
          <label>
            タイトル:
            <input
              type="text"
              value={editingReview.BookTitle}
              onChange={(e) =>
                setEditingReview({
                  ...editingReview,
                  BookTitle: e.target.value,
                })
              }
            />
          </label>
          <br />
          <label>
            内容:
            <input
              type="text"
              value={editingReview.Content}
              onChange={(e) =>
                setEditingReview({ ...editingReview, Content: e.target.value })
              }
            />
          </label>
          <br />
          <button onClick={handleUpdate}>保存</button>
          <button onClick={handleCancelEdit} style={{ marginLeft: "10px" }}>
            キャンセル
          </button>
        </div>
      )}

      {reviews.length === 0 ? (
        <p>レビューがありません</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.ID}>
              <strong>{review.BookTitle}</strong>: {review.Content} (
              {new Date(review.CreatedAt).toLocaleString()})
              <button
                onClick={() => handleEdit(review)}
                style={{ marginLeft: "10px", color: "blue" }}
              >
                編集
              </button>
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
