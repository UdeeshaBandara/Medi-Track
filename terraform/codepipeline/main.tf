

# # Define the S3 bucket for CodePipeline artifacts
# resource "aws_s3_bucket" "codepipeline_bucket" {
#   bucket        = "medi-track-codepipeline-artifacts-${var.unique_suffix}"
#   force_destroy = true
# }

# # Define the IAM role for CodePipeline
# resource "aws_iam_role" "codepipeline_role" {
#   name = "codepipeline-role"

#   assume_role_policy = jsonencode({
#     Version = "2012-10-17"
#     Statement = [
#       {
#         Effect = "Allow"
#         Principal = {
#           Service = "codepipeline.amazonaws.com"
#         }
#         Action = "sts:AssumeRole"
#       }
#     ]
#   })
# }

# # Attach policies to the CodePipeline role
# resource "aws_iam_role_policy_attachment" "codepipeline_policy_attach" {
#   role       = aws_iam_role.codepipeline_role.name
#   policy_arn = "arn:aws:iam::aws:policy/AWSCodePipelineFullAccess"
# }

# resource "aws_iam_role_policy_attachment" "codepipeline_s3_access" {
#   role       = aws_iam_role.codepipeline_role.name
#   policy_arn = "arn:aws:iam::aws:policy/AmazonS3FullAccess"
# }

# # Define the CodePipeline
# resource "aws_codepipeline" "medi_track_pipeline" {
#   name     = "medi-track-pipeline"
#   role_arn = aws_iam_role.codepipeline_role.arn

#   artifact_store {
#     location = aws_s3_bucket.codepipeline_bucket.bucket
#     type     = "S3"
#   }

#   stage {
#     name = "Source"

#     action {
#       name             = "Source"
#       category         = "Source"
#       owner            = "AWS"
#       provider         = "GitHub"
#       version          = "1"
#       output_artifacts = ["source_output"]

#       configuration = {
#         Owner      = var.github_repo_owner
#         Repo       = var.github_repo_name
#         Branch     = var.github_repo_branch
#         OAuthToken = "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" 
#       }
#     }
#   }

#   stage {
#     name = "Build"

#     action {
#       name             = "Build"
#       category         = "Build"
#       owner            = "AWS"
#       provider         = "CodeBuild"
#       version          = "1"
#       input_artifacts  = ["source_output"]
#       output_artifacts = ["build_output"]

#       configuration = {
#         ProjectName = "medi-track-pipeline"
#       }
#     }
#   }
# }

variable "github_token" {
  description = "Personal Access Token for GitHub"
  type        = string
  sensitive   = true
}


# resource "aws_secretsmanager_secret" "github_token" {
#   name        = "github-token"
#   description = "Personal Access Token for GitHub"
# }

# resource "aws_secretsmanager_secret_version" "github_token_version" {
#   secret_id     = aws_secretsmanager_secret.github_token.id
#   secret_string = var.github_token
#   lifecycle {
#     prevent_destroy = true
#     ignore_changes  = [secret_string]
#   }
# }



resource "aws_codepipeline" "codepipeline" {
  name     = "medi-track-pipeline"
  role_arn = aws_iam_role.codepipeline_role.arn

  # creating S3 bucket to store build artifacts
  artifact_store {
    location = aws_s3_bucket.codepipeline_bucket.bucket
    type     = "S3"
  }

  stage {
    name = "Source"

    action {
      name             = "Source"
      category         = "Source"
      owner            = "AWS"
      provider         = "CodeStarSourceConnection"
      version          = "1"
      output_artifacts = ["source_output"]

      configuration = {
        ConnectionArn    = aws_codestarconnections_connection.medi-track-code-star.arn
        FullRepositoryId = "UdeeshaBandara/Medi-Track"
        BranchName       = "main"
      }

    }
  }

  stage {
    name = "Build"

    action {
      name             = "Build"
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      input_artifacts  = ["source_output"]
      output_artifacts = ["build_output"]
      version          = "1"

      configuration = {
        ProjectName = "medi-track-build-project"
      }
    }
  }

  # stage {
  #   name = "Deploy"

  #   action {
  #     name            = "Deploy"
  #     category        = "Deploy"
  #     owner           = "AWS"
  #     provider        = "CloudFormation"
  #     input_artifacts = ["build_output"]
  #     version         = "1"

  #     configuration = {
  #       ActionMode     = "REPLACE_ON_FAILURE"
  #       Capabilities   = "CAPABILITY_AUTO_EXPAND,CAPABILITY_IAM"
  #       OutputFileName = "CreateStackOutput.json"
  #       StackName      = "MyStack"
  #       TemplatePath   = "build_output::sam-templated.yaml"
  #       RoleArn            = aws_iam_role.codepipeline_role.arn
  #     }
  #   }
  # }
}

resource "aws_codestarconnections_connection" "medi-track-code-star" {
  name          = "medi-track-code-star-connection"
  provider_type = "GitHub"
}

resource "aws_s3_bucket" "codepipeline_bucket" {
  bucket = "test-bucket-123321-medi-track-12"
}

resource "aws_s3_bucket_public_access_block" "codepipeline_bucket_pab" {
  bucket = aws_s3_bucket.codepipeline_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
  lifecycle {
    prevent_destroy = true
  }
}

data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["codepipeline.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "codepipeline_role" {
  name = "codepipeline-deploy-role"
  # assume_role_policy = data.aws_iam_policy_document.assume_role.json

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "codepipeline.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}
resource "aws_iam_policy" "codepipeline_s3_policy" {
  name        = "CodePipelineS3ListBucketPolicy"
  description = "Policy for CodePipeline to list S3 bucket"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = "s3:ListBucket"
        Resource = "arn:aws:s3:::test-bucket-123321-medi-track-12"
      }
    ]
  })
}


