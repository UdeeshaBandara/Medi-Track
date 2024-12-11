resource "aws_ecr_repository" "notification_repo" {
  name = "notification"
}

resource "aws_ecr_repository" "medi_track_gateway_repo" {
  name = "medi-track-gateway"
}

resource "aws_ecr_repository" "patient_record_service_repo" {
  name = "patient-record-service"
}

resource "aws_ecr_repository" "file_handler_repo" {
  name = "file-handler"
}

resource "aws_ecr_repository" "appointment_scheduling_repo" {
  name = "appointment-scheduling"
}
resource "aws_ecr_repository" "medi_track_cron_jobs_repo" {
  name = "medi-track-cron-jobs"
}

output "ecr_repository_urls" {
  value = {
    notification_repo           = aws_ecr_repository.notification_repo.repository_url
    medi_track_gateway_repo     = aws_ecr_repository.medi_track_gateway_repo.repository_url
    patient_record_service_repo = aws_ecr_repository.patient_record_service_repo.repository_url
    file_handler_repo           = aws_ecr_repository.file_handler_repo.repository_url
    appointment_scheduling_repo = aws_ecr_repository.appointment_scheduling_repo.repository_url
    medi_track_cron_jobs_repo = aws_ecr_repository.medi_track_cron_jobs_repo.repository_url
  }
}
