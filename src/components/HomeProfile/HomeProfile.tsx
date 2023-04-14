import React from 'react'

import {Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native'

import {selectIsAuthenticated, useTypedSelector} from 'src/store'
import {Color} from 'src/themes'

import {HomeAuth} from './HomeAuth'

import {Button} from '../ui/Button'
import {Header} from '../ui/Header'
import {
  CartLightIcon,
  InfoLightIcon,
  MailLightIcon,
  ProfileLightIcon,
} from '../ui/icons/common'
import {MenuButton} from '../ui/MenuButton'
import {RenderHorizontalList} from '../ui/RenderHorizontalList'
import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {Spacer} from '../ui/Spacer'
import {Text} from '../ui/Text'

export type HomeProfileProps = {
  onPressAddCard?: () => void
  onPressExit?: () => void
  onPressPersonal?: () => void
  onPressOrders?: () => void
  onPressSubscription?: () => void
  onPressInfo?: () => void
  onPressRecentlyItem?: () => void
}

export const HomeProfile = ({
  onPressAddCard,
  onPressExit,
  onPressPersonal,
  onPressOrders,
  onPressSubscription,
  onPressInfo,
  onPressRecentlyItem,
}: HomeProfileProps) => {
  const isAuthenticated = useTypedSelector(selectIsAuthenticated)

  return (
    <>
      <Header hideSearch />
      {isAuthenticated ? (
        <ScrollView>
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
              onPress={onPressInfo}
              leftIcon={<InfoLightIcon />}
              title="Помощь"
            />
            <Spacer height={38} />
            <Text center cg2>
              ПРОСМОТРЕННЫЕ ТОВАРЫ
            </Text>
            <Spacer height={14} />
          </SafeLandscapeView>
          <RenderHorizontalList
            onPressItem={onPressRecentlyItem}
            data={[
              {
                uri: 'https://alamode.ru/image/cache/catalog/Tovari/JAKETY/sn_247-950x950.png',
                id: '1',
                logoUri: 'http://89.108.71.146:8000/CAT_logo/585/AGNONA.png',
              },
              {
                uri: 'https://nikawatches.ru/upload/iblock/c6d/c6d4e99236dece8523a353c59c76b506.png',
                id: '2',
                logoUri:
                  'http://89.108.71.146:8000/CAT_logo/587/lo234234234go.jpg',
              },
              {
                uri: 'https://static.tildacdn.com/tild6138-3330-4364-b631-393730333636/923.png',
                id: '3',
                logoUri:
                  'http://89.108.71.146:8000/CAT_logo/540/aL324234tER.png',
              },
            ]}
          />
          <SafeLandscapeView>
            <Spacer height={16} />
            <Button variant="secondaryFilled" onPress={onPressExit}>
              Выход
            </Button>
          </SafeLandscapeView>
        </ScrollView>
      ) : (
        <HomeAuth />
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
