import React from 'react'

import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import {
  selectDiscountCardInfo,
  selectIsAuthenticated,
  useTypedSelector,
} from 'src/store'
import {Color} from 'src/themes'
import {ProductPreviewInfo} from 'src/types'

import {
  CartLightIcon,
  InfoLightIcon,
  MailLightIcon,
  ProfileLightIcon,
} from 'ui/icons/common'
import {
  Button,
  Header,
  MenuButton,
  SafeLandscapeView,
  Spacer,
  Text,
} from 'ui/index'

import {HomeAuth} from './HomeAuth'
import {RecentlyWatchedList} from './RecentlyWatchedList'

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
  const discountCard = useTypedSelector(selectDiscountCardInfo)
  return (
    <>
      <Header hideSearch />
      {isAuthenticated ? (
        <ScrollView nestedScrollEnabled>
          <Spacer height={20} />
          <SafeLandscapeView safeArea>
            {/* <TouchableOpacity
              onPress={onPressAddCard}
              style={styles.addCardContainer}>
              <Image
                style={styles.personaCardImage}
                source={{
                  uri: 'http://89.108.71.146:2006/media/another-images/PersonaCard.jpg',
                }}
              />
              <Spacer width={12} />
              <Text numberOfLines={1} gp4>
                Добавить карту лояльности
              </Text>
            </TouchableOpacity> */}
            {discountCard ? (
              <View style={styles.discountCardInfoBlock}>
                <Text>
                  <Text gp4>Личная скидка: </Text>
                  <Text color={Color.primary} gp4>
                    {discountCard.cardLevel.discountPercent}%
                  </Text>
                </Text>
                <Text>
                  <Text gp4>Уровень покупок: </Text>
                  <Text color={Color.primary} gp4>
                    {discountCard.cardLevel.level}
                  </Text>
                </Text>
              </View>
            ) : (
              <></>
            )}

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
  discountCardInfoBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
