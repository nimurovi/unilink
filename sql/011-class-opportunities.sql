CREATE TABLE IF NOT EXISTS class_opportunities (
 id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin PRIMARY KEY,
 class_id INT UNSIGNED NOT NULL,
 author_id INT UNSIGNED NOT NULL,
 title VARCHAR(200) NOT NULL,
 description TEXT NOT NULL,
 category VARCHAR(30) NOT NULL,
 organization VARCHAR(150) NOT NULL,
 location VARCHAR(200) NOT NULL,
 application_url VARCHAR(2000) NOT NULL,
 deadline DATE NULL,
 closed TINYINT(1) NOT NULL DEFAULT 0,
 version INT UNSIGNED NOT NULL DEFAULT 1,
 created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 KEY opportunities_class (class_id,created_at),
 CONSTRAINT fk_opportunities_class FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE RESTRICT,
 CONSTRAINT fk_opportunities_author FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
