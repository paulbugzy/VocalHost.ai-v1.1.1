#!/bin/bash
    set -e

    echo "Setting up Chaos Mesh..."
    helm repo add chaos-mesh https://charts.chaos-mesh.org
    helm repo update
    helm install chaos-mesh chaos-mesh/chaos-mesh --namespace=chaos-testing --create-namespace

    echo "Setting up monitoring..."
    kubectl apply -f monitoring/chaos-dashboard.yaml

    echo "Chaos engineering setup complete!"
