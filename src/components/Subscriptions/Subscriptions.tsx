import React from 'react'

import {ScrollView, StyleSheet, View} from 'react-native'
import {Header, SafeLandscapeView, Spacer, Switch, Text} from 'ui/index'

import {selectSubs, useTypedSelector} from 'src/store'
import {Color} from 'src/themes'

interface SubscriptionsProps {
  onChangeEmailSub?: (enabled: boolean) => void
  onChangeSmsSub?: (enabled: boolean) => void
  onChangePushSub?: (enabled: boolean) => void
}

export const Subscriptions = ({
  onChangeEmailSub,
  onChangeSmsSub,
  onChangePushSub,
}: SubscriptionsProps) => {
  const subs = useTypedSelector(selectSubs)

  return (
    <>
      <Header title="Подписки" showBack hideSearch hideBasket />
      <ScrollView bounces={false}>
        <SafeLandscapeView safeArea>
          <Spacer height={20} />
          <View style={styles.itemContainer}>
            <Text style={styles.text} numberOfLines={2} gp4>
              Получать уведомления по E-mail
            </Text>
            <Spacer width={8} />
            <Switch initialValue={subs.subEmail} onChange={onChangeEmailSub} />
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.text} numberOfLines={2} gp4>
              Получать уведомления по SMS
            </Text>
            <Spacer width={8} />
            <Switch initialValue={subs.subSms} onChange={onChangeSmsSub} />
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.text} numberOfLines={2} gp4>
              Получать Push-уведомления
            </Text>
            <Spacer width={8} />
            <Switch initialValue={subs.subPush} onChange={onChangePushSub} />
          </View>
        </SafeLandscapeView>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: Color.border,
  },
  text: {
    flex: 1,
  },
})
