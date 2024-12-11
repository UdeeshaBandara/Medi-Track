resource "aws_iam_role" "codebuild_role" {
  name = "codebuild-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "codebuild.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}
resource "aws_iam_role_policy_attachment" "codebuild_role_cloudwatch" {
  role       = aws_iam_role.codebuild_role.name
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchFullAccess"
}

resource "aws_iam_role_policy_attachment" "codebuild_secretsmanager_access" {
  role       = aws_iam_role.codebuild_role.name
  policy_arn = "arn:aws:iam::aws:policy/SecretsManagerReadWrite"
}
resource "aws_iam_role_policy_attachment" "codepipeline_s3_access" {
  role       = aws_iam_role.codebuild_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3FullAccess"
}

resource "aws_iam_policy" "ecr_policy" {
  name = "ECRFullAccess"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ecr:GetAuthorizationToken",
          "ecr:BatchCheckLayerAvailability",
          "ecr:CompleteLayerUpload",
          "ecr:UploadLayerPart",
          "ecr:PutImage",
          "ecr:InitiateLayerUpload",
          "ecr:GetDownloadUrlForLayer",
        ]
        Resource = "*"
      }
    ]
  })
}
resource "aws_iam_policy" "eks_kubectl_policy" {
  name        = "EKS-Kubectl-Policy"
  description = "Policy for EKS kubectl set image and rollout actions"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid       = "EKSAccess"
        Effect    = "Allow"
        Action    = [
          "eks:DescribeCluster",
        ]
        Resource = "arn:aws:eks:us-east-1:061051254585:cluster/medi-track"
      },
      {
        Sid       = "KubernetesActions"
        Effect    = "Allow"
        Action    = [
          "eks:AssumeRoleWithWebIdentity"
        ]
        Resource = "*"
      }
    ]
  })
}


resource "aws_iam_policy" "eks_access_policy" {
  name        = "eks-access-policy"
  description = "Policy for EKS access to describe and list clusters"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "eks:DescribeCluster"
        ]
        Resource = "arn:aws:eks:us-east-1:061051254585:cluster/medi-track"
      },
      {
        Effect = "Allow"
        Action = [
          "eks:DescribeCluster",
          "eks:ListClusters"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "ec2:DescribeSecurityGroups",
          "ec2:DescribeSubnets",
          "ec2:DescribeVpcs"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "sts:AssumeRole"
        ]
        Resource = "arn:aws:iam::061051254585:role/ng-1"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "tf-cicd-codebuild-attachment2" {
  policy_arn = "arn:aws:iam::aws:policy/PowerUserAccess"
  role       = aws_iam_role.codebuild_role.id
}

resource "aws_iam_user" "kubectl_user" {
  name = "kubectl-user"
}

resource "aws_iam_user_policy_attachment" "kubectl_policy_attach" {
  user       = aws_iam_user.kubectl_user.name
  policy_arn = aws_iam_policy.eks_kubectl_policy.arn
}

resource "aws_iam_role_policy_attachment" "ecr_attach" {
  role       = aws_iam_role.codebuild_role.name
  policy_arn = aws_iam_policy.ecr_policy.arn
}
resource "aws_iam_role_policy_attachment" "eks_attach" {
  role       = aws_iam_role.codebuild_role.name
  policy_arn = aws_iam_policy.eks_access_policy.arn
}


resource "aws_codebuild_project" "medi_track_build_project" {
  name         = "medi-track-build-project"
  service_role = aws_iam_role.codebuild_role.arn

  source {
    type     = "GITHUB"
    location = "https://github.com/${var.github_repo_name}"
  }

  artifacts {
    type = "NO_ARTIFACTS"
  }

  environment {
    compute_type    = "BUILD_GENERAL1_SMALL"
    image           = "aws/codebuild/standard:5.0"
    type            = "LINUX_CONTAINER"
    privileged_mode = true
  }
}

variable "github_token" {
  description = "Personal Access Token for GitHub"
  type        = string
  sensitive   = true
}

resource "aws_secretsmanager_secret" "github_PAT" {
  name        = "github_PAT"
  description = "Personal Access Token for GitHub private repo integration"
}

resource "aws_secretsmanager_secret_version" "github_token_version" {
  secret_id     = aws_secretsmanager_secret.github_PAT.id
  secret_string = var.github_token

  lifecycle {
    prevent_destroy = true
    ignore_changes  = [secret_string]
  }
}
resource "aws_iam_role" "codebuild_service_role" {
  name               = "codebuild-service-role"
  assume_role_policy = data.aws_iam_policy_document.codebuild_assume_role_policy.json
}

data "aws_iam_policy_document" "codebuild_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["codebuild.amazonaws.com"]
    }
  }
}
resource "aws_codebuild_source_credential" "github" {
  auth_type   = "PERSONAL_ACCESS_TOKEN"
  server_type = "GITHUB"
  token       = aws_secretsmanager_secret_version.github_token_version.secret_string
}
