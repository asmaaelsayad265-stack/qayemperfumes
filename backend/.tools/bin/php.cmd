@echo off
set "PHP_DIR=%~dp0..\php"
"%PHP_DIR%\php.exe" -c "%PHP_DIR%\php.ini" %*
