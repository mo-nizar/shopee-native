import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import Screen from '@/Layouts/Screen';
import { navigate } from '@/router/Route';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';


const ProfileScreen = ({navigation}: any) => {

  const { email, name, isLoggedIn } = useSelector((state: any) => state.profile);

  return (
    <Screen>
      <BackButton onPress={() => navigation.goBack()} />
      { isLoggedIn 
      ? <View style={styles.container}>
          <Text style={styles.text}>name:{name || 'unknown'}</Text>
          <Text style={styles.text}>email:{email}</Text>
        </View>
      : <Button onPress={()=>navigate('Login')} title='Login'/>
      }
    </Screen>
  );
}


export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    gap: 8,
  },
  text:{
    fontSize:16,
    fontWeight: 700,
  }
});
