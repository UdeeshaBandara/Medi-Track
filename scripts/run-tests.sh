#!/bin/bash

# Configuration
BLUE_NAMESPACE="medi-track-blue"
GREEN_NAMESPACE="medi-track-green"
INGRESS_GROUP_NAME="shared-ingress-group"

# Logging function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"
}

# Update Ingress configuration with dynamic group order
update_ingress() {
    local target_deploy=$1
    local deploy_type=$2

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
    log "Updating Blue Ingress in namespace: ${BLUE_NAMESPACE} with group.order: ${blue_order}"
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
    log "Updating Green Ingress in namespace: ${GREEN_NAMESPACE} with group.order: ${green_order}"
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

# Main function to switch deployment
main() {
    local target=${1}
    local deploy_type=${2}

    if [[ -z "${target}" || -z "${deploy_type}" ]]; then
        log "Missing arguments. Usage: ./script.sh <blue|green> <immediate|rollback>."
        exit 1
    fi

    log "Deployment target: ${target}, Deployment type: ${deploy_type}"

    case "${deploy_type}" in
        immediate)
            log "Performing immediate switch."
            update_ingress "${target}" "${deploy_type}"
            ;;
        rollback)
            log "Performing rollback."
            update_ingress "${target}" "${deploy_type}"
            ;;
        *)
            log "Invalid deployment type. Use 'immediate' or 'rollback'."
            exit 1
            ;;
    esac
}

# Execute main function
main "$@"
