pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-id')
        SONARQUBE_CREDENTIALS = credentials('sonarqube-id')
        PATH = "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
    }

    stages {
        stage('Build Docker Image') {
            steps {
                withEnv(['PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin']) {
                    script {
                        echo 'Checking Docker availability in Build Docker Image stage...'
                        sh 'which docker'
                        sh 'docker --version'
                        docker.build('ananthvands/book-haven:latest')
                    }
                }
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                withEnv(['PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin']) {
                    script {
                        echo 'Checking Docker availability in Push Docker Image stage...'
                        sh 'which docker'
                        sh 'docker --version'
                        docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-id') {
                            docker.image('ananthvands/book-haven:latest').push('latest')
                        }
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    echo 'Checking Docker availability in Test stage...'
                    sh 'which docker'
                    sh 'docker --version'
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }

        stage('Code Quality') {
            steps {
                script {
                    echo 'Checking Docker availability in Code Quality stage...'
                    sh 'which docker'
                    sh 'docker --version'
                    sh "sonar-scanner -Dsonar.login=$SONARQUBE_CREDENTIALS"
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                withEnv(['PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin']) {
                    script {
                        echo 'Checking Docker availability in Deploy to Staging stage...'
                        sh 'which docker'
                        sh 'docker --version'
                        sh 'docker-compose pull'
                        sh 'docker-compose up -d'
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up Docker resources...'
            withEnv(['PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin']) {
                echo 'Checking Docker availability in post-cleanup stage...'
                sh 'which docker'
                sh 'docker --version'
                sh 'docker system prune -f'
            }
        }
    }
}
