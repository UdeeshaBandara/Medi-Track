variable "region" {
  description = "AWS region to deploy resources"
  default     = "us-east-1"
}

variable "github_repo_name" {
  description = "GitHub repository name"
  default     = "UdeeshaBandara/Medi-Track"
}

variable "github_branch" {
  description = "GitHub branch to use for deployment"
  default     = "main"
}
