pipeline {
agent any


options {
    timestamps()
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '20'))
}

environment {

    FRONTEND_IMAGE = "mrudul08cloud/3tier-frontend"
    BACKEND_IMAGE  = "mrudul08cloud/3tier-backend"

    IMAGE_TAG = "${BUILD_NUMBER}"
}

stages {

    stage('Checkout Source') {
        steps {
            git branch: 'main',
                url: 'https://github.com/mrudul08cloud/3-tier.git'
        }
    }

    stage('Build Frontend Image') {
        steps {
            sh '''
            docker build -t $FRONTEND_IMAGE:$IMAGE_TAG ./frontend
            '''
        }
    }

    stage('Build Backend Image') {
        steps {
            sh '''
            docker build -t $BACKEND_IMAGE:$IMAGE_TAG ./backend
            '''
        }
    }

    stage('Trivy Scan Frontend') {
        steps {
            sh '''
            trivy image \
            --severity HIGH,CRITICAL \
            --exit-code 1 \
            $FRONTEND_IMAGE:$IMAGE_TAG
            '''
        }
    }

    stage('Trivy Scan Backend') {
        steps {
            sh '''
            trivy image \
            --severity HIGH,CRITICAL \
            --exit-code 0 \
            $BACKEND_IMAGE:$IMAGE_TAG
            '''
        }
    }

    stage('DockerHub Login') {
        steps {
            withCredentials([
                usernamePassword(
                    credentialsId: 'jenkins',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )
            ]) {

                sh '''
                echo $DOCKER_PASS | docker login \
                -u $DOCKER_USER \
                --password-stdin
                '''
            }
        }
    }

    stage('Push Images') {
        steps {
            sh '''
            docker push $FRONTEND_IMAGE:$IMAGE_TAG
            docker push $BACKEND_IMAGE:$IMAGE_TAG
            '''
        }
    }
}

post {

    success {
        echo "Pipeline completed successfully."
    }

    failure {
        echo "Pipeline failed."
    }

    always {
        cleanWs()
    }
}

stage('Update Kubernetes Manifests') {
        steps {
            sh """
            sed -i 's|image: mrudul08cloud/3tier-backend:.*|image: mrudul08cloud/3tier-backend:${IMAGE_TAG}|g' k8s/backend/deployment.yaml

            sed -i 's|image: mrudul08cloud/3tier-frontend:.*|image: mrudul08cloud/3tier-frontend:${IMAGE_TAG}|g' k8s/frontend/deployment.yaml

            grep image k8s/backend/deployment.yaml
            grep image k8s/frontend/deployment.yaml
            """
        }
    }

}
