pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-id')
        SONARQUBE_CREDENTIALS = credentials('sonarqube-id')
        DOCKER_PATH = "/usr/local/bin/docker"  
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    echo 'Checking Docker availability in Build Docker Image stage...'
                    sh "${env.DOCKER_PATH} --version"  
                    sh "${env.DOCKER_PATH} build -t ananthvands/book-haven:latest ."
                }
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                script {
                    echo 'Checking Docker availability in Push Docker Image stage...'
                    sh "${env.DOCKER_PATH} --version"  
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-id') {
                        sh "${env.DOCKER_PATH} push ananthvands/book-haven:latest" 
                    }
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                script {
                    echo 'Checking Docker availability in Deploy to Staging stage...'
                    sh "${env.DOCKER_PATH} --version"  
                    sh 'docker-compose pull'
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up Docker resources...'
            withEnv(['PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin']) {  
                echo 'Checking Docker availability in post-cleanup stage...'
                sh "${env.DOCKER_PATH} --version"  
                sh 'docker system prune -f'
            }
        }
    }
}
