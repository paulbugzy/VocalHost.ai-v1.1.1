#!/bin/bash
    set -e

    # Build canary version
    echo "Building canary version..."
    npm run build:canary

    # Deploy canary
    echo "Deploying canary..."
    vercel deploy --prod --token=$VERCEL_TOKEN --scope=$VERCEL_SCOPE

    # Run smoke tests
    echo "Running smoke tests..."
    npm run test:smoke

    # If tests pass, promote canary
    echo "Promoting canary to production..."
    vercel promote --token=$VERCEL_TOKEN --scope=$VERCEL_SCOPE

    echo "Canary deployment successful!"
