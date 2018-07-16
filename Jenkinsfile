node('node') {
    currentBuild.result = "SUCCESS"
    try {
       stage('Checkout'){
          checkout scm
       }
       stage('Test'){
         sh 'node -v'
         sh 'npm install'

       }
    }
    catch (err) {
        currentBuild.result = "FAILURE"
        throw err
    }
}