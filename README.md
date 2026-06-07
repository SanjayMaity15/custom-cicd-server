# Custom CI/CD Server

A lightweight self-hosted CI/CD server that automates application deployments using GitHub Webhooks, SSH, and Bash scripts.

When code is pushed to the `main` branch, the server receives a webhook from GitHub, verifies the request, connects to the target server via SSH, and executes a deployment script.

---

## Features

* GitHub Webhook Integration
* Webhook Signature Verification
* Automatic Deployment on Main Branch
* SSH-Based Remote Deployment
* Bash Script Execution
* Self-Hosted Deployment Automation
* Secure GitHub Event Validation

---

## Architecture

```text
Developer
    |
git push
    |
    v
GitHub Repository
    |
Push Webhook
    |
    v
Custom CI/CD Server
    |
Verify Signature
    |
Check Branch
    |
SSH Connection
    |
    v
Target Server
    |
Execute Deployment Script
    |
Deployment Complete
```

---

## How It Works

### 1. Push Code

```bash
git add .
git commit -m "new feature"
git push origin main
```

### 2. GitHub Sends Webhook

GitHub sends a push event to the configured webhook endpoint.

### 3. Verify Webhook Signature

The server validates the webhook using the GitHub webhook secret to ensure the request originated from GitHub.

### 4. Branch Validation

Deployments are triggered only when code is pushed to the `main` branch.

### 5. SSH Into Target Server

The CI/CD server establishes an SSH connection to the deployment server.

Example:

```bash
ssh ubuntu@SERVER_IP "/home/ubuntu/deploy.sh"
```

### 6. Execute Deployment Script

The deployment script updates the application and restarts the service.

---

## Example Deployment Script

```bash
#!/bin/bash

set -e

echo "Starting deployment..."

cd /var/www/backend

git pull origin main

npm install

npm run build

pm2 restart backend

echo "Deployment completed successfully."
```

---

## Environment Variables

```env
PORT=3000

GITHUB_SECRET=your_github_webhook_secret
```

---

## GitHub Webhook Configuration

### Payload URL

```text
http://YOUR_SERVER_IP:3000/webhook
```

### Content Type

```text
application/json
```

### Secret

```text
your_github_webhook_secret
```

### Events

```text
Push Events
```

---

## Project Structure

```text
custom-cicd-server/
│
├── server.js
├── package.json
├── .env
└── README.md
```

---

## Tech Stack

* Node.js
* Express.js
* GitHub Webhooks
* SSH
* Bash
* PM2
* Linux
* AWS EC2

---

## Security

* GitHub Webhook Signature Verification
* SSH Key Authentication
* Environment Variable Based Configuration

---

## Future Enhancements

* Monorepo Support
* Multiple Project Support
* Deployment Logs
* Deployment History
* Email Notifications
* Rollback Functionality
* Redis Job Queue
* Docker-Based Deployments

---

## Deployment Flow

```text
git push
    |
    v
GitHub
    |
Webhook
    |
    v
Custom CI/CD Server
    |
Verify Signature
    |
Check Branch
    |
SSH
    |
    v
Production Server
    |
deploy.sh
    |
git pull
npm install
npm run build
pm2 restart
```

