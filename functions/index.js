const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore()

exports.updateAveragePercentage = functions.firestore
    .document('users/{uid}/{subject}/{assignment}')
    .onWrite((change, context) => {
        let accumulator = 0;
        let counter = 0;
        let boundaries = {};
        db.collection('users').doc(context.params.uid).collection(context.params.subject).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    if(doc.id !== 'information'){
                        let data = doc.data();
                        accumulator += parseInt(data.percentage);
                        counter++;
                    } else {
                        let data = doc.data();
                        boundaries = data.boundaries;
                    }
                })

                let final = (accumulator/counter).toFixed(1);
                let finalGrade = null;

                let map=[null, 'one', 'two', 'three', 'four', 'five', 'six', 'seven'];

                for(let i = 1; i < 8; i++){
                    if(final < parseInt(boundaries[map[i]])){
                        finalGrade = i-1;
                        break;
                    }
                }

                if(finalGrade === null){
                    finalGrade = 7;
                }

                db.collection('users').doc(context.params.uid).collection(context.params.subject).doc('information').update({
                    average: final,
                    averageGrade: finalGrade
                });

                return;
            })
            .catch(error => console.log(error))
    })
