pipeline {  
  agent { docker { image 'node:latest' } }
  environment {
    REACT_APP_MAPBOX_API_KEY = credentials('mapbox-api-key')
  }  
  stages {
    stage('Build') {
      steps {
        withEnv(["HOME=${env.WORKSPACE}"]) {
          sh 'npm install'
        }
      }
    }
    stage('Test') {
      steps {
        withEnv(["HOME=${env.WORKSPACE}"]) {
          sh 'npm test'
        }
      }
    }
  }
}
