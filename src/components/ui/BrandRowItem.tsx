import React, {memo} from 'react'

import {Pressable} from 'react-native'
import {StyleSheet} from 'react-native'
import {CheckIcon} from 'ui/icons/common'
import {SafeLandscapeView, Spacer, Text} from 'ui/index'

import {Color} from 'src/themes'
import {BrandType} from 'src/types'

interface BrandRowItemProps extends BrandType {
  isLoading?: boolean
  isSelected?: boolean
  onPress?: (brand: BrandType) => void
}

export const BrandRowItem = memo(
  ({isLoading, onPress, isSelected, ...brand}: BrandRowItemProps) => {
    return (
      <SafeLandscapeView safeArea>
        <Pressable
          onPress={() => !isLoading && onPress?.(brand)}
          style={styles.brandItemContainer}>
          <Text numberOfLines={1} gp4>
            {brand.name}
          </Text>
          <Spacer />
          {isSelected ? <CheckIcon /> : <></>}
        </Pressable>
      </SafeLandscapeView>
    )
  },
)

const styles = StyleSheet.create({
  brandItemContainer: {
    paddingBottom: 12,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: Color.border,
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
})
