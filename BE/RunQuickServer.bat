@echo off
start cmd /k "cd Service1 && yarn dev"
start cmd /k "cd Service2 && yarn dev"

start cmd /k "cd Gateway && yarn dev"