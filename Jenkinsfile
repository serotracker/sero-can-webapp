pipeline {  
  agent { docker { image 'node:latest' } }
  
  stages {
    stage('Build') {
      steps {
        withEnv(["HOME=${env.WORKSPACE}"]) {
          sh 'cd react-app'
          sh 'npm install'  
        }
      }
    }
  }
}
