"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 4.2.15.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path
from datetime import timedelta
from environs import Env

env = Env()
env.read_env()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('DJANGO_SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.bool('DJANGO_DEBUG')

# why is this not working??
# ALLOWED_HOSTS = env('ALLOWED_HOSTS').split(',')
# ALLOWED_HOSTS = [] if not any(ALLOWED_HOSTS) else ALLOWED_HOSTS
ALLOWED_HOSTS = [
    'localhost', 
    '127.0.0.1', 
    'sarahcodes.xyz', 
    '24.144.104.232',
    '86.38.203.9',
    'www.baidu.com',
    '192.168.0.29:1337',
    '192.168.0.29:8000',
]

# why the fuck did i have this???
# WEBSITE_URL = 'http://localhost:8000/'


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    # Whitenoise DEV ONLY - CHANGE FOR PROD
    # 'whitenoise.runserver_nostatic',
    'django.contrib.staticfiles',
    # Third party
    'corsheaders',
    'rest_framework',
    'rest_framework.authtoken',
    'rest_framework_simplejwt',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    'dj_rest_auth',
    'dj_rest_auth.registration',
    'django_filters',
    # Local
    'authentication',
    'blog',
    'portfolio',
    'bookshelf',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    # 'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'db',
        'PORT': '5432',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
#   => https://docs.djangoproject.com/en/4.2/howto/static-files/
# Media uploads (Files, Images, User-generated content)
#   => https://testdriven.io/blog/storing-django-static-and-media-files-on-amazon-s3/

USE_S3 = env.bool('USE_S3')

if USE_S3:
    # AWS settings
    AWS_ACCESS_KEY_ID = env('AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = env('AWS_SECRET_ACCESS_KEY')
    AWS_STORAGE_BUCKET_NAME = env('AWS_STORAGE_BUCKET_NAME')
    AWS_S3_REGION_NAME = env('AWS_S3_REGION_NAME')
    AWS_DEFAULT_ACL = 'public-read'
    # S3 media settings
    MEDIA_URL = '/mediafiles/'
    MEDIA_ROOT = BASE_DIR / 'mediafiles'
    # Whitenoise static settings
    STATIC_URL = '/staticfiles/'
    STATIC_ROOT = BASE_DIR / 'staticfiles'
    # STATICFILES_DIRS = [BASE_DIR / 'static']
    # Storage backends for S3 and Whitenoise
    STORAGES = {
        'default': {
            'BACKEND': 'storages.backends.s3.S3Storage',
        },
        'staticfiles': {
            'BACKEND': 'django.contrib.staticfiles.storage.StaticFilesStorage',
            # 'BACKEND': 'whitenoise.storage.CompressedManifestStaticFilesStorage',
        }
    }
else:
    # Development/local media settings
    MEDIA_URL = '/mediafiles/'
    MEDIA_ROOT = BASE_DIR / 'mediafiles'
    # Local static settings
    STATIC_URL = '/staticfiles/'
    STATIC_ROOT = BASE_DIR / 'staticfiles'


# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Extra fun stuff :)

AUTH_USER_MODEL = 'authentication.CustomUser'

AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend', # existing backend
    'allauth.account.auth_backends.AuthenticationBackend',
)

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

SITE_ID = 1

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': False,
    'UPDATE_LAST_LOGIN': True,
    'SIGNING_KEY': 'complexsigningkey',  # generate a key and replace me
    'ALGORITHM': 'HS512',
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ]
}

ACCOUNT_ADAPTER = 'authentication.adapter.CustomAccountAdapter'

ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_VERIFICATION = 'none'

REST_AUTH_REGISTER_SERIALIZERS = {
    'REGISTER_SERIALIZER': 'authentication.serializers.CustomRegisterSerializer',
}

REST_AUTH = {
    'USE_JWT': True,
    'JWT_AUTH_HTTPONLY': False,
}

# if DEBUG:
#     CORS_ALLOW_ALL_ORIGINS = True
# else:
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://www.sarahcodes.xyz',
    'http://sarahcodes.xyz',
    'http://24.144.104.232',
    'http://24.144.104.232:1337',
    'http://24.144.104.232:8000',
    'http://24.144.104.232:3000',
    'http://24.144.104.232:80',
    'http://86.38.203.9',
    'http://86.38.203.9:1337',
    'http://86.38.203.9:8000',
    'http://86.38.203.9:3000',
    'http://86.38.203.9:80',
    'http://192.168.0.29:1337'
]

CORS_ORIGINS_WHITELIST = [
    'http://127.0.0.1:8000',
    'http://127.0.0.1:3000',
    'http://localhost:8000',
    'http://localhost:3000',
    'http://24.144.104.232',
    'http://24.144.104.232:1337'
    'http://24.144.104.232:3000',
    'http://86.38.203.9',
    'http://86.38.203.9:1337',
    'http://86.38.203.9:8000',
    'http://86.38.203.9:3000',
    'http://86.38.203.9:80',
    'http://192.168.0.29:1337'
]

CSRF_TRUSTED_ORIGINS = [
    'http://127.0.0.1:8000',
    'http://127.0.0.1:3000',
    'http://localhost:8000',
    'http://localhost:3000',
    'http://24.144.104.232',
    'http://24.144.104.232:1337'
    'http://24.144.104.232:3000',
    'http://86.38.203.9',
    'http://86.38.203.9:1337',
    'http://86.38.203.9:8000',
    'http://86.38.203.9:3000',
    'http://86.38.203.9:80',
    'http://localhost:1337',
    'http://192.168.0.29:1337'
]

CSRF_ALLOWED_ORIGINS = [
    'http://127.0.0.1:8000',
    'http://127.0.0.1:3000',
    'http://localhost:8000',
    'http://localhost:3000',
    'http://24.144.104.232',
    'http://24.144.104.232:1337'
    'http://24.144.104.232:3000',
    'http://86.38.203.9',
    'http://86.38.203.9:1337',
    'http://86.38.203.9:8000',
    'http://86.38.203.9:3000',
    'http://86.38.203.9:80',
    'http://localhost:1337',
    'http://192.168.0.29:1337'
]

SECURE_CROSS_ORIGIN_OPENER_POLICY = None
CSRF_COOKIE_SECURE=False

SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'APP': {
            'client_id': env('GOOGLE_CLIENT_ID'),
            'secret': env('GOOGLE_KEY'),
            'key': '', # leave empty
        },
        'SCOPE': [
            'profile',
            'email',
        ],
        'AUTH_PARAMS': {
            'access_type': 'online',
        },
        'VERIFIED_EMAIL': True,
    },
}
