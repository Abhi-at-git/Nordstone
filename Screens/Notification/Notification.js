import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, Text, Alert } from 'react-native';
import notifee, { EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Create a notification channel (for Android)
    async function createChannel() {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: notifee.AndroidImportance.HIGH, // High priority notifications
      });
    }

    createChannel();
    loadNotifications(); // Load notifications initially from Firestore

    // Set up notification listeners
    const unsubscribeForegroundEvent = notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.DISMISSED || type === EventType.PRESS) {
        console.log('Notification interacted with', detail.notification);
        loadNotifications(); // Refresh notifications when a notification is dismissed or pressed
      }
    });

    const unsubscribeMessage = messaging().onMessage(async remoteMessage => {
      console.log('Foreground message received:', remoteMessage);
      loadNotifications(); // Refresh notifications when a message is received
    });

    // Cleanup listeners on component unmount
    return () => {
      unsubscribeForegroundEvent();
      unsubscribeMessage();
    };
  }, []);

  // Load notifications from Firestore
  const loadNotifications = async () => {
    try {
      const snapshot = await firestore()
        .collection('notifications')
        .orderBy('timestamp', 'desc')
        .get();

      const fetchedNotifications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNotifications(fetchedNotifications);
    } catch (error) {
      console.error('Error fetching notifications from Firestore:', error);
    }
  };

  // Save notification to Firestore
  const saveNotification = async (notification) => {
    try {
      await firestore().collection('notifications').add({
        ...notification,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });

      loadNotifications(); // Automatically load notifications after saving
    } catch (error) {
      console.error('Error saving notification to Firestore:', error);
    }
  };

  // Send and display notification
  const sendNotification = async () => {
    const notification = {
      title: 'Notification Title',
      body: 'You pressed the big red button!',
    };

    try {
      // Display the notification using notifee
      await notifee.displayNotification({
        title: notification.title,
        body: notification.body,
        android: {
          channelId: 'default',
          smallIcon: 'ic_launcher', // Use your app's launcher icon for Android
        },
      });

      console.log('Notification displayed.');

      // Save the notification to Firestore
      await saveNotification(notification);

      Alert.alert('Notification Sent', 'The notification has been sent and saved.');
    } catch (error) {
      console.error('Error displaying notification:', error);
      Alert.alert('Error', 'An error occurred while sending the notification.');
    }
  };

  // Render each notification item
  const renderNotification = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
      <Text>{item.body}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <Button title="Big Red Button" color="red" onPress={sendNotification} />
      </View>

      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Notification;
