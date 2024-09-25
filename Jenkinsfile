pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-id')
        SONARQUBE_CREDENTIALS = credentials('sonarqube-id')
        DOCKER_PATH = "/usr/bin/docker"
        DOCKER_COMPOSE_PATH = "/usr/local/bin/docker-compose"  
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    echo 'Building Docker Image...'
                    sh "${env.DOCKER_PATH} build -t ananthvands/book-haven:latest ."
                }
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                script {
                    echo 'Pushing Docker Image to Docker Hub...'
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-id') {
                        sh "${env.DOCKER_PATH} push ananthvands/book-haven:latest"
                    }
                }
            }
        }

        stage('Test Application') {
            steps {
                script {
                    echo 'Running Tests (Placeholder)...'
                }
            }
        }

        stage('Code Quality Analysis') {
            steps {
                script {
                    echo 'Running SonarQube Analysis (Placeholder)...'
                    
                    withSonarQubeEnv('SonarQubeServer') {
                        echo 'SonarQube analysis '
                    }
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                script {
                    echo 'Deploying to Staging...'
                    sh "${env.DOCKER_COMPOSE_PATH} pull"
                    sh "${env.DOCKER_COMPOSE_PATH} up -d"
                }
            }
        }

        stage('Release to Production') {
            steps {
                script {
                    echo 'Releasing to Production (Placeholder)...'
                }
            }
        }

        stage('Monitoring and Alerting') {
            steps {
                script {
                    echo 'Monitoring & Alerting (Placeholder)...'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up Docker resources...'
            sh "${env.DOCKER_PATH} system prune -f"
        }
    }
}
