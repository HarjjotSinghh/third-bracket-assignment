#!/bin/bash

# Build script for Railway deployment
echo "Installing dependencies..."
npm ci

echo "Building TypeScript..."
npm run build

echo "Build completed successfully!"
ls -la dist/
