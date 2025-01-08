#!/bin/bash
    set -e

    echo "Starting auto-rollback check..."

    # Get current deployment status
    STATUS=$(kubectl get deployment crm-platform -o jsonpath='{.status.conditions[?(@.type=="Available")].status}')

    if [ "$STATUS" != "True" ]; then
      echo "Deployment is unhealthy, initiating rollback..."
      
      # Get previous version
      PREVIOUS_VERSION=$(kubectl rollout history deployment/crm-platform --revision=1 | grep Image | awk '{print $2}')
      
      # Rollback to previous version
      kubectl rollout undo deployment/crm-platform
      
      echo "Rollback to version $PREVIOUS_VERSION complete"
    else
      echo "Deployment is healthy, no rollback needed"
    fi
