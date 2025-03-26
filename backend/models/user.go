package models

import (
	"time"
)

type User struct {
	ID        uint      `gorm:"primaryKey"`
	UserID    string    `gorm:"unique;not null"` // ユーザーが設定する一意のID（ログインID）
	Password  string    `gorm:"not null"`        // ハッシュ化されたパスワード
	Name      string    // 表示名
	Bio       string    // 自己紹介
	CreatedAt time.Time
}
