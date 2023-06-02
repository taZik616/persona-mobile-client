import React from 'react'

import {SafeLandscapeView} from 'ui/SafeLandscapeView'

export function withHorizontalMargins<TProps>(
  Component: React.JSXElementConstructor<TProps>,
  safeArea = true,
) {
  return function (props: TProps) {
    return (
      <SafeLandscapeView safeArea={safeArea} type="margin">
        <Component {...props} />
      </SafeLandscapeView>
    )
  }
}
