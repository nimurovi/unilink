CREATE TABLE IF NOT EXISTS notification_reads (
 user_id INT UNSIGNED NOT NULL,
 kind VARCHAR(20) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 source_id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 version INT UNSIGNED NOT NULL,
 is_read TINYINT(1) NOT NULL DEFAULT 1,
 updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (user_id,kind,source_id,version),
 CONSTRAINT fk_notification_reader FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
