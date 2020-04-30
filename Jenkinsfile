pipeline {  
  agent { docker { image 'node:latest' } }
  
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
