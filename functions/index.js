const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

exports.updateAveragePercentage = functions.firestore
    .document('users/{uid}/{subject}/{assignment}')
    .onWrite((change, context) => {
        if(context.params.assignment === 'information') return;

        let accumulator = 0;
        let counter = 0;

        functions.firestore.collection('users').doc(context.params.uid).collection(context.params.subject).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    if(doc.id !== 'information'){
                        let data = doc.data();
                        accumulator += parseInt(data.percentage);
                        counter++;
                    }
                })

                let final = (accumulator/counter).toFixed(1);

                functions.firestore.collection('users').doc(context.params.uid).collection(context.params.subject).doc('information').update({
                    average: final
                });
            })
    })
