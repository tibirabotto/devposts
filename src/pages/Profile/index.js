import React, {useContext} from 'react';
import { View, Text, Button } from 'react-native';

import { AuthContext } from '../../contexts/auth';

export default function Profile() {
  const {signOut} = useContext(AuthContext)
 return (
   <View>
    <Text>Profile</Text>
    <Button title='signOut' onPress={signOut}/>
   </View>
  );
}
