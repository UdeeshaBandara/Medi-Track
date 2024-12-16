#!/bin/bash

# Function to switch traffic to green deployment
switch_to_green() {
  local namespace=$1
  kubectl patch ingress medi-track -n "${namespace}" -p '{
    "spec": {
      "rules": [{
        "http": {
          "paths": [{
            "path": "/",
            "pathType": "Prefix",
            "backend": {
              "service": {
                "name": "medi-track-gateway-green",
                "port": {
                  "number": 3000
                }
              }
            }
          }]
        }
      }]
    }
  }'
}

# Function to rollback to blue deployment
rollback_to_blue() {
  local namespace=$1
  kubectl patch ingress medi-track -n "${namespace}" -p '{
    "spec": {
      "rules": [{
        "http": {
          "paths": [{
            "path": "/",
            "pathType": "Prefix",
            "backend": {
              "service": {
                "name": "medi-track-gateway-blue",
                "port": {
                  "number": 3000
                }
              }
            }
          }]
        }
      }]
    }
  }'
}

# Integration Test Function
run_integration_tests() {
  # Your integration test logic here
  # Return 0 for success, non-zero for failure
  # kubectl exec test-pod -n $1 -- /run-tests.sh
  return $?
}

# Main Deployment Logic
main() {
  local namespace=$1

  if [[ -z "${namespace}" ]]; then
    echo "Error: Namespace is required."
    exit 1
  fi

  # Run integration tests on green deployment
  # Uncomment the test logic if needed
  # if run_integration_tests "${namespace}"; then
  #   echo "Integration tests passed. Switching traffic to green."
  #   switch_to_green "${namespace}"
  # else
  #   echo "Integration tests failed. Keeping traffic on blue."
  #   rollback_to_blue "${namespace}"
  # fi

  switch_to_blue "${namespace}"
}

main "$@"
