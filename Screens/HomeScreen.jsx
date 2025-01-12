import {StyleSheet, Text, Button, View} from 'react-native';

function HomeScreen(props){
    console.log(props);
    
    return(
        <View style={styles.viewStyle}>
            <Text style={styles.headinStyle}>Vibein</Text>
            <Text style={styles.textStyle}>Beyond Imagination</Text>
            <Button title ="Profile" onPress={()=> props.navigation.navigate('Profile')}/>
        </View>
    );
}
const styles = StyleSheet.create({
    viewStyle:{
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        flex:1,
    },
    textStyles:{
        fontsize:28,
        color:'black',
    },
    headingStyle:{
        fontSize:30,
        color:"black",
        textAlign:'center',
    },
});
export default HomeScreen;