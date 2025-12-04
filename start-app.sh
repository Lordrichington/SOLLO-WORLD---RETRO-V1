#!/bin/bash
set -e

echo "🚀 SOLLO App - Deployment Script"
echo "=================================="

# Stop all existing processes
echo "Stopping existing processes..."
pkill -f "webpack-dev-server\|babel-watch\|npm run dev" 2>/dev/null || true
sleep 2

# Ensure Docker containers are running
echo "Checking Docker containers..."
cd /workspaces/SOLLO-WORLD---RETRO-V1
docker-compose up -d

# Start Web Server
echo "Starting Web Server (port 8080)..."
npm run dev:web > /tmp/web-server.log 2>&1 &
WEB_PID=$!
echo "Web Server PID: $WEB_PID"

# Start API Server
echo "Starting API Server (port 8087)..."
npm run lerna:dev:server > /tmp/api-server.log 2>&1 &
API_PID=$!
echo "API Server PID: $API_PID"

# Wait and show logs
sleep 5
echo ""
echo "📊 Server Status:"
echo "=================================="
ps aux | grep -E "webpack|babel|npm run" | grep -v grep || echo "No servers running yet..."
echo ""
echo "🌐 Web Server: http://localhost:8080"
echo "📡 API Server: http://localhost:8087/graphql"
echo ""
echo "Logs:"
echo "  Web: tail -f /tmp/web-server.log"
echo "  API: tail -f /tmp/api-server.log"
echo ""
echo "✅ App should be available in your browser!"
