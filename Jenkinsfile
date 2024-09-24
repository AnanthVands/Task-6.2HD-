pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-id')  
        SONARQUBE_CREDENTIALS = credentials('sonarqube-id')   
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build('ananthvands/book-haven:latest')
                }
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "$DOCKERHUB_CREDENTIALS") {
                        docker.image('ananthvands/book-haven:latest').push('latest')
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }

        stage('Code Quality') {
            steps {
                script {
                    sh "sonar-scanner -Dsonar.login=$SONARQUBE_CREDENTIALS"
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                script {
                    sh 'docker-compose pull'
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up Docker resources...'
            sh 'docker system prune -f'
        }
    }
}

