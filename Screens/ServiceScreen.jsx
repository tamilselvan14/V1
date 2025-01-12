import {StyleSheet, Text, View} from 'react-native';

function ServiceScreen(){
    return(
        <View style={styles.viewStyle}>
           
            <Text style={styles.textStyle}>Service Screen</Text>
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
export default ServiceScreen;