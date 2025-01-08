#!/bin/bash
    set -e

    echo "Starting recovery tests..."

    # Apply chaos experiments
    kubectl apply -f chaos/network-latency.yaml
    kubectl apply -f chaos/pod-failure.yaml

    # Run recovery tests
    npm run test:recovery

    # Clean up chaos experiments
    kubectl delete -f chaos/network-latency.yaml
    kubectl delete -f chaos/pod-failure.yaml

    echo "Recovery tests completed successfully!"
