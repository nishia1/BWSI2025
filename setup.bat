@echo off
echo project setup, dependency install

:: node.js dependencies
npm install

:: tailwind css
npm install -D tailwindcss
npx tailwindcss init

echo complete setup!!
pause
