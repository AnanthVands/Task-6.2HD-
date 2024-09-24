pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-id')
        
        SONARQUBE_CREDENTIALS = credentials('sonarqube-id')

        SHELL = '/bin/zsh'
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    sh '$SHELL -c "docker build -t ananthvands/book-haven:latest ."'
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
                    sh '$SHELL -c "npm install"'
                    sh '$SHELL -c "npm test"'
                }
            }
        }

        stage('Code Quality') {
            steps {
                script {
                    sh '$SHELL -c "sonar-scanner -Dsonar.login=$SONARQUBE_CREDENTIALS"'
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                script {
                    sh '$SHELL -c "docker-compose pull"'
                    sh '$SHELL -c "docker-compose up -d"'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up Docker resources...'
            sh '$SHELL -c "docker system prune -f"'
        }
    }
}
