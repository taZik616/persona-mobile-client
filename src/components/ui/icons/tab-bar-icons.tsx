import React from 'react'

import Svg, {G, Path, SvgProps} from 'react-native-svg'

export const tabBarIcons = [
  // Main (home icon)
  ({color = '#14142B', ...props}: SvgProps) => (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fill={color}
        d="M2 9.88a3 3 0 0 1 1.221-2.416L12 1l8.779 6.464A3 3 0 0 1 22 9.88V20.5a2.5 2.5 0 0 1-2.5 2.5H16a1 1 0 0 1-1-1v-6a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0-.5.5v6a1 1 0 0 1-1 1H4.5A2.5 2.5 0 0 1 2 20.5V9.88Z"
      />
    </Svg>
  ),
  // New products icon
  ({color = '#14142B', ...props}: SvgProps) => (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <G stroke={color} strokeWidth={2} clipPath="url(#a)">
        <Path d="M10.201 2.793a2.977 2.977 0 0 1 4.598 0c.63.766 1.6 1.167 2.586 1.071a2.977 2.977 0 0 1 3.25 3.251 2.977 2.977 0 0 0 1.072 2.586 2.977 2.977 0 0 1 0 4.598 2.977 2.977 0 0 0-1.071 2.586 2.977 2.977 0 0 1-3.251 3.25 2.977 2.977 0 0 0-2.586 1.072 2.977 2.977 0 0 1-4.598 0 2.977 2.977 0 0 0-2.586-1.071 2.977 2.977 0 0 1-3.25-3.251 2.977 2.977 0 0 0-1.072-2.586 2.977 2.977 0 0 1 0-4.598 2.977 2.977 0 0 0 1.071-2.586 2.977 2.977 0 0 1 3.251-3.25 2.977 2.977 0 0 0 2.586-1.072Z" />
        <Path strokeLinecap="round" d="m9.5 11.95 2.121 2.121 4.243-4.243" />
      </G>
    </Svg>
  ),
  // Brands (grid icon)
  ({color = '#14142B', ...props}: SvgProps) => (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        stroke={color}
        strokeWidth={2}
        d="M1 2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2ZM13 2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V2ZM1 15a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-6ZM13 15a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-6Z"
      />
    </Svg>
  ),
  // Catalog (stack icon)
  ({color = '#14142B', ...props}: SvgProps) => (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m1 17 11 5 11-5M1 11.5l11 5 11-5M12 2l11 4-11 5L1 6l11-4Z"
      />
    </Svg>
  ),
  // Favorites (heart icon)
  ({color = '#14142B', ...props}: SvgProps) => (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3.022 3.772a6.05 6.05 0 0 0 0 8.557l9.165 9.165.063-.063.063.063 9.165-9.165a6.05 6.05 0 1 0-8.557-8.557l-.317.318a.5.5 0 0 1-.707 0l-.318-.318a6.05 6.05 0 0 0-8.557 0Z"
      />
    </Svg>
  ),
  // Profile (person icon)
  ({color = '#14142B', ...props}: SvgProps) => (
    <Svg width={24} height={24} fill="none" {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18.95 17.38c-1.572-.813-4.165-1.88-6.95-1.88s-5.378 1.067-6.95 1.88c-1.016.525-1.627 1.555-1.762 2.69L3 22.5h18l-.288-2.43c-.135-1.135-.746-2.165-1.761-2.69ZM12 11a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"
      />
    </Svg>
  ),
]
