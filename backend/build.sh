#!/bin/bash

# Build script for Railway deployment
echo "Installing dependencies..."
npm install

echo "Building TypeScript..."
npm run build

echo "Build completed successfully!"
ls -la dist/
