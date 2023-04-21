import React from 'react'

import {Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native'

import {selectIsAuthenticated, useTypedSelector} from 'src/store'
import {Color} from 'src/themes'
import {ProductPreviewInfo} from 'src/types'

import {HomeAuth} from './HomeAuth'
import {RecentlyWatchedList} from './RecentlyWatchedList'

import {Button} from '../ui/Button'
import {Header} from '../ui/Header'
import {
  CartLightIcon,
  InfoLightIcon,
  MailLightIcon,
  ProfileLightIcon,
} from '../ui/icons/common'
import {MenuButton} from '../ui/MenuButton'
import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {Spacer} from '../ui/Spacer'
import {Text} from '../ui/Text'

export type HomeProfileProps = {
  onPressAddCard?: () => void
  onPressExit?: () => void
  onPressPersonal?: () => void
  onPressOrders?: () => void
  onPressSubscription?: () => void
  onPressHelp?: () => void
  onPressRecentlyItem?: (item: ProductPreviewInfo) => void
  onPressRecoverPassword?: () => void
}

export const HomeProfile = ({
  onPressAddCard,
  onPressExit,
  onPressPersonal,
  onPressOrders,
  onPressSubscription,
  onPressHelp,
  onPressRecentlyItem,
  onPressRecoverPassword,
}: HomeProfileProps) => {
  const isAuthenticated = useTypedSelector(selectIsAuthenticated)

  return (
    <>
      <Header hideSearch />
      {isAuthenticated ? (
        <ScrollView nestedScrollEnabled>
          <Spacer height={20} />
          <SafeLandscapeView safeArea>
            <TouchableOpacity
              onPress={onPressAddCard}
              style={styles.addCardContainer}>
              <Image
                style={styles.personaCardImage}
                source={{
                  uri: 'https://vadim-backet.s3.eu-central-1.amazonaws.com/PersonaCard.png',
                }}
              />
              <Spacer width={12} />
              <Text numberOfLines={1} gp4>
                Добавить карту лояльности
              </Text>
            </TouchableOpacity>
            <Spacer height={32} />
            <MenuButton
              onPress={onPressPersonal}
              leftIcon={<ProfileLightIcon />}
              title="Личные данные"
            />
            <MenuButton
              onPress={onPressOrders}
              leftIcon={<CartLightIcon />}
              title="Ваши заказы"
            />
            <MenuButton
              onPress={onPressSubscription}
              leftIcon={<MailLightIcon />}
              title="Управление подписками"
            />
            <MenuButton
              onPress={onPressHelp}
              leftIcon={<InfoLightIcon />}
              title="Помощь"
            />
            <Spacer height={20} />
          </SafeLandscapeView>
          <RecentlyWatchedList onPressItem={onPressRecentlyItem} />
          <SafeLandscapeView>
            <Spacer height={16} />
            <Button variant="secondaryFilled" onPress={onPressExit}>
              Выход
            </Button>
            <Spacer height={20} />
          </SafeLandscapeView>
        </ScrollView>
      ) : (
        <HomeAuth
          onPressRecoverPassword={onPressRecoverPassword}
          onPressHelp={onPressHelp}
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  addCardContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: Color.primaryGray,
    borderRadius: 8,
  },
  personaCardImage: {
    width: 55,
    height: 33,
    borderRadius: 4,
  },
})
