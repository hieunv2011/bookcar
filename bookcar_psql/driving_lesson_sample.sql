-- Dữ liệu mẫu cho bảng driving_lessons (course_id = 10) với thời gian giãn cách hợp lý
INSERT INTO driving_lessons (id, course_id, lesson_name, lesson_date, duration, status, start_time_window, end_time_window, created_date, updated_date)
VALUES
  (1, 10, 'Bài thực hành số 1', '2025-05-22 08:00:00', 90, 'scheduled', '2025-05-22 08:00:00', '2025-05-22 10:00:00', NOW(), NOW()),
  (2, 10, 'Bài thực hành số 2', '2025-05-22 13:00:00', 90, 'scheduled', '2025-05-22 13:00:00', '2025-05-22 15:00:00', NOW(), NOW()),
  (3, 10, 'Bài thực hành số 3', '2025-05-23 08:00:00', 90, 'scheduled', '2025-05-23 08:00:00', '2025-05-23 10:00:00', NOW(), NOW());

-- Dữ liệu mẫu cho bảng driving_lesson_participants (mỗi buổi có 2 học viên, 2 xe)
INSERT INTO driving_lesson_participants (id, driving_lesson_id, vehicle_id, trainee_id, actual_start_time, actual_end_time, created_date, updated_date)
VALUES
  (1, 1, 1, 101, '2025-05-22 08:00:00', '2025-05-22 09:30:00', NOW(), NOW()),
  (2, 1, 2, 102, '2025-05-22 08:00:00', '2025-05-22 09:30:00', NOW(), NOW()),
  (3, 2, 1, 103, '2025-05-22 13:00:00', '2025-05-22 14:30:00', NOW(), NOW()),
  (4, 2, 2, 104, '2025-05-22 13:00:00', '2025-05-22 14:30:00', NOW(), NOW()),
  (5, 3, 1, 105, '2025-05-23 08:00:00', '2025-05-23 09:30:00', NOW(), NOW()),
  (6, 3, 2, 106, '2025-05-23 08:00:00', '2025-05-23 09:30:00', NOW(), NOW());
