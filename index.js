import {AppRegistry} from 'react-native';

import {AppWithProviders} from 'src/AppWithProviders';

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppWithProviders);
