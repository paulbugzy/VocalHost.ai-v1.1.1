#!/bin/bash
    set -e

    echo "Starting chaos engineering tests..."

    # Apply network latency chaos
    kubectl apply -f chaos/network-latency.yaml
    echo "Network latency chaos applied"

    # Run performance tests
    npm run test:performance

    # Remove network latency chaos
    kubectl delete -f chaos/network-latency.yaml
    echo "Network latency chaos removed"

    # Apply pod failure chaos
    kubectl apply -f chaos/pod-failure.yaml
    echo "Pod failure chaos applied"

    # Run availability tests
    npm run test:availability

    # Remove pod failure chaos
    kubectl delete -f chaos/pod-failure.yaml
    echo "Pod failure chaos removed"

    echo "Chaos engineering tests completed successfully!"
