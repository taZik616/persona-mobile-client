import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import {BottomSheet, BottomSheetRefType} from 'components/bottom-sheet'
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native'
import {CrossIcon, HangerIcon} from 'ui/icons/common'
import {
  Button,
  SafeLandscapeView,
  Spacer,
  WheelPicker,
  WheelPickerRefType,
} from 'ui/index'

import {useTypedNavigation} from 'src/hooks'
import {vibration} from 'src/services/vibration'
import {Color} from 'src/themes'
import {ProductVariant} from 'src/types'

interface SizeSelectorProps {
  variants: ProductVariant[]
  onSelectionComplete?: (variant: ProductVariant) => void
}

export interface ProductVariantSelectorRefType {
  open?: () => void
  close?: () => void
}

type PageType = 'sizes' | 'colors'

export const ProductVariantSelector = memo(
  forwardRef<ProductVariantSelectorRefType, SizeSelectorProps>(
    ({onSelectionComplete, variants}, ref) => {
      const bottomSheetRef = useRef<BottomSheetRefType>(null)
      const [page, setPage] = useState<PageType>('sizes')

      const {navigate} = useTypedNavigation()

      const onPressRight = useCallback(() => {
        navigate('sizeChart')
      }, [])

      useImperativeHandle(ref, () => ({
        open: bottomSheetRef.current?.open,
        close: bottomSheetRef.current?.close,
      }))

      const onClose = useCallback(() => setPage('sizes'), [])

      return (
        <BottomSheet
          onPressRight={onPressRight}
          rightIcon={<HangerIcon />}
          title={page === 'sizes' ? 'ВАШ РАЗМЕР' : 'ЦВЕТ'}
          closeDistance={60}
          showClose
          onClose={onClose}
          ref={bottomSheetRef}>
          <ContentView
            setPage={setPage}
            page={page}
            variants={variants}
            onContinue={onSelectionComplete}
          />
        </BottomSheet>
      )
    },
  ),
)

interface ContentViewProps {
  onContinue?: (variant: ProductVariant) => void
  variants: ProductVariant[]
  page: PageType
  setPage: React.Dispatch<React.SetStateAction<PageType>>
}

const ContentView = memo(
  ({onContinue, variants, page, setPage}: ContentViewProps) => {
    const wheelPickerRef = useRef<WheelPickerRefType>(null)
    const colorVariants = useRef<ProductVariant[]>([])
    const [variant, setVariant] = useState<ProductVariant | undefined>(
      undefined,
    )

    const sizes = [
      ...new Set(
        variants
          .filter(el =>
            variants.filter(a => a.size === el.size).some(a => a.isAvailable),
          )
          .map(a => a.size),
      ),
    ]

    const goColorSelect = () => {
      const selectedSize =
        wheelPickerRef.current?.getSelected().label ?? sizes[0]

      colorVariants.current = variants.filter(a => a.size === selectedSize)
      if (colorVariants.current.length === 1) {
        onContinue?.(colorVariants.current[0])
      } else {
        setPage('colors')
      }
    }

    useEffect(() => {
      if (variants.length === 1) {
        onContinue?.(variants[0])
      } else if (sizes.length === 1) {
        goColorSelect()
      }
    }, [])

    return (
      <SafeLandscapeView>
        {page === 'sizes' ? (
          <View style={styles.flexOne}>
            <Spacer height={16} />
            <WheelPicker
              ref={wheelPickerRef}
              values={sizes.map((label, id) => ({label, value: id}))}
            />
            <Spacer height={16} />
            <Button onPress={goColorSelect} gp5>
              Продолжить
            </Button>
            <Spacer withBottomInsets height={56} />
          </View>
        ) : (
          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => {
                const isSelected = variant?.uniqueId === item.uniqueId
                const onPress = () => {
                  if (!isSelected) {
                    vibration.selection()
                    setVariant(item)
                  }
                }
                const {isAvailable} = item
                return (
                  <TouchableOpacity
                    style={styles.colorRectContainer}
                    disabled={!isAvailable}
                    onPress={onPress}>
                    {isSelected ? (
                      <View style={styles.colorSelectionBorders} />
                    ) : (
                      <></>
                    )}
                    {!isAvailable ? (
                      <CrossIcon
                        width={40}
                        height={40}
                        style={styles.cross}
                        color={Color.textRed1}
                      />
                    ) : (
                      <></>
                    )}
                    <View
                      style={[
                        styles.colorRect,
                        {backgroundColor: item.colorHex},
                        !isAvailable && styles.disabled,
                      ]}
                    />
                  </TouchableOpacity>
                )
              }}
              keyExtractor={a => a.colorHex}
              data={colorVariants.current}
            />
            <Spacer height={16} />
            <Button
              disabled={!variant}
              onPress={() => variant && onContinue?.(variant)}
              gp5>
              Завершить
            </Button>
            <Spacer withBottomInsets height={56} />
          </View>
        )}
      </SafeLandscapeView>
    )
  },
)

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  colorSelectionBorders: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: Color.primary,
  },
  cross: {
    position: 'absolute',
    zIndex: 1,
  },
  disabled: {
    opacity: 0.3,
  },
  colorRectContainer: {
    height: 48,
    width: 48,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorRect: {
    height: 40,
    width: 40,
  },
})
