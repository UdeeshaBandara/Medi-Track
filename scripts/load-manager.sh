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

  log "INGRESS_GROUP_NAME: ${INGRESS_GROUP_NAME}"
  log "BLUE_NAMESPACE: ${BLUE_NAMESPACE}"
  log "blue_order: ${blue_order}"
  log "blue_weight: ${blue_weight}"
  log "GREEN_NAMESPACE: ${GREEN_NAMESPACE}"
  log "green_order: ${green_order}"
  log "green_weight: ${green_weight}"

  # Create compact JSON patch
  local blue_patch=$(
    cat <<EOF
{
    "metadata": {
        "annotations": {
            "alb.ingress.kubernetes.io/group.name": "${INGRESS_GROUP_NAME}",
            "alb.ingress.kubernetes.io/group.order": "${blue_order}",
            "alb.ingress.kubernetes.io/weighted-target-groups": 
            "[{\"serviceName\": \"medi-track-gateway-blue\", \"servicePort\": 3000,
             \"weight\": ${blue_weight}},{\"serviceName\": \"medi-track-gateway-green\", 
             \"servicePort\": 3000, \"weight\": ${green_weight}}]"
        }
    }
}
EOF
  )

  local green_patch=$(
    cat <<EOF
{
    "metadata": {
        "annotations": {
            "alb.ingress.kubernetes.io/group.name": "${INGRESS_GROUP_NAME}",
            "alb.ingress.kubernetes.io/group.order": "${green_order}",
            "alb.ingress.kubernetes.io/weighted-target-groups": 
            "[{\"serviceName\": \"medi-track-gateway-blue\", \"servicePort\": 3000, 
            \"weight\": ${blue_weight}},{\"serviceName\": \"medi-track-gateway-green\", 
            \"servicePort\": 3000, \"weight\": ${green_weight}}]"
        }
    }
}
EOF
  )
  # Update Blue Namespace Ingress
  log "Updating Blue Ingress in namespace: ${BLUE_NAMESPACE}"
  kubectl patch ingress health-sync -n "${BLUE_NAMESPACE}" -p "${blue_patch}" --type=merge

  # Update Green Namespace Ingress
  log "Updating Green Ingress in namespace: ${GREEN_NAMESPACE}"
  kubectl patch ingress health-sync -n "${GREEN_NAMESPACE}" -p "${green_patch}" --type=merge

}

