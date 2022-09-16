import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useState, useRef } from 'react';
import RadioForm from 'react-native-simple-radio-button';

export default function App() {

  const[weight, setWeight] = useState(0)
  const[bottles, setBottles] = useState(0)
  const[hours, setHours] = useState(0)
  const[gender, setGender] = useState('male')
  const[alcoholLevel, setAlcoholLevel] = useState(0)
  const[isDrunk, setIsDrunk] = useState(false)

  const pickerRef = useRef(null);

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  const bottleList = [
    {label: '1 bottle', value: '1'},
    {label: '2 bottles', value: '2'},
    {label: '3 bottles', value: '3'},
    {label: '4 bottles', value: '4'},
    {label: '5 bottles', value: '5'},
    {label: '6 bottles', value: '6'},
    {label: '7 bottles', value: '7'},
    {label: '8 bottles', value: '8'},
    {label: '9 bottles', value: '9'},
    {label: '10 bottles', value: '10'},
    {label: '11 bottles', value: '11'},
    {label: '12 bottles', value: '12'},
    {label: '13 bottles', value: '13'},
    {label: '14 bottles', value: '14'},
    {label: '15 bottles', value: '15'},
    {label: '16 bottles', value: '16'},
    {label: '17 bottles', value: '17'},
    {label: '18 bottles', value: '18'},
    {label: '19 bottles', value: '19'},
    {label: '20 bottles', value: '20'},
    {label: '21 bottles', value: '21'},
    {label: '22 bottles', value: '22'},
    {label: '23 bottles', value: '23'},
    {label: '24 bottles', value: '24'},
  ]
  const timeList = [
    {label: '1 hour', value: '1'},
    {label: '2 hours', value: '2'},
    {label: '3 hours', value: '3'},
    {label: '4 hours', value: '4'},
    {label: '5 hours', value: '5'},
    {label: '6 hours', value: '6'},
    {label: '7 hours', value: '7'},
    {label: '8 hours', value: '8'},
    {label: '9 hours', value: '9'},
    {label: '10 hours', value: '10'},
    {label: '11 hours', value: '11'},
    {label: '12 hours', value: '12'},
    {label: '13 hours', value: '13'},
    {label: '14 hours', value: '14'},
    {label: '15 hours', value: '15'},
    {label: '16 hours', value: '16'},
    {label: '17 hours', value: '17'},
    {label: '18 hours', value: '18'},
    {label: '19 hours', value: '19'},
    {label: '20 hours', value: '20'},
    {label: '21 hours', value: '21'},
    {label: '22 hours', value: '22'},
    {label: '23 hours', value: '23'},
    {label: '24 hours', value: '24'},
  ]
  const genders = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
    {label: 'Other', value: 'other'},
  ]
  function CheckTextInput(){
    if (weight === 0) {
      Alert.alert('Please Enter Weight')
    }
    else{
      Calculate()
    }
  }

  function Calculate() {
    var litres = bottles * 0.33
    var grams = litres * 8 * 4.5
    var burning = weight / 10
    var gramsLeft = grams - (hours * burning)
  
    if (gender === 'male') {
      var result = gramsLeft / (weight * 0.7)      
    }
    else if (gender === 'female') {
      var result = gramsLeft / (weight * 0.6)
    }
    else {
      var result = gramsLeft / (weight * 0.65)
    }

    ZeroCheck()
    var roundedString = result.toFixed(2);
    setAlcoholLevel(ZeroCheck(roundedString))
  }

  function ZeroCheck(result) {
    if (result <= 0) {
      setIsDrunk(false)
      var newResult = 0
    }
    else {
      setIsDrunk(true)
      newResult = result
    } 
    return newResult
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.boldText}>Alkohoolimeter</Text>
      </View>
      <View style={styles.smallHeader}>
        <Text style={styles.smallerBoldText}>Weight</Text>
        <TextInput style={styles.placeholderText} placeholder='Input Weight..' value={weight} onChangeText={text => setWeight(text)} keyboardType='number-pad'></TextInput>
      </View>
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth, }}/>
      <View style={styles.smallHeader}>
        <Text style={styles.smallerBoldText}>Bottles</Text>
      </View>
      <Picker
          style={styles.dropDown}
          selectedValue={bottles}
          onValueChange={(itemValue)=> setBottles(itemValue) }>
            {bottleList.map((bottleList, index) => {
              return (< Picker.Item key={index} label={bottleList.label} value={bottleList.value} />);
              })}  
        </Picker>
      <View
      style={{
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth, }}/>
      <View style={styles.smallHeader}>
        <Text style={styles.smallerBoldText}>Time</Text>
      </View>
      <Picker
          style={styles.dropDown}
          selectedValue={hours}
          onValueChange={(itemValue)=> setHours(itemValue) }>
            {timeList.map((timeList, index) => {
              return (< Picker.Item key={index} label={timeList.label} value={timeList.value} />);
              })}  
        </Picker>
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth, }}/>
      <View style={styles.smallHeader}>
        <Text style={styles.smallerBoldText}>Gender</Text>
      </View>
      <RadioForm 
      style={styles.dropDown}
      buttonSize={10}
      radio_props={genders}
      initial={0}
      onPress={(value) => {setGender(value)}}
      />
      <View style={styles.header}>
        <Text style={isDrunk ? styles.redText : styles.greenText} >{alcoholLevel}</Text>
      </View>
      <Button title='Calculate' onPress={CheckTextInput}></Button>
    </View>   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header:{
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    marginTop: 50,
  },
  boldText: {
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: 30,
    color: 'blue',
  },
  smallHeader:{
    padding: 10,
    marginLeft: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  smallerBoldText:{
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 20,
  },
  placeholderText:{
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 18,
  },
  dropDown:{
    marginLeft: 13,
  },
  redText: {
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: 30,
    color: 'red',
  },
  greenText: {
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: 30,
    color: 'green',
  },
});
