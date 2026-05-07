#!/bin/bash

set -e

echo "🧹 remove build directory"
rm -rf build

echo "🏗️ npm build start"
npm run build

echo "🚀 firebase hosting deploy"
firebase deploy --only hosting

echo "✅ deploy complete"
