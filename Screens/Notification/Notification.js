import React from "react";
import { TouchableOpacity, View } from "react-native";
import notifee from '@notifee/react-native';


export const Notification = () => {
    async function onDisplayNotification() {
        // Request permissions (required for iOS)
        await notifee.requestPermission()

        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        // Display a notification
        await notifee.displayNotification({
            title: 'Notification Title',
            body: 'Main body content of the notification',
            android: {
                channelId,
                smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
                // pressAction is needed if you want the notification to open the app when pressed
                pressAction: {
                    id: 'default',
                },
            },
        });
    }

    return (
        <View
          style={{
            padding: 16,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '50%',
          }}>
          <TouchableOpacity
            style={{
              height: 200,
              width: 200,
              backgroundColor: 'red',
              borderRadius: 100,
            }}
            onPress={onDisplayNotification}
          />
        </View>
      );
}