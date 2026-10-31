CREATE TABLE IF NOT EXISTS class_materials (
 id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin PRIMARY KEY,
 class_id INT UNSIGNED NOT NULL,
 author_id INT UNSIGNED NOT NULL,
 title VARCHAR(200) NOT NULL,
 course VARCHAR(100) NOT NULL,
 code VARCHAR(100) NOT NULL,
 type VARCHAR(30) NOT NULL,
 description TEXT NOT NULL,
 file_name VARCHAR(200) NOT NULL,
 file_size INT UNSIGNED NOT NULL,
 file_ext VARCHAR(10) NOT NULL,
 created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 deleted_at DATETIME NULL,
 KEY materials_class (class_id, deleted_at, created_at),
 CONSTRAINT fk_material_class FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE RESTRICT,
 CONSTRAINT fk_material_author FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS saved_materials (
 user_id INT UNSIGNED NOT NULL,
 material_id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 PRIMARY KEY (user_id, material_id),
 CONSTRAINT fk_saved_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
 CONSTRAINT fk_saved_material FOREIGN KEY (material_id) REFERENCES class_materials(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
