@echo off
title NutriPlan Pro - Avvio Rapido
cd /d "%~dp0"

echo ===================================================================
echo                     NUTRIPLAN PRO - AVVIO RAPIDO
echo ===================================================================
echo.
echo  [1/2] Controllo ambiente e dipendenze...
if not exist "node_modules\" (
    echo  Cartella node_modules mancante. Installazione in corso...
    call npm install
)

echo.
echo  [2/2] Avvio del server NutriPlan...
echo.
echo  * Sul tuo PC si aprira' automaticamente il browser.
echo  * Per usarlo dal CELLULARE:
echo    Assicurati che il telefono sia connesso allo stesso Wi-Fi del PC
echo    e digita nel browser del telefono l'indirizzo "Network" (es. http://192.168.x.x:5173).
echo.
echo  Per arrestare l'applicazione: chiudi questa finestra o premi CTRL+C.
echo ===================================================================
echo.

call npm run dev -- --open

pause
