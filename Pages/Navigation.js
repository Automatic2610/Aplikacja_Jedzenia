import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Logowanie from "../Pages/Logowanie.js";
import Home from "../Pages/Home.js"

const Stack = createNativeStackNavigator();

const optionScreen = {
    headerShown: false
}

export default function StackNav() {
    return (
         <Stack.Navigator>
             <Stack.Screen name="Logowanie" component={Logowanie} options={optionScreen} />
             <Stack.Screen name="Home" component={Home} options={optionScreen} />
         </Stack.Navigator>

    );
}