resource "aws_iam_policy" "codepipeline_policy" {
  name        = "codepipeline-policy"
  description = "Policy for CodePipeline to deploy ECS applications"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = "ecs:UpdateService"
        Resource = "*"
      },
      {
        Effect   = "Allow"
        Action   = "ecs:DescribeServices"
        Resource = "*"
      },
      {
        Effect   = "Allow"
        Action   = "ecr:GetAuthorizationToken"
        Resource = "*"
      },
      {
        Effect   = "Allow"
        Action   = "ecr:BatchCheckLayerAvailability"
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "policy_attachment" {
  role       = aws_iam_role.codepipeline_role.name
  policy_arn = aws_iam_policy.codepipeline_policy.arn
}
resource "aws_iam_role_policy_attachment" "codepipeline_s3_attachment" {
  role       = aws_iam_role.codepipeline_role.name
  policy_arn = aws_iam_policy.codepipeline_s3_policy.arn
}


data "aws_iam_policy_document" "tf-cicd-build-policies" {
    statement{
        sid = ""
        actions = ["logs:*", "s3:*", "codebuild:*", "secretsmanager:*","iam:*"]
        resources = ["*"]
        effect = "Allow"
    }
}

resource "aws_iam_policy" "tf-cicd-pipeline-policy" {
    name = "tf-cicd-pipeline-policy"
    path = "/"
    description = "Codebuild policy"
    policy = data.aws_iam_policy_document.tf-cicd-build-policies.json
}

resource "aws_iam_role_policy_attachment" "tf-cicd-codebuild-attachment1" {
    policy_arn  = aws_iam_policy.tf-cicd-pipeline-policy.arn
    role        = aws_iam_role.codepipeline_role.id
}

resource "aws_iam_role_policy_attachment" "tf-cicd-codebuild-attachment2" {
    policy_arn  = "arn:aws:iam::aws:policy/PowerUserAccess"
    role        = aws_iam_role.codepipeline_role.id
}

resource "aws_iam_role_policy_attachment" "codebuild_role_cloudwatch" {
  role       = aws_iam_role.codepipeline_role.name
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchFullAccess"
}

# CodeStart access
resource "aws_iam_role_policy_attachment" "codestar_connections_full_access" {
  role       = aws_iam_role.codepipeline_role.name
  policy_arn = "arn:aws:iam::aws:policy/AWSCodeStarFullAccess"
}
resource "aws_iam_policy" "custom_codestar_policy" {
  name = "CustomCodeStarPermissions"

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Sid" : "CodeStarEC2",
        "Effect" : "Allow",
        "Action" : [
          "codestar:*",
          "ec2:DescribeKeyPairs",
          "ec2:DescribeVpcs",
          "ec2:DescribeSubnets",
          "cloud9:DescribeEnvironment*",
          "cloud9:ValidateEnvironmentName"
        ],
        "Resource" : "*"
      },
      {
        "Sid" : "CodeStarCF",
        "Effect" : "Allow",
        "Action" : [
          "cloudformation:DescribeStack*",
          "cloudformation:ListStacks*",
          "cloudformation:GetTemplateSummary"
        ],
        "Resource" : [
          "arn:aws:cloudformation:*:*:stack/awscodestar-*"
        ]
      }
    ]
  })
}
resource "aws_iam_role_policy_attachment" "custom_codestar_policy_attach" {
  role       = aws_iam_role.codepipeline_role.name
  policy_arn = aws_iam_policy.custom_codestar_policy.arn
}

data "aws_iam_policy_document" "codepipeline_policy" {
  statement {
    effect = "Allow"

    actions = [
      "s3:GetObject",
      "s3:GetObjectVersion",
      "s3:GetBucketVersioning",
      "s3:PutObjectAcl",
      "s3:PutObject",
    ]

    resources = [
      aws_s3_bucket.codepipeline_bucket.arn,
      "${aws_s3_bucket.codepipeline_bucket.arn}/*"
    ]
  }

  statement {
    effect    = "Allow"
    actions   = ["codestar-connections:UseConnection"]
    resources = [aws_codestarconnections_connection.medi-track-code-star.arn]
  }

  statement {
    effect = "Allow"

    actions = [
      "codebuild:BatchGetBuilds",
      "codebuild:StartBuild",
    ]

    resources = ["*"]
  }
}

# # Attach the updated service role policy for CodePipeline
# resource "aws_iam_role_policy_attachment" "codepipeline_service_role" {
#   role       = aws_iam_role.codepipeline_role.name
#   policy_arn = "arn:aws:iam::aws:policy/service-role/AWSCodePipelineServiceRole"
# }

# Additional permissions for S3 access (if needed)
resource "aws_iam_role_policy_attachment" "codepipeline_s3_access" {
  role       = aws_iam_role.codepipeline_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3FullAccess"
}
resource "aws_iam_role_policy_attachment" "codepipeline_codestar_permissions" {
  role       = aws_iam_role.codepipeline_role.name
  policy_arn = aws_iam_policy.codestar_policy.arn
}

resource "aws_iam_policy" "codestar_policy" {
  name = "CodePipelineCodestarPolicy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "codestar-connections:UseConnection"
        ]
        Resource = "arn:aws:codestar-connections:us-east-1:061051254585:connection/fdd2302c-0f1d-4bca-8444-af8318971cbd"
      }
    ]
  })
}

