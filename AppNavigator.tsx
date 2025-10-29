import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { Ionicons } from '@expo/vector-icons';
import SearchScreen from './src/screens/SearchScreen';
import MyCoursesScreen from './src/screens/MyCoursesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import HomeScreen from './src/screens/HomeScreen';
import CourseDetailScreen from './src/screens/CourseDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="CourseDetail" component={CourseDetailScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const SearchStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SearchRoot" component={SearchScreen} />
    <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
  </Stack.Navigator>
);

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#00bfff',
          tabBarInactiveTintColor: '#666',
          headerShown: false, 
        }}
      >
        <Tab.Screen name="Home" component={HomeStack} options={{ tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> }} />
        <Tab.Screen name="Search" component={SearchStack} options={{ tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} /> }} />
        <Tab.Screen name="MyCourses" component={MyCoursesScreen} options={{ tabBarIcon: ({ color }) => <Ionicons name="book" size={24} color={color} /> }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} /> }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}