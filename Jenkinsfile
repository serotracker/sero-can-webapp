pipeline {  
  agent { docker { image 'node:latest' } }
  
  stages {
    stage('Build') {
      steps {
        sh 'cd react-app'
        sh 'npm install'  
      }
    }
  }
}
