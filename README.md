# Smart Expense Tracker – Backend

## Quick Start
1. Create and activate a virtual environment.
2. `pip install -r requirements.txt`
3. Configure MySQL in `expense_tracker/settings.py` (NAME/USER/PASSWORD).
4. `python manage.py migrate`
5. Create a superuser: `python manage.py createsuperuser`
6. Run server: `python manage.py runserver`

### Auth (JWT)
- Obtain token: `POST /api/auth/token/` with username & password.
- Refresh token: `POST /api/auth/token/refresh/`.

### Expenses API
- `GET /api/expenses/` – list
- `POST /api/expenses/` – create
- `GET /api/expenses/{id}/` – retrieve
- `PUT/PATCH /api/expenses/{id}/` – update
- `DELETE /api/expenses/{id}/` – delete
- `GET /api/expenses/summary_by_category/` – aggregate for charts
