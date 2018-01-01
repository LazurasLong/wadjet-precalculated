@ECHO OFF

CD /d %~dp0\..
ECHO Clean up temporary files.
RMDIR /S /Q node_modules
RMDIR /S /Q dist
RMDIR /S /Q yarn-error.log
RMDIR /S /Q *.db
CALL yarn cache clean
