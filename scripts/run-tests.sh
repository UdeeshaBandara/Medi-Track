#!/bin/bash

# Configuration
BLUE_NAMESPACE="medi-track-blue"
GREEN_NAMESPACE="medi-track-green"
INGRESS_GROUP_NAME="shared-ingress-group"

# Logging function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"
}

# Update Ingress configuration
update_ingress() {
    local blue_weight=$1
    local green_weight=$2
    local target_deploy=${3}

    log "target_deploy: ${target_deploy}"

    if [[ "${target_deploy}" == "blue" ]]; then
        blue_order=0
        green_order=10
    elif [[ "${target_deploy}" == "green" ]]; then
        blue_order=10
        green_order=0
    else
        log "Invalid target deployment. Use 'blue' or 'green'."
        exit 1
    fi

    # Update Blue Namespace Ingress
    log "Updating Blue Ingress in namespace: ${BLUE_NAMESPACE}"
    kubectl patch ingress health-sync -n "${BLUE_NAMESPACE}" -p "{
        \"metadata\": {
            \"annotations\": {
                \"alb.ingress.kubernetes.io/group.name\": \"${INGRESS_GROUP_NAME}\",
                \"alb.ingress.kubernetes.io/group.order\": \"${blue_order}\",
                \"alb.ingress.kubernetes.io/weighted-target-groups\": \"[
                    {\"serviceName\": \"medi-track-gateway-blue\", \"servicePort\": 3000, \"weight\": ${blue_weight}},
                    {\"serviceName\": \"medi-track-gateway-green\", \"servicePort\": 3000, \"weight\": ${green_weight}}
                ]\"
            }
        }
    }"

    # Update Green Namespace Ingress
    log "Updating Green Ingress in namespace: ${GREEN_NAMESPACE}"
    kubectl patch ingress health-sync -n "${GREEN_NAMESPACE}" -p "{
        \"metadata\": {
            \"annotations\": {
                \"alb.ingress.kubernetes.io/group.name\": \"${INGRESS_GROUP_NAME}\",
                \"alb.ingress.kubernetes.io/group.order\": \"${green_order}\",
                \"alb.ingress.kubernetes.io/weighted-target-groups\": \"[
                    {\"serviceName\": \"medi-track-gateway-blue\", \"servicePort\": 3000, \"weight\": ${blue_weight}},
                    {\"serviceName\": \"medi-track-gateway-green\", \"servicePort\": 3000, \"weight\": ${green_weight}}
                ]\"
            }
        }
    }"
}

# Main function to manage traffic shifting
main() {

    local target=${1}
    local deploy_type=${2:-gradual}

    log "Parameters: ${target} ${deploy_type}"

    if [[ -z "${target}" || -z "${deploy_type}" ]]; then
        log "Missing arguments. Usage: ./script.sh <blue|green> <immediate|rollback>."
        exit 1
    fi

    case "${deploy_type}" in
        "immediate")
            log "Immediate switch to Green"
            update_ingress 0 100 "${target}"
            ;;
        "rollback")
            log "Rollback to Blue"
            update_ingress 100 0 "${target}"
            ;;
        "gradual")
            log "Starting gradual traffic shift"
            # Gradual shift steps
            update_ingress 90 10 "${target}"
            sleep 60
            update_ingress 50 50 "${target}"
            sleep 60
            update_ingress 10 90 "${target}"
            sleep 60
            update_ingress 0 100 "${target}"
            ;;
        *)
            log "Invalid deploy type. Use 'immediate', 'rollback', or 'gradual'."
            exit 1
            ;;
    esac
}

# Execute main function
main "$@"