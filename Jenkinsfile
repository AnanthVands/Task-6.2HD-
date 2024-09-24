pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Code Quality') {
            steps {
                sh 'sonar-scanner'
            }
        }

        stage('Deploy to Staging') {
            steps {
                sh 'docker-compose up -d'
            }
        }

        stage('Release to Production') {
            steps {
                sh 'aws deploy create-deployment --application-name myApp --deployment-config-name CodeDeployDefault.OneAtATime --deployment-group-name myDeploymentGroup --description "Production release"'
            }
        }

        stage('Monitoring') {
            steps {
                sh 'datadog-agent status'
            }
        }
    }
}
