# Release Notes

## Version 1.0.0 - Initial Production Release
**Date**: December 17, 2025

### 🚀 New Features
- **Blog Engine**: Complete backend ‘blog’ app with `Post` model and REST API viewsets.
- **Frontend v1**: React application initialized with Vite.
- **JWT Auth**: Full integration of `djangorestframework-simplejwt` for secure login/registration.
- **Unified Auth**: Refactored User model to `AbstractBaseUser` to support both Django Admin and React Users.
- **UI Overhaul**: Replaced basic CSS with **Tailwind CSS** for a professional, responsive look.
- **Navigation**: Added dynamic Navbar with Login/Logout state management.
- **Post Management**: Added ability to create and view blog posts via the frontend.

### 🐛 Bug Fixes
- Fixed `ModuleNotFoundError` for `rest_framework_simplejwt`.
- Resolved `401 Unauthorized` errors by implementing proper `RegisterSerializer` and permissions.
- Fixed 400 Bad Request registration errors by improving frontend error handling logic.
- Resolved "Unexpected token" syntax error in `Form.jsx`.

### 🔧 Improvements
- **Security**: Explicitly set `ALLOWED_HOSTS` and CORS headers for secure API communication.
- **Performance**: Optimized frontend build with Vite.
