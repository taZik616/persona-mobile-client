import React, {memo} from 'react'

import {Pressable, StyleSheet, TouchableOpacity} from 'react-native'

import {Color} from 'src/themes'

import {CrossIcon} from 'ui/icons/common'
import {Spacer, Text} from 'ui/index'

interface FilterItemProps {
  icon?: JSX.Element
  name?: string
  status?: 'active' | 'passive' | 'removable'
  onPress?: (id: string) => void
  onRemove?: (id: string) => void
  id: string
}

/**
 * @param onPress - в него передается ID
 */
export const FilterItem = memo(
  ({
    icon,
    onPress,
    onRemove,
    id,
    status = 'passive',
    name,
  }: FilterItemProps) => {
    const isPassive = status === 'passive'

    return (
      <Pressable
        onPress={() => onPress?.(id)}
        style={[
          styles.container,
          {borderColor: isPassive ? Color.primaryGray : Color.primary},
        ]}>
        {icon ? (
          icon
        ) : (
          <Text color={isPassive ? Color.primaryGray : Color.primary} gp4>
            {name?.toUpperCase()}
          </Text>
        )}
        {status === 'removable' ? (
          <>
            <Spacer width={4} />
            <TouchableOpacity onPress={() => onRemove?.(id)}>
              <CrossIcon
                height={16}
                width={16}
                color={isPassive ? Color.primaryGray : Color.primary}
              />
            </TouchableOpacity>
          </>
        ) : (
          <></>
        )}
      </Pressable>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    height: 32,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 3,
    borderWidth: 1,
  },
})
