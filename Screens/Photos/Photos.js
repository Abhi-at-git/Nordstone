import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const PAGE_SIZE = 10;

export default function Photos() {
  const [photos, setPhotos] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  useEffect(() => {
    console.log("invoked fecth")
   fetchPhotos(true);
  }, []);
  // Upload photo to Firebase
  const uploadPhoto = async (photo) => {
    try {
      const { uri } = photo.assets[0];
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const storageRef = storage().ref(`photos/${filename}`);
      const task = storageRef.putFile(uri);

      task.on('state_changed', (snapshot) => {
        console.log(`Transferred: ${snapshot.bytesTransferred}`);
      });

      await task;

      // Get download URL
      const downloadURL = await storageRef.getDownloadURL();

      // Save metadata to Firestore
      await firestore().collection('photos').add({
        url: downloadURL,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      alert('Photo uploaded successfully!');
     fetchPhotos(true); // Refresh the photos list
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Failed to upload photo');
    }
  };

  // Fetch photos from Firestore
  const fetchPhotos = async (refresh = false) => {

    try {
      setLoading(refresh);
      setLoadingMore(!refresh);

      let query = firestore()
        .collection('photos')
        .orderBy('createdAt', 'desc')
        .limit(PAGE_SIZE);

      if (lastVisible && !refresh) {
        query = query.startAfter(lastVisible);
      }

      const snapshot = await query.get();
      const newPhotos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPhotos(refresh ? newPhotos : [...photos, ...newPhotos]);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);

      setLoading(false);
      setLoadingMore(false);
    } catch (error) {
      console.error('Error fetching photos:', error);
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Open Camera
  const openCamera = () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && !response.errorCode) {
        uploadPhoto(response);
      }
    });
  };

  // Open Gallery
  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && !response.errorCode) {
        uploadPhoto(response);
      }
    });
  };

  // Initial fetch


  // Render Photo Item
  const renderPhotoItem = useCallback(({ item }) => {
    return <PhotoComponent uri={item.url} />;
  }, []);

  // Load more photos
  const loadMorePhotos = () => {
    if (!loadingMore && lastVisible) {
      fetchPhotos();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Photo Uploader</Text>

      {/* Upload Options */}
      <View style={styles.uploadContainer}>
        <TouchableOpacity style={styles.button} onPress={openCamera}>
          <Text style={styles.buttonText}>Upload via Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={openGallery}>
          <Text style={styles.buttonText}>Upload via Gallery</Text>
        </TouchableOpacity>
      </View>

      {/* Photo List */}
      <FlatList
        data={photos}
        renderItem={renderPhotoItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        onEndReached={loadMorePhotos}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loadingMore ? <ActivityIndicator size="small" /> : null}
        ListEmptyComponent={!loading && <Text style={styles.emptyText}>No photos uploaded</Text>}
      />
    </View>
  );
}

const PhotoComponent = ({ uri }) => {
  return (
    <View style={styles.photoContainer}>
      <Image source={{ uri }} style={styles.photo} />
    </View>
  );
};

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
  uploadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
  photoContainer: {
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});
