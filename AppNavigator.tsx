import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { Ionicons } from '@expo/vector-icons';
import SearchScreen from './src/screens/SearchScreen';
import MyCoursesScreen from './src/screens/MyCoursesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import HomeScreen from './src/screens/HomeScreen';
import CourseDetailScreen from './src/screens/CourseDetailScreen';
import LearningScreen from './src/screens/LearningScreen';
import { RootStackParamList, RootTabParamList } from './src/types';
import CoursesByCategoryScreen from './src/screens/CoursesByCategoryScreen';
import TeacherProfileScreen from './src/screens/TeacherProfileScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
    <Stack.Screen name="Learning" component={LearningScreen} />
    <Stack.Screen name="CoursesByCategory" component={CoursesByCategoryScreen} />
    <Stack.Screen name="TeacherProfile" component={TeacherProfileScreen} />
  </Stack.Navigator>
);

const SearchStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Search" component={SearchScreen} />
    <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
    <Stack.Screen name="Learning" component={LearningScreen} />
  </Stack.Navigator>
);

const MyCoursesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MyCourses" component={MyCoursesScreen} />
    <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
    <Stack.Screen name="Learning" component={LearningScreen} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
    <Stack.Screen name="Learning" component={LearningScreen} />
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
        <Tab.Screen name="HomeTab" component={HomeStack} options={{ tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> }} />
        <Tab.Screen name="SearchTab" component={SearchStack} options={{ tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} /> }} />
        <Tab.Screen name="MyCoursesTab" component={MyCoursesStack} options={{ tabBarIcon: ({ color }) => <Ionicons name="book" size={24} color={color} /> }} />
        <Tab.Screen name="ProfileTab" component={ProfileStack} options={{ tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} /> }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}