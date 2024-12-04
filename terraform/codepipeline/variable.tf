variable "region" {
  description = "AWS region to deploy resources"
  default     = "us-east-1"
}

variable "github_repo_name" {
  description = "GitHub repository name"
  default     = "UdeeshaBandara/Medi-Track"
}

variable "unique_suffix" {
  description = "Unique suffix for resource naming to avoid conflicts"
  type        = string
  default     = "unique-suffix"
}

variable "github_repo_owner" {
  description = "Owner of the GitHub repository"
  type        = string
  default     = "UdeeshaBandara"
}


variable "github_repo_branch" {
  description = "Branch of the GitHub repository to build from"
  default     = "main"
}
