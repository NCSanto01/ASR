provider "google" {
  project = "avian-catwalk-398407"
  region  = "europe-west1"
  zone    = "europe-west1-b"
}

resource "google_compute_instance" "terraform" {
  name         = "terraform"
  machine_type = "n1-standard-1"
  boot_disk {
    initialize_params {
      image = "projects/centos-cloud/global/images/centos-7-v20220822"
    }
  }
  network_interface {
    network = "default"
    access_config {
    }
  }
  tags = ["allow-ssh", "allow-http"]
}

resource "google_compute_firewall" "allow-ssh" {
  name        = "allow-ssh"
  network     = "default"
  allow {
    protocol = "tcp"
    ports    = ["22"]
  }
  source_ranges = ["0.0.0.0/0"]  # Esto permite el acceso desde cualquier dirección IP. 
}

resource "google_compute_firewall" "allow-http" {
  name        = "allow-http"
  network     = "default"
  allow {
    protocol = "tcp"
    ports    = ["80"]
  }
  source_ranges = ["0.0.0.0/0"]  # Esto permite el acceso desde cualquier dirección IP.
}