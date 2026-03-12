@echo off
REM Prisma Setup Script for Portfolio Backend (Windows)

echo.
echo ====================================================
echo  Prisma Setup for Portfolio Backend
echo ====================================================
echo.

REM Step 1: Install dependencies
echo 1. Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo.
echo [OK] Dependencies installed!
echo.

REM Step 2: Generate Prisma Client
echo 2. Generating Prisma Client...
call npx prisma generate
if errorlevel 1 (
    echo ERROR: Failed to generate Prisma Client
    pause
    exit /b 1
)
echo.
echo [OK] Prisma Client generated!
echo.

REM Step 3: Push schema to database
echo 3. Pushing schema to database...
echo    This will create all the tables in your PostgreSQL database
call npx prisma db push
if errorlevel 1 (
    echo ERROR: Failed to push schema to database
    pause
    exit /b 1
)
echo.
echo [OK] Database schema pushed!
echo.

REM Step 4: Success message
echo ====================================================
echo [OK] Setup complete!
echo ====================================================
echo.
echo Next steps:
echo   1. Update your controllers to use Prisma
echo      (see PRISMA_MIGRATION_GUIDE.md)
echo   2. Test your API endpoints
echo.
echo Optional commands:
echo   - View data:        npx prisma studio
echo   - Seed database:    npx prisma db seed
echo   - Check schema:     npx prisma generate
echo.
pause
