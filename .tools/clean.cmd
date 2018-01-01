@ECHO OFF

CD /d %~dp0\..
ECHO Clean up temporary files.
RMDIR /S /Q node_modules
CALL yarn cache clean
