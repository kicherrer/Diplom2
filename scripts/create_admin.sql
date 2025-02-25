-- Создаем запись в таблице profiles для админа
INSERT INTO public.profiles (id, username, is_admin, created_at)
VALUES (
  'ID_ВАШЕГО_ПОЛЬЗОВАТЕЛЯ', -- Замените на actual user ID после регистрации
  'admin',
  true,
  current_timestamp
);

-- Или обновляем существующего пользователя до админа
UPDATE public.profiles
SET is_admin = true
WHERE id = 'ID_ВАШЕГО_ПОЛЬЗОВАТЕЛЯ'; -- Замените на actual user ID после регистрации
