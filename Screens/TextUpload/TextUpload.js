import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const PAGE_SIZE = 10;

export default function TextUpload() {
  const [text, setText] = useState('');
  const [texts, setTexts] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const docRef = firestore().collection('text')
  useEffect(() => {
    const subscriber = firestore()
      .collection('text')
      .doc("text")
      .onSnapshot(documentSnapshot => {
        console.log('User data: ', documentSnapshot.data());
      });
    return () => subscriber();
  }, [])
  // Upload text to Firestore
  const uploadText = async () => {
    if (!text.trim()) {
      alert('Please enter some text before uploading.');
      return;
    }

    console.log('Starting upload...');
    try {
      console.log('Adding document to Firestore...');
      await docRef.add({
        content: text.trim(),
      }).then(() => {
        console.log('added  added!'); setText('');
      }).catch((error) => {
        console.log('error occured', error)
      });


      // fetchTexts(true); // Refresh the text list
    } catch (error) {
      console.error('Error uploading text:', error.message);
      alert(`Failed to upload text: ${error.message}`);
    }
  };


  // Fetch texts from Firestore
  const fetchTexts = async () => {
    try {
      const snapshot = await docRef.get();
      const newTexts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTexts(newTexts);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);

    } catch (error) {
      console.error('Error fetching texts:', error.message);

    }
  };

  // Initial fetch
  // useEffect(() => {
  //   fetchTexts(true);
  // }, []);

  // Render Text Item
  const renderTextItem = useCallback(({ item }) => {
    return (
      <View style={styles.textItem}>
        <Text style={styles.textContent}>{item.content}</Text>
      </View>
    );
  }, []);

  // Load more texts
  const loadMoreTexts = () => {
    if (!loadingMore && lastVisible) {
      fetchTexts();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Text Uploader</Text>

      {/* Input and Upload Button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write something..."
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.button} onPress={
          uploadText}
        >
          <Text style={styles.buttonText}>Upload</Text>
        </TouchableOpacity>
      </View>

      {/* Text List */}
      <FlatList
        data={texts}
        renderItem={renderTextItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        onEndReached={loadMoreTexts}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loadingMore ? <ActivityIndicator size="small" /> : null}
        ListEmptyComponent={
          !loading && <Text style={styles.emptyText}>No texts uploaded</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,
  },
  textItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textContent: {
    fontSize: 16,
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});
