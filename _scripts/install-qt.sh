#!/usr/bin/env bash

python3 -m venv venv

source ../venv/bin/activate

pip install --upgrade pip

pip install fbs PyQt5==5.9.2
