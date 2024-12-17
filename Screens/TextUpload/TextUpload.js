/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
const TextUpload = () => {
    const [textTobeUploaded, setTextTobeUploaded] = useState('');
    const [textArray, setTextArray] = useState();
    const ref = firestore().collection('uploadedText');
    //   async function uploadTextToFirebase(TextObject: object) {
    //     await addDoc(collection(FIREBASE_DB, 'NordstoneData'), TextObject).then(
    //       () => {
    //         setTextTobeUploaded(() => {
    //           return '';
    //         });
    //       },
    //     );
    //   }
    //   useFocusEffect(
    //     useCallback(() => {
    //       const unsub = onSnapshot(
    //         collection(FIREBASE_DB, 'NordstoneData'),
    //         snapshot => {
    //           let TempArray = [];
    //           snapshot.docChanges().forEach(change => {
    //             console.log(change.doc.data());
    //             TempArray.push(change.doc.data());
    //           });
    //           setTextArray(TempArray);
    //         },
    //       );
    //       setInterval(function () {
    //         unsub();
    //       }, 3000);
    //     }, []),
    //   );
    // function getUploadedText() {
    //   const unsub = onSnapshot(
    //     doc(FIREBASE_DB, 'NordstoneData', 'UploadedText'),
    //     value => {
    //       console.log(value);
    //     },
    //   );
    // }
    // useEffect(() => {
    //   getUploadedText();
    // }, []);
    useEffect(() => {
        return ref.onSnapshot(querySnapshot => {
            const list = [];
            querySnapshot.forEach(doc => {
                const { title, complete } = doc.data();
                list.push({
                    text
                });
            });
            setTextArray(list);

           
        });
    }, []);
    return (
        <View style={{ padding: 20 }}>
            <TextInput
                style={{
                    height: 100,
                    width: '100%',
                    borderRadius: 10,
                    borderWidth: 3,
                    borderColor: 'grey',
                    color: 'black',
                    textAlign: 'right',
                    textAlignVertical: 'bottom',
                    fontSize: 20,
                    marginVertical: 20,
                    paddingHorizontal: 10,
                }}
                editable={true}
                onChangeText={value => {
                    setTextTobeUploaded(() => {
                        return value;
                    });
                }}
                value={textTobeUploaded}
            />
            <TouchableOpacity
                style={{
                    height: 40,
                    width: '100%',
                    backgroundColor: 'blue',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 6,
                    marginBottom: 20,
                }}
                onPress={async () => {
                    await ref.add({
                        text: textTobeUploaded
                    });
                }}>
                <Text style={{ color: "white", fontSize: 16 }}>
                    Tap to Upload
                </Text>
            </TouchableOpacity>
            <Text style={{ color: "black", fontSize: 16 }}>
                Uploaded Text
            </Text>
            <GestureHandlerRootView>
                <ScrollView>
                    {textArray?.map((item, index) => (
                        <View
                            style={{
                                width: '100%',
                                borderRadius: 10,
                                backgroundColor: 'white',
                                marginVertical: 10,
                                padding: 10,
                                borderWidth: 2,
                            }}>
                            <Text style={{ color: 'black' }}>{item?.Text}</Text>
                        </View>
                    ))}
                </ScrollView>
            </GestureHandlerRootView>
        </View>
    );
};

export default TextUpload;