import * as React from 'react'

import Svg, {Path, SvgProps} from 'react-native-svg'

export const Logo = ({color = '#000', ...props}: SvgProps) => {
  return (
    <Svg width={100} height={37} viewBox="0 0 100 37" fill="none" {...props}>
      <Path
        fill={color}
        d="M4.75 18.423c0 .47.05.814.153 1.034.103.205.293.351.572.44.293.087.755.131 1.385.131.044 0 .066.044.066.132 0 .088-.022.132-.066.132-.6 0-1.07-.007-1.407-.022l-1.913-.022-1.605.022c-.293.015-.689.022-1.187.022-.044 0-.066-.044-.066-.132 0-.088.022-.132.066-.132.469 0 .806-.037 1.011-.11a.66.66 0 0 0 .44-.418c.073-.22.11-.55.11-.989V8.331c0-.44-.037-.762-.11-.968a.66.66 0 0 0-.44-.417c-.22-.088-.557-.132-1.011-.132-.044 0-.066-.044-.066-.132 0-.088.022-.132.066-.132l1.165.022c.674.029 1.21.044 1.605.044.352 0 .77-.022 1.253-.066.19-.015.433-.03.726-.044.293-.015.63-.022 1.011-.022 1.495 0 2.675.315 3.54.945.865.616 1.298 1.576 1.298 2.88 0 .91-.235 1.679-.704 2.31a4.403 4.403 0 0 1-1.825 1.428 5.568 5.568 0 0 1-2.265.484c-.395 0-.74-.036-1.033-.11-.03 0-.044-.036-.044-.11 0-.044.007-.088.022-.132.03-.043.059-.058.088-.043.22.058.469.087.747.087.675 0 1.232-.315 1.671-.945.455-.63.682-1.524.682-2.683 0-1.158-.25-2.052-.747-2.682-.484-.63-1.195-.945-2.133-.945-.41 0-.69.095-.836.285-.146.19-.22.565-.22 1.122v10.048Zm8.305 1.869c-.044 0-.066-.044-.066-.132 0-.088.022-.132.066-.132.469 0 .806-.037 1.011-.11a.66.66 0 0 0 .44-.418c.073-.22.11-.55.11-.989V8.331c0-.44-.037-.762-.11-.968a.66.66 0 0 0-.44-.417c-.22-.088-.557-.132-1.011-.132-.044 0-.066-.044-.066-.132 0-.088.022-.132.066-.132h9.323c.146 0 .22.066.22.198l.043 2.924c0 .03-.044.051-.131.066-.074.015-.118 0-.133-.044-.234-.85-.63-1.48-1.187-1.891-.557-.41-1.29-.616-2.199-.616h-.66c-.439 0-.761.096-.967.286-.205.19-.308.484-.308.88v10.07c0 .425.081.74.242.946.162.205.418.307.77.307h.726c1.143 0 2.06-.234 2.748-.703.689-.47 1.195-1.195 1.517-2.177 0-.03.03-.044.088-.044.044 0 .08.015.11.044.044.015.066.03.066.044a24.733 24.733 0 0 0-.22 3.122.438.438 0 0 1-.066.264c-.044.044-.132.066-.264.066h-9.718Zm8.487-4.903c0-.601-.235-1.07-.704-1.407-.454-.352-1.114-.528-1.979-.528h-2.968v-.616h2.99c.85 0 1.503-.146 1.957-.44.455-.293.682-.703.682-1.23 0-.045.037-.067.11-.067.088 0 .132.022.132.066l-.022 1.979.022 1.055c.03.499.044.895.044 1.188 0 .03-.044.044-.132.044-.088 0-.132-.015-.132-.044Zm14.397 4.903c-.338 0-.96-.608-1.87-1.825-.908-1.231-2.008-2.939-3.298-5.123l2.023-.616c1.217 1.847 2.228 3.291 3.035 4.332.82 1.04 1.546 1.796 2.176 2.265.63.469 1.246.703 1.847.703.03 0 .044.044.044.132 0 .088-.014.132-.044.132H35.94ZM31.21 6.484c1.334 0 2.368.249 3.1.747.733.484 1.1 1.166 1.1 2.045 0 .836-.242 1.59-.726 2.265a4.849 4.849 0 0 1-1.847 1.583 5.464 5.464 0 0 1-2.396.55c-.572 0-.975-.008-1.21-.022v4.859c0 .454.037.784.11.99a.658.658 0 0 0 .418.417c.22.073.564.11 1.034.11.029 0 .043.044.043.132 0 .088-.014.132-.043.132-.484 0-.865-.007-1.144-.022l-1.671-.022-1.605.022c-.293.015-.689.022-1.187.022-.044 0-.066-.044-.066-.132 0-.088.022-.132.066-.132.469 0 .806-.037 1.011-.11a.66.66 0 0 0 .44-.418c.088-.22.132-.55.132-.989V8.331c0-.44-.037-.762-.11-.968a.66.66 0 0 0-.44-.417c-.22-.088-.557-.132-1.011-.132-.03 0-.044-.044-.044-.132 0-.088.014-.132.044-.132l1.165.022c.674.029 1.21.044 1.605.044.498 0 1.019-.022 1.561-.066a19.482 19.482 0 0 1 1.671-.066Zm1.693 3.628c0-1.202-.176-2.03-.527-2.485-.352-.454-.858-.681-1.518-.681-.586 0-1.004.11-1.253.33-.25.22-.374.586-.374 1.099v4.661c.352.059.777.088 1.276.088.85 0 1.458-.235 1.825-.704.38-.483.571-1.253.571-2.308ZM43.077 8.77c0 .528.132.997.396 1.408.278.41.616.77 1.011 1.077.396.308.931.682 1.605 1.121.733.47 1.32.88 1.76 1.232.44.352.813.784 1.12 1.297.309.498.463 1.077.463 1.737 0 .762-.206 1.444-.616 2.045-.41.586-.982 1.048-1.715 1.385-.718.323-1.525.484-2.419.484a8.876 8.876 0 0 1-2.067-.264c-.718-.19-1.202-.396-1.45-.616a2.171 2.171 0 0 1-.177-.154.613.613 0 0 1-.044-.263l-.066-3.497v-.021c0-.06.037-.088.11-.088.074-.015.118.007.132.066.44.894.821 1.62 1.144 2.176a6.023 6.023 0 0 0 1.253 1.474 2.65 2.65 0 0 0 1.737.637c.586 0 1.07-.154 1.451-.462.381-.322.572-.864.572-1.627 0-.645-.147-1.209-.44-1.693a4.447 4.447 0 0 0-1.033-1.231 19.87 19.87 0 0 0-1.693-1.21 19.165 19.165 0 0 1-1.65-1.165 4.794 4.794 0 0 1-.989-1.165c-.279-.454-.418-.99-.418-1.605 0-.777.22-1.43.66-1.957a3.927 3.927 0 0 1 1.737-1.187 6.272 6.272 0 0 1 2.22-.396c.514 0 1.034.051 1.562.154.528.088.953.198 1.275.33.132.058.22.124.264.197.044.06.066.14.066.242v3.232c0 .045-.037.081-.11.11-.073.015-.117 0-.132-.043l-.176-.418c-.366-.924-.799-1.708-1.297-2.353-.484-.645-1.165-.967-2.045-.967-.586 0-1.07.168-1.451.505-.367.337-.55.829-.55 1.473Zm15.538 11.786c-1.364 0-2.58-.315-3.65-.946a6.754 6.754 0 0 1-2.463-2.594 7.651 7.651 0 0 1-.857-3.584c0-1.51.38-2.8 1.143-3.87a7.151 7.151 0 0 1 2.924-2.44c1.202-.543 2.426-.814 3.672-.814 1.393 0 2.617.33 3.672.99a6.474 6.474 0 0 1 2.419 2.572 7.128 7.128 0 0 1 .857 3.408 6.74 6.74 0 0 1-1.055 3.672 7.56 7.56 0 0 1-2.837 2.638 7.81 7.81 0 0 1-3.825.968Zm.725-.55c.821 0 1.554-.234 2.199-.703.66-.484 1.173-1.18 1.54-2.09.366-.923.549-2.022.549-3.297 0-1.349-.205-2.551-.616-3.606-.41-1.07-1.004-1.906-1.78-2.507-.778-.601-1.687-.901-2.727-.901-1.334 0-2.36.505-3.079 1.517-.718.996-1.077 2.396-1.077 4.2 0 1.421.213 2.697.638 3.825.44 1.114 1.033 1.986 1.78 2.617.763.63 1.62.945 2.573.945Zm10.854-12.95.66.043v10.4c0 .777.16 1.393.483 1.848.323.454.77.681 1.341.681.03 0 .044.044.044.132 0 .088-.014.132-.043.132-.411 0-.726-.007-.946-.022l-1.187-.022-1.364.022c-.249.015-.608.022-1.077.022-.044 0-.066-.044-.066-.132 0-.088.022-.132.066-.132.645 0 1.15-.227 1.517-.681.381-.455.572-1.07.572-1.847V7.055Zm11.213 13.566c0 .044-.036.073-.11.088-.058.014-.102.007-.131-.022L70.326 8.353c-.513-.587-.953-.99-1.32-1.21-.366-.22-.74-.33-1.12-.33-.03 0-.045-.043-.045-.131 0-.088.015-.132.044-.132l.924.022c.19.014.469.022.835.022l1.671-.022c.205-.015.455-.022.748-.022.117 0 .205.03.264.088.058.058.16.183.308.373.249.338.425.565.527.682l8.07 9.3.175 3.629Zm0 0-.637-.66V9.364c0-.791-.161-1.414-.484-1.869-.322-.454-.77-.681-1.341-.681-.03 0-.044-.044-.044-.132 0-.088.015-.132.044-.132l.945.022c.47.029.865.044 1.188.044.293 0 .703-.015 1.231-.044l.99-.022c.029 0 .043.044.043.132 0 .088-.014.132-.043.132-.587 0-1.049.234-1.386.703-.337.455-.505 1.07-.505 1.847v11.258Zm6.253-5.98h6.332l.154.615H87.33l.33-.616Zm11.675 5.386c.074 0 .11.044.11.132 0 .088-.036.132-.11.132-.293 0-.747-.015-1.363-.044a34.84 34.84 0 0 0-1.385-.044c-.367 0-.814.015-1.341.044-.499.03-.895.044-1.188.044-.059 0-.088-.044-.088-.132 0-.088.03-.132.088-.132.381 0 .652-.037.814-.11a.455.455 0 0 0 .263-.44c0-.249-.146-.667-.44-1.253l-4.463-8.817 1.078-1.89-4.376 9.652c-.19.425-.286.82-.286 1.187 0 .528.184.938.55 1.231.381.294.887.44 1.517.44.073 0 .11.044.11.132 0 .088-.037.132-.11.132-.264 0-.645-.015-1.143-.044-.557-.03-1.041-.044-1.451-.044-.396 0-.873.015-1.43.044-.498.03-.901.044-1.209.044-.058 0-.088-.044-.088-.132 0-.088.03-.132.088-.132.41 0 .755-.08 1.034-.242.278-.176.556-.476.835-.901.279-.44.608-1.085.99-1.935l4.77-10.488c.03-.044.096-.066.199-.066.117 0 .183.022.198.066l5.496 10.818c.513 1.04.939 1.759 1.276 2.154.337.396.689.594 1.055.594Z"
      />
      <Path stroke={color} strokeWidth={0.753} d="M0 25.916h99.77" />
      <Path
        fill={color}
        d="m1.077 29.226.227.017-.092 4.03c-.006.298.05.525.168.682.124.157.306.236.547.236.017 0 .025.017.025.05 0 .034-.008.051-.025.051-.151 0-.27-.003-.353-.008l-.463-.009-.497.009a5.673 5.673 0 0 1-.353.008c-.017 0-.025-.017-.025-.05 0-.034.008-.051.025-.051.23 0 .407-.079.53-.236.13-.157.196-.384.202-.681l.084-4.048Zm5.874 4.965c.012 0 .017.017.017.05 0 .034-.005.051-.017.051-.185 0-.333-.003-.446-.008l-.606-.009-.589.009a8.297 8.297 0 0 1-.429.008c-.011 0-.017-.017-.017-.05 0-.034.006-.051.017-.051.185 0 .323-.014.412-.042a.278.278 0 0 0 .177-.168.991.991 0 0 0 .025-.37l-.176-3.847.37-.58-2.154 5.05c-.012.021-.034.033-.068.033a.105.105 0 0 1-.075-.034L1.11 29.731c-.101-.208-.216-.36-.345-.455a.73.73 0 0 0-.446-.143c-.017 0-.025-.017-.025-.05 0-.034.008-.05.025-.05l.362.008c.073.005.168.008.286.008l.387-.008c.05-.006.11-.009.177-.009.073 0 .131.028.176.084.045.05.115.169.21.354l1.894 3.711-.362.64 1.995-4.578a.376.376 0 0 1 .11-.16.212.212 0 0 1 .142-.05c.04 0 .09.002.152.008.062.005.137.008.227.008l.455-.008c.072-.006.18-.009.32-.009.016 0 .025.017.025.05 0 .034-.009.051-.026.051-.263 0-.457.05-.58.152-.118.095-.171.255-.16.48l.185 3.845c.011.174.034.3.067.379a.279.279 0 0 0 .177.16c.084.028.222.042.412.042Zm5.004-4.132c0-.292-.067-.519-.202-.682-.129-.162-.317-.244-.563-.244-.012 0-.017-.017-.017-.05 0-.034.005-.05.017-.05l.387.008c.213.01.381.017.505.017.1 0 .252-.006.454-.017l.37-.009c.011 0 .017.017.017.05 0 .034-.005.051-.017.051a.608.608 0 0 0-.513.244c-.118.163-.177.39-.177.682v2.356c0 .404-.087.758-.26 1.06a1.72 1.72 0 0 1-.724.69 2.277 2.277 0 0 1-1.078.245 2.45 2.45 0 0 1-1.094-.236 1.818 1.818 0 0 1-.749-.69 2.093 2.093 0 0 1-.26-1.06v-2.71c0-.168-.017-.292-.051-.37a.28.28 0 0 0-.185-.16 1.173 1.173 0 0 0-.404-.05c-.017 0-.025-.018-.025-.051 0-.034.008-.05.025-.05l.438.008c.246.01.446.017.597.017.168 0 .376-.006.623-.017l.42-.009c.017 0 .026.017.026.05 0 .034-.009.051-.025.051-.186 0-.323.017-.413.05a.304.304 0 0 0-.185.177 1.19 1.19 0 0 0-.042.37v2.4c0 .667.137 1.166.412 1.497.28.326.67.488 1.17.488.477 0 .85-.146 1.12-.437.269-.298.403-.716.403-1.254v-2.365Zm2.804 3.518c0 .145.014.255.042.328a.228.228 0 0 0 .152.134c.073.023.19.034.353.034h.505c.398 0 .735-.11 1.01-.328.275-.224.457-.525.547-.9 0-.012.011-.017.034-.017.011 0 .022.005.033.016.017.006.026.012.026.017-.05.517-.076.951-.076 1.305a.167.167 0 0 1-.025.1c-.017.018-.05.026-.101.026H13.32c-.011 0-.017-.017-.017-.05 0-.034.006-.051.017-.051.19 0 .328-.014.412-.042a.254.254 0 0 0 .177-.16c.034-.084.05-.21.05-.379v-3.896c0-.168-.016-.292-.05-.37a.254.254 0 0 0-.177-.16 1.252 1.252 0 0 0-.412-.05c-.011 0-.017-.018-.017-.051 0-.034.006-.05.017-.05l.43.008c.246.01.448.017.605.017.169 0 .376-.006.623-.017l.42-.009c.018 0 .026.017.026.05 0 .034-.008.051-.025.051-.185 0-.323.017-.413.05a.278.278 0 0 0-.185.169 1.188 1.188 0 0 0-.042.37v3.855Zm4.415-4.368c-.342 0-.623.107-.842.32-.219.207-.387.521-.505.942 0 .017-.017.026-.05.026-.028-.006-.042-.014-.042-.026.022-.218.047-.499.076-.841.028-.348.042-.609.042-.783 0-.028.014-.042.042-.042.033 0 .05.014.05.042 0 .123.157.185.471.185a49.35 49.35 0 0 0 1.692.026c.331 0 .682-.006 1.052-.017l.572-.009c.213 0 .368-.014.463-.042.101-.028.166-.084.194-.168.005-.023.022-.034.05-.034.028 0 .042.011.042.034a17.94 17.94 0 0 0-.05.79c-.017.354-.026.64-.026.86 0 .01-.016.016-.05.016-.028 0-.045-.005-.05-.017-.057-.432-.188-.749-.396-.95-.208-.208-.488-.312-.842-.312-.157 0-.274.014-.353.042a.253.253 0 0 0-.151.151.923.923 0 0 0-.043.329v3.88c0 .168.017.294.05.378.04.079.11.132.211.16.101.028.261.042.48.042.017 0 .025.017.025.05 0 .034-.008.051-.025.051a9.84 9.84 0 0 1-.463-.008l-.69-.009-.656.009c-.118.005-.28.008-.489.008-.01 0-.016-.017-.016-.05 0-.034.005-.051.017-.051.218 0 .378-.014.48-.042.106-.028.176-.081.21-.16a.936.936 0 0 0 .058-.379v-3.896a.89.89 0 0 0-.042-.32.227.227 0 0 0-.151-.143 1.036 1.036 0 0 0-.345-.042Zm5.442 4.401c0 .174.014.3.042.379a.279.279 0 0 0 .177.16c.09.028.23.042.42.042.017 0 .026.017.026.05 0 .034-.009.051-.026.051-.18 0-.322-.003-.429-.008l-.623-.009-.605.009a8.828 8.828 0 0 1-.438.008c-.017 0-.025-.017-.025-.05 0-.034.008-.051.025-.051.19 0 .328-.014.412-.042a.28.28 0 0 0 .186-.16c.033-.084.05-.21.05-.379v-3.896c0-.168-.017-.292-.05-.37a.28.28 0 0 0-.186-.16c-.084-.034-.221-.05-.412-.05-.017 0-.025-.018-.025-.051 0-.034.008-.05.025-.05l.438.008c.246.01.448.017.605.017.174 0 .385-.006.632-.017l.42-.009c.017 0 .026.017.026.05 0 .034-.009.051-.026.051-.185 0-.322.017-.412.05a.304.304 0 0 0-.185.177 1.192 1.192 0 0 0-.042.37v3.88Zm3.676-2.289c.36 0 .676.062.951.185.275.124.488.295.64.514.151.213.227.46.227.74 0 .292-.081.559-.244.8a1.728 1.728 0 0 1-.665.564c-.28.134-.594.202-.942.202-.163 0-.35-.009-.564-.026a7.665 7.665 0 0 0-.657-.025l-.605.009a8.826 8.826 0 0 1-.438.008c-.017 0-.025-.017-.025-.05 0-.034.008-.051.025-.051.18 0 .314-.014.404-.042a.307.307 0 0 0 .185-.168c.04-.079.059-.202.059-.37v-3.897a.972.972 0 0 0-.05-.362.278.278 0 0 0-.186-.168 1.218 1.218 0 0 0-.404-.05c-.01 0-.017-.018-.017-.051 0-.034.006-.05.017-.05l.438.008c.247.01.446.017.597.017.157 0 .323-.009.497-.026l.219-.017c.09-.005.19-.008.303-.008.5 0 .88.095 1.144.286.264.19.396.46.396.808 0 .32-.124.6-.37.842-.242.24-.584.412-1.027.513l.092-.135Zm-.378-2.146c-.18 0-.303.037-.37.11-.062.073-.093.221-.093.446v1.65l-.303-.06c.247.011.463.017.648.017.33 0 .58-.107.749-.32.174-.219.26-.499.26-.841 0-.32-.075-.567-.227-.74-.145-.175-.367-.262-.664-.262Zm.21 4.957c.758 0 1.136-.39 1.136-1.17 0-.426-.112-.768-.337-1.026-.218-.259-.54-.387-.967-.387-.314 0-.572.016-.774.05l.269-.101v2.112c0 .13.014.23.042.303a.344.344 0 0 0 .193.169c.101.033.247.05.438.05Zm6.943.16c-.134 0-.384-.236-.749-.707-.359-.471-.796-1.128-1.313-1.97l.674-.201c.47.701.864 1.251 1.178 1.65.32.392.603.678.85.858.247.18.485.269.715.269.011 0 .017.017.017.05 0 .034-.006.051-.017.051h-1.355Zm-1.91-5.285c.482 0 .858.098 1.128.294.269.191.404.455.404.792 0 .314-.09.597-.27.85a1.87 1.87 0 0 1-.715.597c-.292.14-.6.21-.926.21a6.56 6.56 0 0 1-.429-.016v1.876c0 .174.014.3.042.379a.252.252 0 0 0 .168.16c.09.028.233.042.43.042.01 0 .016.017.016.05 0 .034-.005.051-.016.051-.186 0-.331-.003-.438-.008l-.614-.009-.606.009a8.826 8.826 0 0 1-.438.008c-.017 0-.025-.017-.025-.05 0-.034.008-.051.025-.051.19 0 .328-.014.412-.042a.28.28 0 0 0 .186-.16c.033-.084.05-.21.05-.379v-3.896c0-.168-.017-.292-.05-.37a.255.255 0 0 0-.177-.16 1.253 1.253 0 0 0-.413-.05c-.01 0-.016-.018-.016-.051 0-.034.005-.05.016-.05l.438.008c.247.01.446.017.598.017.185 0 .387-.009.605-.026l.261-.017c.107-.005.225-.008.354-.008Zm.698 1.38c0-.454-.078-.771-.235-.95-.152-.18-.373-.27-.665-.27-.224 0-.382.042-.471.126-.09.079-.135.224-.135.438v1.775c.135.023.297.034.488.034.365 0 .626-.09.783-.27.157-.184.235-.479.235-.883Zm4.103 1.633h2.356l.059.21h-2.525l.11-.21Zm4.367 2.171c.023 0 .034.017.034.05 0 .034-.011.051-.034.051-.106 0-.277-.006-.513-.017a12.038 12.038 0 0 0-.513-.017c-.14 0-.306.006-.497.017-.19.011-.34.017-.446.017-.022 0-.034-.017-.034-.05 0-.034.012-.051.034-.051.168 0 .289-.017.362-.05a.196.196 0 0 0 .11-.186c0-.084-.048-.227-.144-.429l-1.759-3.577.346-.563-1.667 3.753a1.16 1.16 0 0 0-.11.454c0 .197.07.345.211.446.14.102.337.152.59.152.027 0 .041.017.041.05 0 .034-.014.051-.042.051-.1 0-.247-.006-.437-.017a10.673 10.673 0 0 0-.556-.017c-.151 0-.328.006-.53.017-.18.011-.328.017-.446.017-.028 0-.042-.017-.042-.05 0-.034.014-.051.042-.051.157 0 .289-.03.395-.093a.98.98 0 0 0 .312-.328c.1-.163.222-.4.362-.715l1.81-4.073c.01-.017.036-.026.075-.026.04 0 .062.009.067.026l2.062 4.157c.19.404.35.682.48.833.134.146.28.219.437.219Zm1.052-4.965.227.017v4.03c0 .298.056.525.168.682.118.157.29.236.514.236.017 0 .025.017.025.05 0 .034-.008.051-.025.051-.146 0-.258-.003-.337-.008l-.446-.009-.496.009c-.09.005-.22.008-.388.008-.017 0-.025-.017-.025-.05 0-.034.008-.051.025-.051.242 0 .427-.079.556-.236.134-.157.202-.384.202-.681v-4.048Zm4.275 5.184c0 .017-.014.028-.042.034-.028.005-.048.002-.06-.009l-4.047-4.713c-.19-.219-.36-.37-.505-.454a.817.817 0 0 0-.43-.135c-.016 0-.024-.017-.024-.05 0-.034.008-.05.025-.05l.337.008c.067.005.168.008.303.008l.538-.008c.067-.006.146-.009.236-.009.045 0 .078.011.1.034.023.022.057.067.102.135.095.129.165.218.21.269l3.19 3.753.067 1.187Zm0 0-.227-.253V30.06c0-.297-.06-.525-.177-.682-.112-.162-.28-.244-.505-.244-.011 0-.017-.017-.017-.05 0-.034.006-.05.017-.05l.345.008c.18.01.328.017.446.017.107 0 .261-.006.463-.017l.353-.009c.017 0 .026.017.026.05 0 .034-.009.051-.026.051a.616.616 0 0 0-.521.244c-.118.157-.177.385-.177.682v4.35Zm3.513-.084c-.174 0-.379-.009-.614-.026l-.32-.016a9.97 9.97 0 0 0-.43-.009l-.597.009a9.054 9.054 0 0 1-.446.008c-.011 0-.017-.017-.017-.05 0-.034.006-.051.017-.051.19 0 .328-.014.412-.042a.28.28 0 0 0 .185-.16c.034-.084.05-.21.05-.379v-3.896c0-.168-.016-.292-.05-.37a.254.254 0 0 0-.176-.16 1.252 1.252 0 0 0-.413-.05c-.01 0-.017-.018-.017-.051 0-.034.006-.05.017-.05l.446.008a9.592 9.592 0 0 0 1.27-.008c.282-.012.47-.018.565-.018.572 0 1.08.113 1.523.337.443.224.786.53 1.027.917.247.387.37.822.37 1.305 0 .544-.126 1.026-.378 1.447a2.637 2.637 0 0 1-1.019.968 2.971 2.971 0 0 1-1.405.337Zm-.084-.169c.387 0 .729-.092 1.026-.277.303-.186.539-.458.707-.817.169-.364.253-.8.253-1.304 0-.483-.082-.917-.244-1.305a2.137 2.137 0 0 0-.674-.925 1.597 1.597 0 0 0-1.018-.345c-.241 0-.426.014-.555.042a.47.47 0 0 0-.278.16c-.062.073-.093.188-.093.345v3.787c0 .23.06.395.177.496.124.096.356.143.699.143Zm7.924-2.836c.359 0 .676.062.95.185.276.124.489.295.64.514.152.213.227.46.227.74 0 .292-.081.559-.244.8a1.728 1.728 0 0 1-.665.564c-.28.134-.594.202-.942.202-.163 0-.35-.009-.564-.026a7.665 7.665 0 0 0-.657-.025l-.605.009a8.826 8.826 0 0 1-.438.008c-.017 0-.025-.017-.025-.05 0-.034.008-.051.025-.051.18 0 .314-.014.404-.042a.307.307 0 0 0 .185-.168c.04-.079.06-.202.06-.37v-3.897a.972.972 0 0 0-.051-.362.278.278 0 0 0-.185-.168 1.218 1.218 0 0 0-.404-.05c-.012 0-.017-.018-.017-.051 0-.034.005-.05.017-.05l.437.008c.247.01.446.017.598.017.157 0 .322-.009.496-.026l.219-.017c.09-.005.19-.008.303-.008.5 0 .88.095 1.145.286.263.19.395.46.395.808 0 .32-.123.6-.37.842-.242.24-.584.412-1.027.513l.093-.135Zm-.38-2.146c-.179 0-.302.037-.37.11-.061.073-.092.221-.092.446v1.65l-.303-.06c.247.011.463.017.648.017.331 0 .58-.107.749-.32.174-.219.26-.499.26-.841 0-.32-.075-.567-.226-.74-.146-.175-.368-.262-.665-.262Zm.211 4.957c.758 0 1.136-.39 1.136-1.17 0-.426-.112-.768-.336-1.026-.22-.259-.542-.387-.968-.387-.314 0-.572.016-.774.05l.269-.101v2.112c0 .13.014.23.042.303a.344.344 0 0 0 .194.169c.1.033.246.05.437.05Zm5.496.261a2.7 2.7 0 0 1-1.397-.362 2.586 2.586 0 0 1-.943-.993 2.93 2.93 0 0 1-.328-1.372c0-.578.146-1.071.438-1.48a2.736 2.736 0 0 1 1.12-.935c.46-.208.928-.311 1.404-.311.533 0 1.002.126 1.406.378.404.247.712.575.926.985.218.41.328.844.328 1.304 0 .51-.135.98-.404 1.406-.27.426-.631.763-1.086 1.01a2.99 2.99 0 0 1-1.464.37Zm.286-.202c.337 0 .637-.09.9-.27.27-.184.48-.454.632-.807.157-.354.235-.774.235-1.262 0-.522-.087-.985-.26-1.39a2.158 2.158 0 0 0-.733-.959 1.83 1.83 0 0 0-1.11-.345c-.55 0-.974.197-1.271.59-.298.387-.446.925-.446 1.615 0 .539.087 1.024.26 1.456.174.427.418.763.733 1.01.314.241.667.362 1.06.362Zm7.882-4.132c0-.292-.067-.519-.202-.682-.129-.162-.317-.244-.563-.244-.012 0-.017-.017-.017-.05 0-.034.005-.05.017-.05l.387.008c.213.01.381.017.505.017.1 0 .252-.006.454-.017l.37-.009c.012 0 .017.017.017.05 0 .034-.005.051-.017.051a.608.608 0 0 0-.513.244c-.118.163-.177.39-.177.682v2.356c0 .404-.087.758-.26 1.06a1.72 1.72 0 0 1-.724.69 2.276 2.276 0 0 1-1.078.245 2.45 2.45 0 0 1-1.094-.236 1.818 1.818 0 0 1-.749-.69 2.093 2.093 0 0 1-.26-1.06v-2.71c0-.168-.017-.292-.051-.37a.28.28 0 0 0-.185-.16 1.174 1.174 0 0 0-.404-.05c-.017 0-.025-.018-.025-.051 0-.034.008-.05.025-.05l.438.008c.246.01.446.017.597.017.168 0 .376-.006.623-.017l.42-.009c.017 0 .026.017.026.05 0 .034-.009.051-.025.051-.185 0-.323.017-.413.05a.304.304 0 0 0-.185.177 1.188 1.188 0 0 0-.042.37v2.4c0 .667.138 1.166.412 1.497.28.326.67.488 1.17.488.477 0 .85-.146 1.12-.437.269-.298.403-.716.403-1.254v-2.365Zm2.863-.85c-.342 0-.623.107-.841.32-.22.207-.388.521-.505.942 0 .017-.017.026-.05.026-.029-.006-.043-.014-.043-.026.022-.218.048-.499.076-.841.028-.348.042-.609.042-.783 0-.028.014-.042.042-.042.034 0 .05.014.05.042 0 .123.158.185.472.185.482.017 1.046.026 1.691.026.331 0 .682-.006 1.052-.017l.572-.009c.214 0 .368-.014.463-.042.101-.028.166-.084.194-.168.005-.023.022-.034.05-.034.028 0 .043.011.043.034-.017.174-.034.437-.051.79-.017.354-.025.64-.025.86 0 .01-.017.016-.05.016-.029 0-.046-.005-.051-.017-.056-.432-.188-.749-.396-.95-.207-.208-.488-.312-.841-.312-.157 0-.275.014-.354.042a.253.253 0 0 0-.151.151.925.925 0 0 0-.042.329v3.88c0 .168.017.294.05.378.04.079.11.132.21.16.102.028.261.042.48.042.017 0 .025.017.025.05 0 .034-.008.051-.025.051-.196 0-.35-.003-.463-.008l-.69-.009-.656.009c-.118.005-.28.008-.488.008-.012 0-.017-.017-.017-.05 0-.034.005-.051.017-.051.219 0 .378-.014.48-.042.106-.028.176-.081.21-.16a.934.934 0 0 0 .059-.379v-3.896a.893.893 0 0 0-.042-.32.227.227 0 0 0-.152-.143 1.036 1.036 0 0 0-.345-.042Zm5.442 4.401c0 .174.014.3.042.379a.279.279 0 0 0 .177.16c.09.028.23.042.42.042.017 0 .026.017.026.05 0 .034-.008.051-.025.051-.18 0-.323-.003-.43-.008l-.622-.009-.606.009a8.823 8.823 0 0 1-.438.008c-.017 0-.025-.017-.025-.05 0-.034.008-.051.025-.051.191 0 .328-.014.413-.042a.28.28 0 0 0 .185-.16c.033-.084.05-.21.05-.379v-3.896c0-.168-.017-.292-.05-.37a.28.28 0 0 0-.185-.16c-.085-.034-.222-.05-.413-.05-.017 0-.025-.018-.025-.051 0-.034.008-.05.025-.05l.438.008c.247.01.449.017.606.017.174 0 .384-.006.63-.017l.422-.009c.017 0 .025.017.025.05 0 .034-.008.051-.025.051-.185 0-.323.017-.413.05a.305.305 0 0 0-.185.177 1.19 1.19 0 0 0-.042.37v3.88Zm3.382.581a4.89 4.89 0 0 0 1.624.017c.494.342 1.108.66 1.843.95.735.298 1.501.534 2.298.708.802.18 1.54.269 2.213.269.774 0 1.389-.07 1.843-.21.011-.006.023.005.034.033.011.034.008.054-.009.06a5.628 5.628 0 0 1-.984.285c-.382.085-.878.127-1.49.127-2.272 0-4.73-.747-7.372-2.239Zm.724.202a2.7 2.7 0 0 1-1.397-.362 2.586 2.586 0 0 1-.943-.993 2.93 2.93 0 0 1-.328-1.372c0-.578.146-1.071.438-1.48a2.736 2.736 0 0 1 1.119-.935c.46-.208.928-.311 1.405-.311.533 0 1.002.126 1.406.378.404.247.712.575.925.985.22.41.329.844.329 1.304 0 .51-.135.98-.404 1.406-.27.426-.631.763-1.086 1.01a2.99 2.99 0 0 1-1.464.37Zm.286-.202c.337 0 .637-.09.9-.27.27-.184.48-.454.632-.807.157-.354.235-.774.235-1.262 0-.522-.087-.985-.26-1.39a2.158 2.158 0 0 0-.733-.959 1.83 1.83 0 0 0-1.11-.345c-.55 0-.974.197-1.271.59-.298.387-.446.925-.446 1.615 0 .539.087 1.024.26 1.456.174.427.418.763.733 1.01.314.241.667.362 1.06.362Zm7.882-4.132c0-.292-.067-.519-.202-.682-.129-.162-.317-.244-.563-.244-.012 0-.017-.017-.017-.05 0-.034.005-.05.017-.05l.387.008c.213.01.381.017.505.017.1 0 .252-.006.454-.017l.37-.009c.011 0 .017.017.017.05 0 .034-.005.051-.017.051a.608.608 0 0 0-.513.244c-.118.163-.177.39-.177.682v2.356c0 .404-.087.758-.26 1.06a1.72 1.72 0 0 1-.724.69 2.276 2.276 0 0 1-1.078.245 2.45 2.45 0 0 1-1.094-.236 1.818 1.818 0 0 1-.749-.69 2.093 2.093 0 0 1-.26-1.06v-2.71c0-.168-.017-.292-.051-.37a.28.28 0 0 0-.185-.16 1.174 1.174 0 0 0-.404-.05c-.017 0-.025-.018-.025-.051 0-.034.008-.05.025-.05l.437.008c.247.01.447.017.598.017.168 0 .376-.006.623-.017l.42-.009c.017 0 .026.017.026.05 0 .034-.009.051-.025.051-.186 0-.323.017-.413.05a.305.305 0 0 0-.185.177 1.188 1.188 0 0 0-.042.37v2.4c0 .667.137 1.166.412 1.497.28.326.67.488 1.17.488.477 0 .85-.146 1.12-.437.269-.298.403-.716.403-1.254v-2.365Zm1.45 4.233c-.018 0-.026-.017-.026-.05 0-.034.008-.051.025-.051.191 0 .328-.014.413-.042a.254.254 0 0 0 .176-.16c.034-.084.05-.21.05-.379v-3.896c0-.168-.016-.292-.05-.37a.254.254 0 0 0-.176-.16 1.252 1.252 0 0 0-.413-.05c-.017 0-.025-.018-.025-.051 0-.034.008-.05.025-.05h3.501c.056 0 .084.024.084.075l.017 1.094c0 .011-.017.02-.05.025-.028 0-.045-.008-.05-.025-.136-.634-.523-.951-1.162-.951h-.345c-.208 0-.354.037-.438.11-.078.072-.118.196-.118.37v3.846c0 .185.034.314.101.387.073.073.2.11.379.11h.412c.752 0 1.229-.363 1.431-1.086 0-.012.014-.017.042-.017.04 0 .059.008.059.025a9.026 9.026 0 0 0-.084 1.17.167.167 0 0 1-.025.1c-.017.018-.05.026-.101.026h-3.653Zm3.18-1.902c0-.482-.314-.724-.942-.724h-1.178v-.218h1.186c.617 0 .926-.208.926-.623 0-.017.014-.026.042-.026.034 0 .05.009.05.026l-.008.732.008.395c.012.18.017.326.017.438 0 .011-.017.017-.05.017-.034 0-.05-.006-.05-.017Z"
      />
      <Path stroke={color} strokeWidth={0.753} d="M0 35.916h99.77" />
    </Svg>
  )
}
