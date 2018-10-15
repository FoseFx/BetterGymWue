#!/bin/bash
git push heroku `git subtree split --prefix backend/dist $1`:master