-- Обновляем существующего пользователя до админа
UPDATE public.profiles
SET is_admin = true
WHERE id = 'ID_ВАШЕГО_ПОЛЬЗОВАТЕЛЯ'; -- Замените на actual user ID

-- Или создаем нового админа (если таблица пустая)
INSERT INTO public.profiles (id, username, is_admin, created_at)
VALUES (
  'ID_ВАШЕГО_ПОЛЬЗОВАТЕЛЯ', -- Замените на actual user ID
  'admin',
  true,
  current_timestamp
);
