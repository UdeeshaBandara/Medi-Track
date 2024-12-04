provider "aws" {
  region = var.region
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}
variable "github_token" {
  description = "Personal Access Token for GitHub"
  type        = string
  sensitive   = true
}


module "ecr" {
  source = "./ecr"
}

module "iam" {
  source = "./iam"
}

module "codebuild" {
  source = "./codebuild"
  github_token = var.github_token
}

module "codepipeline" {
  source = "./codepipeline"
  github_token = var.github_token
}

# module "eks" {
#   source = "./eks"
# }


# module "ingress" {
#   source = "./ingress"
# }
