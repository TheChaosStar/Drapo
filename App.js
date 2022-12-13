import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from '@rneui/themed';
import Home from './src/Home';
import Scores from './src/Scores';
import Settings from './src/Settings';
import Game from './src/Game';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function GameStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Game" component={Game} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='App'
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen
          name="Scores"
          component={Scores}
          options={{
            tabBarIcon: ({ focused, color }) => { return <Icon name='score' /> }
          }}
        />
        <Tab.Screen
          name="App"
          component={GameStackScreen}
          options={{
            tabBarIcon: ({ focused, color }) => { return <Icon name='home' /> }
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ focused, color }) => { return <Icon name='settings' /> }
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}