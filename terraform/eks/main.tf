module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  cluster_name    = "medi-track"
  cluster_version = "20.30.1"

  eks_managed_node_groups = {
    medi_track_node_group = {
      desired_capacity = 2
      max_size         = 5
      min_size         = 2
      instance_types   = ["t2.micro"]
    }
  }
}
