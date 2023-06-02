import React, {memo} from 'react'

import {StyleSheet} from 'react-native'
import {WebView} from 'react-native-webview'
import {Header, Loading, SafeLandscapeView, Spacer} from 'ui/index'

import {useSizeChartQuery} from 'src/store/shopApi'

interface SizeChartProps {
  headerTitle: string
}

export const SizeChart = memo(({headerTitle}: SizeChartProps) => {
  // const dataWidthArr = useMemo(() => {
  //   const maxWidthItem = longestStringInDoubleArr(data)
  //   return data[0].map(() => maxWidthItem.length * 11 + 20)
  // }, [])
  const sizes = useSizeChartQuery({})

  return (
    <>
      <Header showBack hideBasket hideSearch title={headerTitle} />
      {sizes.isLoading && !sizes.currentData?.page ? (
        <Loading />
      ) : (
        <SafeLandscapeView style={styles.flexOne} safeArea>
          <Spacer height={16} />
          <WebView
            originWhitelist={['*']}
            source={{html: sizes.currentData.page}}
          />
          <Spacer withBottomInsets height={16} />
          {/* <ScrollView
          bounces={false}
          showsHorizontalScrollIndicator={false}
          style={styles.tableWrapper}
          horizontal>
          <Table borderStyle={styles.borders}>
            <TableWrapper style={styles.wrapper}>
              <Col
                data={titles}
                heightArr={titles.map(() => CELL_H)}
                style={styles.title}
                textStyle={styles.text}
              />
              <Rows
                data={data} // для теста-> .map(a => [...a, ...a, ...a])
                widthArr={dataWidthArr} // для теста-> [...dataWidthArr, ...dataWidthArr, ...dataWidthArr]
                style={styles.row}
                textStyle={[styles.text, styles.centerText]}
              />
            </TableWrapper>
          </Table>
        </ScrollView> */}
        </SafeLandscapeView>
      )}
    </>
  )
})

// const CELL_H = 40
const styles = StyleSheet.create({
  flexOne: {flex: 1},
  // wrapper: {flexDirection: 'row'},
  // tableWrapper: {alignSelf: 'center'},
  // title: {
  //   backgroundColor: Color.tablePrimary,
  //   zIndex: 2,
  //   maxWidth: 150,
  //   textAlign: 'left',
  // },
  // row: {
  //   height: CELL_H,
  // },
  // text: {
  //   marginHorizontal: 10,
  //   fontFamily: 'GothamPro',
  //   fontSize: 13,
  //   lineHeight: IS_IOS ? 15.4 : 16,
  //   color: Color.primaryBlack,
  //   paddingVertical: 4,
  // },
  // centerText: {
  //   textAlign: 'center',
  // },
  // borders: {borderWidth: 1, borderColor: Color.border},
})
