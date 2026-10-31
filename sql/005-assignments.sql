CREATE TABLE IF NOT EXISTS assignments (
 id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin PRIMARY KEY,
 class_id INT UNSIGNED NOT NULL,
 author_id INT UNSIGNED NOT NULL,
 title VARCHAR(200) NOT NULL,
 course VARCHAR(100) NOT NULL,
 code VARCHAR(100) NOT NULL,
 instructor VARCHAR(150) NOT NULL,
 description TEXT NOT NULL,
 due_at DATETIME NOT NULL,
 total_marks INT UNSIGNED NOT NULL DEFAULT 100,
 max_attempts INT UNSIGNED NOT NULL DEFAULT 3,
 allow_late TINYINT(1) NOT NULL DEFAULT 0,
 material_id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NULL,
 version INT UNSIGNED NOT NULL DEFAULT 1,
 created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 deleted_at DATETIME NULL,
 KEY assignments_class (class_id,deleted_at,due_at),
 CONSTRAINT fk_assignment_class FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE RESTRICT,
 CONSTRAINT fk_assignment_author FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE RESTRICT,
 CONSTRAINT fk_assignment_material FOREIGN KEY (material_id) REFERENCES class_materials(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS assignment_submissions (
 assignment_id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 user_id INT UNSIGNED NOT NULL,
 file_id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 file_name VARCHAR(200) NOT NULL,
 file_size INT UNSIGNED NOT NULL,
 note TEXT NOT NULL,
 attempts INT UNSIGNED NOT NULL DEFAULT 1,
 submitted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 is_late TINYINT(1) NOT NULL DEFAULT 0,
 PRIMARY KEY (assignment_id,user_id),
 UNIQUE KEY submission_file (file_id),
 CONSTRAINT fk_submission_assignment FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE RESTRICT,
 CONSTRAINT fk_submission_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
