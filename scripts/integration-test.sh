#!/bin/bash

# Configuration
GATEWAY_SERVICE="http://k8s-sharedingressgrou-77bb4809e7-1430318718.us-east-1.elb.amazonaws.com"  # LoadBalancer endpoint
INTERNAL_SERVICE="patient-record-blue"  # Service name for ClusterIP service
NAMESPACE="medi-track-blue"  # Kubernetes namespace where services are deployed
MAX_RETRIES=3
RETRY_INTERVAL=5

# Function to log messages with timestamp
log_message() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# Function to check if we're running inside EKS cluster
is_in_cluster() {
    if [ -f /var/run/secrets/kubernetes.io/serviceaccount/token ]; then
        return 0
    else
        return 1
    fi
}

# Function to perform the integration test
perform_test() {
    local retry_count=0
    local test_passed=false

    while [ $retry_count -lt $MAX_RETRIES ] && [ "$test_passed" = false ]; do
        log_message "Attempt $((retry_count + 1)) of $MAX_RETRIES"

        # Test gateway service (LoadBalancer)
        gateway_response=$(curl -s -o /dev/null -w "%{http_code}" "${GATEWAY_SERVICE}/" || echo "failed")
        
        if [ "$gateway_response" = "200" ]; then
            log_message "Gateway service health check passed"
            
            # Test internal service (ClusterIP)
            if is_in_cluster; then
                # If running inside cluster, use kubernetes service DNS
                internal_response=$(curl -s -o /dev/null -w "%{http_code}" "http://${INTERNAL_SERVICE}.${NAMESPACE}.svc.cluster.local/" || echo "failed")
            else
                # If running outside cluster (e.g., during build), use kubectl port-forward
                port_forward_pid=""
                kubectl port-forward -n "${NAMESPACE}" "service/${INTERNAL_SERVICE}" 8080:4000 &
                port_forward_pid=$!
                sleep 2  # Wait for port-forward to establish
                
                internal_response=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:8080/ping" || echo "failed")
                
                # Clean up port-forward
                if [ -n "$port_forward_pid" ]; then
                    kill $port_forward_pid 2>/dev/null || true
                fi
            fi
            
            if [ "$internal_response" = "200" ]; then
                log_message "Internal service health check passed"
                test_passed=true
                break
            else
                log_message "Internal service health check failed with response: $internal_response"
            fi
        else
            log_message "Gateway service health check failed with response: $gateway_response"
        fi
        
        retry_count=$((retry_count + 1))
        if [ $retry_count -lt $MAX_RETRIES ]; then
            log_message "Retrying in $RETRY_INTERVAL seconds..."
            sleep $RETRY_INTERVAL
        fi
    done

    if [ "$test_passed" = true ]; then
        log_message "Integration test passed successfully"
        return 0
    else
        log_message "Integration test failed after $MAX_RETRIES attempts"
        return 1
    fi
}

# Execute the test
perform_test
exit $?