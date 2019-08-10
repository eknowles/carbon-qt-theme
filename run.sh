#!/usr/bin/env bash

source venv/bin/activate

cd qt

pyrcc5 src/main/resources/src/carbon.qrc -o src/main/python/carbon_rc.py

fbs run
