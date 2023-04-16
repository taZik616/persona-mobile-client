import {AppRegistry, LogBox} from 'react-native'

import './ignoreConsole'

import {AppWithProviders} from 'src/AppWithProviders'

import {name as appName} from './app.json'
LogBox.ignoreAllLogs()

AppRegistry.registerComponent(appName, () => AppWithProviders)
