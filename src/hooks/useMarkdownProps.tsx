/* eslint-disable react-native/no-unused-styles */
import React, {useMemo} from 'react'

// @ts-ignore
import blockEmbedPlugin from 'markdown-it-block-embed'
import {StyleProp, StyleSheet, TextStyle} from 'react-native'
import {MarkdownIt, RenderRules} from 'react-native-markdown-display'
import {ms, mvs, s, vs} from 'react-native-size-matters'

import {Color} from 'src/themes'

import {Img} from 'ui/index'

const markdownItInstance = MarkdownIt({typographer: true, breaks: true}).use(
  blockEmbedPlugin,
  {
    containerClassName: 'video-embed',
  },
)

const factor = 0.3
const bodyText = {
  fontSize: ms(13, factor),
  fontFamily: 'GothamPro',
  lineHeight: ms(18, factor),
}

export const useMarkdownProps = (ImageWidthCoefficient?: number) => {
  const props = useMemo(
    () => getMarkdownStyle(ImageWidthCoefficient),
    [ImageWidthCoefficient],
  )
  return {...props, markdownit: markdownItInstance}
}

export const getMarkdownStyle = (IMGwPercent?: number) => {
  const paragraph: StyleProp<TextStyle> = {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    ...bodyText,
    color: Color.primaryBlack,

    letterSpacing: ms(0.2, factor),
  }
  const style = StyleSheet.create({
    body: {},
    // Headings
    heading1: {
      flexDirection: 'row',
      fontFamily: 'CormorantGaramond-SemiBold',
      fontSize: ms(20, factor),
      marginTop: vs(10),
      marginBottom: vs(10),
      color: Color.primaryBlack,
    },
    heading2: {
      flexDirection: 'row',
      fontFamily: 'GothamPro-Medium',
      color: Color.primaryBlack,
      fontSize: ms(15, factor),
      lineHeight: ms(22, factor),
      marginTop: vs(8),
      marginBottom: vs(2),
    },
    heading3: {
      flexDirection: 'row',
      fontFamily: 'GothamPro-Medium',
      color: Color.primaryBlack,
      fontSize: ms(13, factor),
      lineHeight: ms(20, factor),
      marginTop: vs(6),
      marginBottom: vs(6),
    },
    heading4: {
      flexDirection: 'row',
      fontFamily: 'GothamPro',
      color: Color.primaryBlack,
      fontSize: ms(15, factor),
      lineHeight: ms(22, factor),
      alignSelf: 'center',
      textAlign: 'center',
      marginTop: vs(10),
      marginBottom: vs(10),
    },
    heading5: {
      flexDirection: 'row',
      fontFamily: 'GothamPro-Medium',
      color: Color.primaryBlack,
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: ms(15, factor),
      lineHeight: ms(24, factor),
      marginTop: vs(2),
      marginBottom: vs(2),
    },
    heading6: {
      flexDirection: 'row',
      fontFamily: 'GothamPro',
      color: Color.primaryBlack,
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: ms(13, factor),
      lineHeight: ms(20, factor),
      marginTop: vs(2),
      marginBottom: vs(2),
    },

    // Text Output
    text: {},
    textgroup: {},
    paragraph: {
      ...paragraph,
    },
    hardbreak: {},
    softbreak: {},

    // Emphasis
    strong: {
      fontFamily: 'GothamPro-Medium',
    },
    em: {
      fontFamily: 'GothamPro-Italic',
    },
    // не знаю что это
    s: {
      textDecorationLine: 'line-through',
    },
    hr: {
      height: 1,
      width: '100%',
      backgroundColor: Color.border,
      marginTop: 24,
      marginBottom: 12,
    },
    // Links
    link: {
      textDecorationLine: 'underline',
      color: Color.primary,
      fontFamily: 'GothamPro',
    },
    blocklink: {
      flex: 1,
      borderColor: Color.border,
      borderBottomWidth: 1,
    },
    // Blockquotes
    blockquote: {
      backgroundColor: Color.bg,
      borderColor: Color.border,
      borderLeftWidth: s(1),
      paddingLeft: ms(10, factor),
      paddingBottom: vs(4),
    },
    // Code
    code_inline: {
      // `code`
      backgroundColor: Color.switchBg,
    },
    code_block: {
      backgroundColor: Color.switchBg,
      paddingVertical: s(10),
      paddingHorizontal: s(5),
      borderRadius: s(5),
    },
    fence: {
      // ```code```
      backgroundColor: Color.switchBg,
      paddingVertical: s(10),
      paddingHorizontal: s(5),
      borderRadius: s(10),
    },
    list_item: {
      ...paragraph,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginBottom: mvs(10, factor),
    },
    // Images
    image: {},
    // Tables
    table: {
      color: Color.primaryBlack,
      borderWidth: 0,
      borderColor: Color.border,
    },
    thead: {
      fontFamily: 'GothamPro',
      color: Color.primaryBlack,
      fontSize: ms(15, factor),
      lineHeight: ms(22, factor),
      flex: 1,
      borderColor: Color.transparent,
      borderWidth: 0,
    },
    tbody: {
      fontFamily: 'GothamPro',
      color: Color.primaryBlack,
      fontSize: ms(15, factor),
      lineHeight: ms(22, factor),
      flex: 1,
      borderColor: Color.transparent,
      borderWidth: 0,
    },
    th: {
      flex: 1,
      padding: s(5),
      borderColor: Color.transparent,
      borderWidth: 0,
    },
    tr: {
      flexDirection: 'row',
      borderColor: Color.transparent,
      borderWidth: 0,
    },
    td: {
      flex: 1,
      padding: s(5),
      borderColor: Color.transparent,
      borderWidth: 0,
    },
  })
  const rules: RenderRules = {
    // video: (node, children, parent, styles) => {
    //   const {videoID, serviceName} = (node as any).sourceInfo;
    //   switch (serviceName) {
    //     case 'youtube':
    //       return (
    //         <YouTubePlayer
    //           widthCoefficient={YTwPercent}
    //           key={node.key}
    //           videoId={videoID}
    //         />
    //       );
    //     default:
    //       return <></>;
    //   }
    // },
    image: node => {
      const {src} = node.attributes
      return <Img widthCoefficient={IMGwPercent} key={node.key} uri={src} />
    },
    // fence: a => {
    //   // console.log('fence:', a)
    //   // @ts-expect-error
    //   return <CodeHighlighter key={nanoid()} type={a.sourceInfo} codeText={a.content} />
    // },
    // code_inline: a => {
    //   // console.log('code_inline:', a)
    //   return <CodeHighlighter key={nanoid()} type={'js'} codeText={a.content} />
    // }
  }
  return {
    style,
    rules,
  }
}
