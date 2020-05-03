pipeline {  
  agent { docker { image 'node:latest' } }
  environment {
    REACT_APP_MAPBOX_API_KEY = credentials('mapbox-api-key')
  }  
  stages {
    stage('Build') {
      steps {
        withEnv(["HOME=${env.WORKSPACE}"]) { 
          dir('react-app') {
            sh 'npm install'
            sh 'npm start'
          }
        }
      }
    }
  }
}
