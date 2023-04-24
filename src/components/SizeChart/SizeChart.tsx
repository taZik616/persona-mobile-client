import React, {memo, useMemo} from 'react'

import {ScrollView, StyleSheet} from 'react-native'
import {Col, Rows, Table, TableWrapper} from 'react-native-table-component'

import {longestStringInDoubleArr} from 'src/helpers'
import {Color} from 'src/themes'

import {Header} from '../ui/Header'
import {Spacer} from '../ui/Spacer'

interface SizeChartProps {
  titles: string[]
  data: string[][]
  headerTitle: string
}

const CELL_H = 40

export const SizeChart = memo(({titles, headerTitle, data}: SizeChartProps) => {
  const dataWidthArr = useMemo(() => {
    const maxWidthItem = longestStringInDoubleArr(data)
    return data[0].map(() => maxWidthItem.length * 11 + 20)
  }, [])
  return (
    <>
      <Header
        showBack
        hideBasket
        hideSearch
        title={headerTitle}
        subtitle="таблица размеров"
      />
      <ScrollView bounces={false} nestedScrollEnabled>
        <Spacer height={16} />
        <ScrollView
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
        </ScrollView>
        <Spacer withBottomInsets height={16} />
      </ScrollView>
    </>
  )
})

const styles = StyleSheet.create({
  wrapper: {flexDirection: 'row'},
  tableWrapper: {alignSelf: 'center'},
  title: {
    backgroundColor: Color.tablePrimary,
    zIndex: 2,
    maxWidth: 150,
    textAlign: 'left',
  },
  row: {
    height: CELL_H,
  },
  text: {
    marginHorizontal: 10,
    fontFamily: 'GothamPro',
    fontSize: 13,
    lineHeight: 16,
    color: Color.primaryBlack,
    paddingVertical: 4,
  },
  centerText: {
    textAlign: 'center',
  },
  borders: {borderWidth: 1, borderColor: Color.border},
})
