import notifee from '@notifee/react-native'

import {Color} from 'src/themes'

export const notifications = {
  show: async (title: string, body: string, subtitle?: string) => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    })

    // Display a notification
    await notifee.displayNotification({
      title,
      subtitle,
      body,
      android: {
        channelId,
        color: Color.primaryBlack,
        smallIcon: 'ic_notifee', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
      ios: {
        attachments: [
          {
            url: 'https://vadim-backet.s3.eu-central-1.amazonaws.com/catalog_3_men.jpg',
          },
        ],
      },
    })
  },
}
