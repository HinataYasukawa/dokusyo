package models

import "time"

type Review struct {
    ID        uint      `gorm:"primaryKey"`
    BookTitle string    `gorm:"not null"`
    Content   string    `gorm:"not null"`
    CreatedAt time.Time `gorm:"autoCreateTime"`
}
