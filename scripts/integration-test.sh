#!/bin/bash

# Service endpoints
GATEWAY_URL="http://k8s-sharedingressgrou-77bb4809e7-1430318718.us-east-1.elb.amazonaws.com"
INTERNAL_SERVICE="internal-service"
NAMESPACE="your-namespace"

echo "Starting simple service communication test..."

# Test Gateway Service (LoadBalancer)
echo "Testing Gateway Service..."
gateway_response=$(curl -s -w "%{http_code}" "${GATEWAY_URL}/")
if [ "$gateway_response" = "200" ]; then
    echo "✓ Gateway Service is responsive"
else
    echo "✗ Gateway Service test failed"
    exit 1
fi

# Test Internal Service (ClusterIP)
echo "Testing Internal Service..."
internal_response=$(curl -s -w "%{http_code}" "http://${INTERNAL_SERVICE}.${NAMESPACE}.svc.cluster.local/")
if [ "$internal_response" = "200" ]; then
    echo "✓ Internal Service is responsive"
else
    echo "✗ Internal Service test failed"
    exit 1
fi

echo "All services are communicating properly!"
exit 0