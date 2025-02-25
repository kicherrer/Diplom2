-- Создаем запись в таблице profiles для админа
INSERT INTO public.profiles (id, username, is_admin, created_at)
VALUES (
  '24246359-76c9-42c0-a262-3dd222713182', -- Замените на actual user ID после регистрации
  'admin',
  true,
  current_timestamp
);

-- Или обновляем существующего пользователя до админа
UPDATE public.profiles
SET is_admin = true
WHERE id = '24246359-76c9-42c0-a262-3dd222713182'; -- Замените на actual user ID после регистрации
