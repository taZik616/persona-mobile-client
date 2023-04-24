import React from 'react'

import {SizeChart} from 'src/components/SizeChart'

export const SizeChartScreen = () => {
  return (
    <SizeChart
      headerTitle="Размер женской одежды "
      titles={[
        'Международный (INT)',
        'Италия (IT)',
        'Россия (RUS)',
        'Германия (GR)',
        'Европа (EU)',
      ]}
      data={[
        ['XXS', 'XS', 'S'],
        ['36', '38', '40'],
        ['38', '40', '42'],
        ['30', '32', '34'],
        ['34', '36', '38'],
      ]}
    />
  )
}
