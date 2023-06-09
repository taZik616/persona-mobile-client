import React, {memo, useCallback, useState} from 'react'

import {StyleSheet, TouchableOpacity, View} from 'react-native'

import {useTypedNavigation} from 'src/hooks'
import {selectBasketCounter, useTypedSelector} from 'src/store'
import {Color} from 'src/themes'

import {BackArrowIcon} from 'ui/icons/common'
import {Logo} from 'ui/icons/logo'
import {
  HeaderSearching,
  IconWithCounterBadge,
  SafeLandscapeView,
  Spacer,
  Text,
} from 'ui/index'

interface HeaderProps {
  onPressSearch?: () => void
  onPressBack?: () => void
  onPressBasket?: () => void
  showBack?: boolean
  hideBasket?: boolean
  hideSearch?: boolean
  hideLogo?: boolean
  title?: string
  subtitle?: string
  withoutSafeAreaTop?: boolean
  rightText?: string
  rightTextDisabled?: boolean
  onPressRightText?: () => void
  onSearchSubmit?: (text: string) => void
}

export const Header = memo(
  ({
    onPressSearch,
    onPressBack,
    onPressBasket,
    showBack,
    hideBasket,
    hideSearch,
    hideLogo,
    title,
    subtitle,
    withoutSafeAreaTop,
    rightText,
    rightTextDisabled,
    onPressRightText,
    onSearchSubmit,
  }: HeaderProps) => {
    const {goBack, navigate} = useTypedNavigation()
    const [isSearching, setIsSearching] = useState(false)

    const handleSearchSubmit = useCallback(
      (text: string) => {
        setIsSearching(false)
        if (onSearchSubmit) {
          onSearchSubmit(text)
        } else {
          navigate('allProducts', {
            hideGenderSelect: true,
            genderIgnore: true,
            search: text,
            showFilter: true,
          })
        }
      },
      [onSearchSubmit],
    )

    const onSearchCancel = useCallback(() => setIsSearching(false), [])

    return (
      <View style={styles.container}>
        <Spacer withTopInsets={!withoutSafeAreaTop} height={0} />
        {!isSearching ? (
          <SafeLandscapeView>
            <View style={styles.rowContainer}>
              <>
                <View style={styles.flexOne}>
                  {showBack && (
                    <TouchableOpacity
                      onPress={onPressBack ? onPressBack : goBack}
                      activeOpacity={0.5}>
                      <BackArrowIcon />
                    </TouchableOpacity>
                  )}
                </View>
                {title ? (
                  <View style={styles.textContainer}>
                    <Text center gp3>
                      {title}
                    </Text>
                    {subtitle && (
                      <>
                        <Spacer height={6} />
                        <Text center color={Color.primaryGray} gp4>
                          {subtitle}
                        </Text>
                      </>
                    )}
                  </View>
                ) : !hideLogo ? (
                  <View style={styles.logoContainer}>
                    <Logo />
                  </View>
                ) : (
                  <></>
                )}
                <View style={styles.flexOne}>
                  <View style={styles.rightButtons}>
                    {rightText ? (
                      <TouchableOpacity
                        activeOpacity={rightTextDisabled ? 1 : undefined}
                        onPress={
                          rightTextDisabled ? undefined : onPressRightText
                        }>
                        <Text
                          gp4
                          color={
                            rightTextDisabled
                              ? Color.primaryGray
                              : Color.primary
                          }>
                          {rightText}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <>
                        {!hideSearch && (
                          <TouchableOpacity
                            onPress={
                              onPressSearch
                                ? onPressSearch
                                : () => setIsSearching(true)
                            }
                            activeOpacity={0.5}>
                            <IconWithCounterBadge iconName="search" />
                          </TouchableOpacity>
                        )}
                        {!hideBasket && (
                          <BasketBtn onPressBasket={onPressBasket} />
                        )}
                      </>
                    )}
                  </View>
                </View>
              </>
            </View>
          </SafeLandscapeView>
        ) : (
          <SafeLandscapeView safeArea>
            <HeaderSearching
              onCancel={onSearchCancel}
              onSubmit={handleSearchSubmit}
            />
          </SafeLandscapeView>
        )}
      </View>
    )
  },
)
interface BasketBtnProps {
  onPressBasket?: () => void
}

const BasketBtn = memo(({onPressBasket}: BasketBtnProps) => {
  const {navigate} = useTypedNavigation()
  const basketCount = useTypedSelector(selectBasketCounter)

  const handlePressBasket = () => {
    if (onPressBasket) {
      onPressBasket()
    } else {
      navigate('basket')
    }
  }
  return (
    <>
      <Spacer width={8} />
      <TouchableOpacity onPress={handlePressBasket} activeOpacity={0.5}>
        <IconWithCounterBadge
          iconName="shopping-bag"
          badgeCount={basketCount}
        />
      </TouchableOpacity>
    </>
  )
})

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingBottom: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 40,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    flex: 1,
  },
  rightButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  flexOne: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    alignSelf: 'center',
  },
})
