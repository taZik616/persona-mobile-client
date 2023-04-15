import React, {memo} from 'react'

import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {Color} from 'src/themes'

import {BackArrowIcon} from './icons/common'
import {Logo} from './icons/logo'
import {IconWithCounterBadge} from './IconWithCounterBadge'
import {Spacer} from './Spacer'
import {Text} from './Text'

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
  }: HeaderProps) => {
    const {top} = useSafeAreaInsets()

    return (
      <View style={styles.container}>
        <Spacer height={withoutSafeAreaTop ? 0 : top} />
        <View style={styles.rowContainer}>
          <View style={styles.flexOne}>
            {showBack && (
              <TouchableOpacity onPress={onPressBack} activeOpacity={0.5}>
                <BackArrowIcon />
              </TouchableOpacity>
            )}
          </View>
          {title ? (
            <View style={styles.textContainer}>
              <Text gp3>{title}</Text>
              <Spacer height={6} />
              {subtitle && (
                <Text center color={Color.primaryGray} gp4>
                  {subtitle}
                </Text>
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
                  onPress={rightTextDisabled ? undefined : onPressRightText}>
                  <Text
                    gp4
                    color={
                      rightTextDisabled ? Color.primaryGray : Color.primary
                    }>
                    {rightText}
                  </Text>
                </TouchableOpacity>
              ) : (
                <>
                  {!hideSearch && (
                    <TouchableOpacity
                      onPress={onPressSearch}
                      activeOpacity={0.5}>
                      <IconWithCounterBadge iconName="search" />
                    </TouchableOpacity>
                  )}
                  {!hideBasket && (
                    <>
                      <Spacer width={8} />
                      <TouchableOpacity
                        onPress={onPressBasket}
                        activeOpacity={0.5}>
                        <IconWithCounterBadge
                          iconName="shopping-bag"
                          badgeCount={5}
                        />
                      </TouchableOpacity>
                    </>
                  )}
                </>
              )}
            </View>
          </View>
        </View>
      </View>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 37,
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