# Main function to manage traffic shifting
main() {

  local target=${1}
  local deploy_type=${2:-gradual}
  local IMAGE_TAG=${3}

  AWS_ACCOUNT_ID="061051254585"
  NAMESPACE="medi-track-green"
  MEDI_TRACK_ECR_REPOSITORY="medi-track-gateway"
  MEDI_TRACK_DEPLOYMENT_NAME="medi-track-gateway"
  PATIENT_RECORD_ECR_REPOSITORY="patient-record-service"
  PATIENT_RECORD_DEPLOYMENT_NAME="patient-record"
  APPOINTMENTS_ECR_REPOSITORY="appointment-scheduling"
  APPOINTMENTS_DEPLOYMENT_NAME="appointment-scheduling"
  NOTIFICATION_ECR_REPOSITORY="notification"
  NOTIFICATION_DEPLOYMENT_NAME="notification-service"
  FILE_HANDLER_ECR_REPOSITORY="file-handler"
  FILE_HANDLER_DEPLOYMENT_NAME="file-handler"
  CRON_JOBS_ECR_REPOSITORY="medi-track-cron-jobs"
  CRON_JOBS_APPOINTMENT_RECORD_DEPLOYMENT_NAME="appointment-records-job"
  CRON_JOBS_DOCTOR_RECORD_DEPLOYMENT_NAME="appointments-per-doctor-job"
  CRON_JOBS_DISEASE_SUMMARY_DEPLOYMENT_NAME="disease-summary-job"

  log "Parameters: ${target} ${deploy_type}"

  if [[ -z "${target}" || -z "${deploy_type}" ]]; then
    log "Missing arguments. Usage: ./script.sh <blue|green> <immediate|rollback>."
    exit 1
  fi
  

  # if true then
  kubectl set image deployment/"${MEDI_TRACK_DEPLOYMENT_NAME}"-green \
    "${MEDI_TRACK_ECR_REPOSITORY}"="${AWS_ACCOUNT_ID}".dkr.ecr.us-east-1.amazonaws.com/"${MEDI_TRACK_ECR_REPOSITORY}":"${IMAGE_TAG}" \
    -n "${NAMESPACE}"
  kubectl apply -f k8s/green/medi-track-gateway-green-deployment.yaml -n "${NAMESPACE}"

  kubectl set image deployment/"${PATIENT_RECORD_DEPLOYMENT_NAME}"-green \
    "${PATIENT_RECORD_ECR_REPOSITORY}"="${AWS_ACCOUNT_ID}".dkr.ecr.us-east-1.amazonaws.com/"${PATIENT_RECORD_ECR_REPOSITORY}":"${IMAGE_TAG}" \
    -n "${NAMESPACE}"
  kubectl apply -f k8s/green/patient-record-green-deployment.yaml.yaml -n "${NAMESPACE}"

  kubectl set image deployment/"${APPOINTMENTS_DEPLOYMENT_NAME}"-green \
    "${APPOINTMENTS_ECR_REPOSITORY}"="${AWS_ACCOUNT_ID}".dkr.ecr.us-east-1.amazonaws.com/"${APPOINTMENTS_ECR_REPOSITORY}":"${IMAGE_TAG}" \
    -n "${NAMESPACE}"
  kubectl apply -f k8s/green/appointment-scheduling-green-deployment.yaml -n "${NAMESPACE}"

  kubectl set image deployment/"${NOTIFICATION_DEPLOYMENT_NAME}"-green \
    "${NOTIFICATION_ECR_REPOSITORY}"="${AWS_ACCOUNT_ID}".dkr.ecr.us-east-1.amazonaws.com/"${NOTIFICATION_ECR_REPOSITORY}":"${IMAGE_TAG}" \
    -n "${NAMESPACE}"
  kubectl apply -f k8s/green/notification-service-green-deployment.yaml -n "${NAMESPACE}"
  kubectl set image deployment/"${FILE_HANDLER_DEPLOYMENT_NAME}"-green \
    "${FILE_HANDLER_ECR_REPOSITORY}"="${AWS_ACCOUNT_ID}".dkr.ecr.us-east-1.amazonaws.com/"${FILE_HANDLER_ECR_REPOSITORY}":"${IMAGE_TAG}" \
    -n "${NAMESPACE}"
  kubectl apply -f k8s/green/file-handler-green-deployment.yaml -n "${NAMESPACE}"

  kubectl set image cronjob/"${CRON_JOBS_APPOINTMENT_RECORD_DEPLOYMENT_NAME}"-green \
    "${CRON_JOBS_ECR_REPOSITORY}"="${AWS_ACCOUNT_ID}".dkr.ecr.us-east-1.amazonaws.com/"${CRON_JOBS_ECR_REPOSITORY}":"${IMAGE_TAG}" \
    -n "${NAMESPACE}"
  kubectl apply -f k8s/green/appointment-records-cron-green.yaml -n "${NAMESPACE}"
  kubectl set image cronjob/"${CRON_JOBS_DOCTOR_RECORD_DEPLOYMENT_NAME}"-green \
    "${CRON_JOBS_ECR_REPOSITORY}"="${AWS_ACCOUNT_ID}".dkr.ecr.us-east-1.amazonaws.com/"${CRON_JOBS_ECR_REPOSITORY}":"${IMAGE_TAG}" \
    -n "${NAMESPACE}"
  kubectl apply -f k8s/green/appointments-per-doctor-cron-green.yaml -n "${NAMESPACE}"
  kubectl set image cronjob/"${CRON_JOBS_DISEASE_SUMMARY_DEPLOYMENT_NAME}"-green \
    "${CRON_JOBS_ECR_REPOSITORY}"="${AWS_ACCOUNT_ID}".dkr.ecr.us-east-1.amazonaws.com/"${CRON_JOBS_ECR_REPOSITORY}":"${IMAGE_TAG}" \
    -n "${NAMESPACE}"
  kubectl apply -f k8s/green/disease-summary-cron-green.yaml -n "${NAMESPACE}"

  # fi

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
