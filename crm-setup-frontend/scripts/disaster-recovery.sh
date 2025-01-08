#!/bin/bash
    set -e

    echo "Starting disaster recovery tests..."

    # Simulate database failure
    kubectl delete pod -l app=database

    # Run recovery tests
    npm run test:disaster-recovery

    echo "Disaster recovery tests completed successfully!"
