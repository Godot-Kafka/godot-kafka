:: Setup Clang
set CC=clang
set CXX=clang++

:: Run this script to build the project
cmake -B build -S . && cmake --build build