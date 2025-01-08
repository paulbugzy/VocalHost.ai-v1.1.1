#!/bin/bash
    set -e

    echo "Running Snyk security scan..."
    snyk test

    echo "Running dependency audit..."
    npm audit

    echo "Running OWASP ZAP scan..."
    zap-baseline.py -t http://localhost:3007 -r zap_report.html

    echo "Security scan completed successfully!"
