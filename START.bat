@echo off
echo ============================================
echo    SCAM SHIELD - Starting System
echo ============================================
echo.

echo [1/2] Starting Backend API...
start cmd /k "cd backend && python -m uvicorn main:app --reload --port 8000"

timeout /t 3 /nobreak > nul

echo [2/2] Starting Frontend Dashboard...
start cmd /k "cd frontend && npm run dev"

echo.
echo ============================================
echo    Both servers starting!
echo    
echo    Backend: http://localhost:8000
echo    Frontend: http://localhost:3000
echo.
echo    Open http://localhost:3000 in browser
echo ============================================
echo.
pause
