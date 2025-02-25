'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      common: {
        navigation: {
          home: "Home",
          discover: "Discover",
          profile: "Profile",
          admin: "Admin"
        },
        auth: {
          signIn: "Sign In",
          signOut: "Sign Out",
          signUp: "Sign Up",
          email: "Email",
          password: "Password",
          createAccount: "Create Account"
        },
        home: {
          title: "Your Personal Media Library",
          subtitle: "Track, discover, and manage your favorite movies, TV shows, and documentaries all in one place",
          features: {
            mediaCatalog: {
              title: "Media Catalog",
              description: "Browse through our extensive collection of movies and TV shows"
            },
            recommendations: {
              title: "Recommendations",
              description: "Get personalized suggestions based on your preferences"
            },
            userProfiles: {
              title: "User Profiles",
              description: "Create your profile and track your watching history"
            },
            ratingsReviews: {
              title: "Ratings & Reviews",
              description: "Rate and review your favorite content"
            }
          },
          startExploring: "Start Exploring"
        }
      },
      admin: {
        title: "Admin Dashboard",
        tabs: {
          users: "Users",
          media: "Media",
          stats: "Statistics"
        },
        users: {
          title: "User Management",
          makeAdmin: "Make Admin",
          removeAdmin: "Remove Admin"
        },
        media: {
          title: "Media Management",
          edit: "Edit"
        },
        stats: {
          totalUsers: "Total Users",
          totalMedia: "Total Media Items",
          adminUsers: "Admin Users"
        },
        login: {
          title: "Admin Login",
          email: "Email",
          password: "Password",
          submit: "Login",
          loading: "Logging in...",
          success: "Login successful",
          error: "Login failed",
          notAdmin: "User is not an admin"
        }
      }
    }
  },
  ru: {
    translation: {
      common: {
        navigation: {
          home: "Главная",
          discover: "Поиск",
          profile: "Профиль",
          admin: "Админ"
        },
        auth: {
          signIn: "Войти",
          signOut: "Выйти",
          signUp: "Регистрация",
          email: "Email",
          password: "Пароль",
          createAccount: "Создать аккаунт"
        },
        home: {
          title: "Ваша Персональная Медиатека",
          subtitle: "Отслеживайте, находите и управляйте вашими любимыми фильмами, сериалами и документальными фильмами в одном месте",
          features: {
            mediaCatalog: {
              title: "Медиакаталог",
              description: "Просматривайте нашу обширную коллекцию фильмов и сериалов"
            },
            recommendations: {
              title: "Рекомендации",
              description: "Получайте персонализированные предложения на основе ваших предпочтений"
            },
            userProfiles: {
              title: "Профили пользователей",
              description: "Создайте свой профиль и отслеживайте историю просмотров"
            },
            ratingsReviews: {
              title: "Оценки и отзывы",
              description: "Оценивайте и пишите отзывы о любимом контенте"
            }
          },
          startExploring: "Начать просмотр"
        }
      },
      admin: {
        title: "Панель администратора",
        tabs: {
          users: "Пользователи",
          media: "Медиа",
          stats: "Статистика"
        },
        users: {
          title: "Управление пользователями",
          makeAdmin: "Сделать админом",
          removeAdmin: "Убрать админа"
        },
        media: {
          title: "Управление медиа",
          edit: "Редактировать"
        },
        stats: {
          totalUsers: "Всего пользователей",
          totalMedia: "Всего медиа",
          adminUsers: "Администраторов"
        },
        login: {
          title: "Вход для администратора",
          email: "Email",
          password: "Пароль",
          submit: "Войти",
          loading: "Вход...",
          success: "Вход выполнен",
          error: "Ошибка входа",
          notAdmin: "Пользователь не является администратором"
        }
      }
    }
  }
};

let savedLanguage = 'ru';
try {
  if (typeof window !== 'undefined') {
    savedLanguage = localStorage.getItem('i18nextLng') || 'ru';
  }
} catch (error) {
  console.warn('Failed to access localStorage');
}

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    lng: savedLanguage,
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
    },
    interpolation: {
      escapeValue: false,
    },
    resources
  });

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  localStorage.setItem('i18nextLng', lng);
});

export default i18n;