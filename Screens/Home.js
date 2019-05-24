/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,
        StyleSheet,
        Text,
        View,
        Button,
        TouchableOpacity,
        } from 'react-native';


export default class HomeScreen extends Component<Props> {
  static navigationOptions = {
	header: null,
	};

  constructor (){
    super()
    this.state ={
      resultText: "",
      calculationText: ""
    }
     this.operations = ['Del','+', '-', '*', '/']
  }

  calculateResult(){
    const text = this.state.resultText //how a computer reads the operation
    //eval is used to evaluate strings in Javascript
    console.log(text, eval(text))
    this.setState({
        calculationText: eval(text)
      })
    //eval(text)

  }

validate(){
  const text = this.state.resultText
  switch(text.slice(-1)){
    case '+':
    case '-':
    case '*':
    case '/':
      return false
  }
  return true
}

//Calcutate the percentage
Calpercentage(){
    this.setState({
    resultText: this.state.resultText / 100
    })
}

//Remove Everything on the scree

removeAll(){
  this.setState({
    resultText: "",
    calculationText: ""
  })
}

//Wordking with double signs : +/_
DoubleSign(){
    this.setState({
    resultText: '-' + this.state.resultText
 })
   if ('-' + this.state.resultText == this.state.resultText){ return

   }
}


  //When you press A button
  buttonPressed(text){
    if (text == '-'){
      return this.DoubleSign()
    }
    if (text == 'AC'){
      return this.removeAll()
    }
    if (text == '='){
      return this.validate() && this.calculateResult()
    }

    this.setState({
        resultText: this.state.resultText+text
      })
    if (text == '%'){
        return this.Calpercentage()
      }

  }

//This one is about the operand
  operate(operation){
    switch(operation){
      case 'Del':
        let text = this.state.resultText.split('')
        text.pop()
        // updating the state agian
        this.setState({
          resultText: text.join('')
          })
          break
       case '+':
       case '-':
       case '*':
       case '/':

            const lastChar = this.state.resultText.split('').pop()
            //const firsChar = this.state.resultText.split('').shift()
          // Here it is about the repetion of the signs twice : >0 is there because Delete is not a sign
            if(this.operations.indexOf(lastChar) > 0) return
            if(this.operations.indexOf(lastChar) == "") return
            this.setState({
              resultText: ""
              })
       //The validation to calculate numbers while operand are visible.
            if (this.state.text== "" ) return
            this.setState({
              resultText: this.state.resultText + operation
              })
    }
  }

  render() {
    let rows = []
    let nums = [['AC', '-', '%'], [7,8,9], [4,5,6], [1,2,3], ['.', 0, '=']]
    for(let i = 0; i<5; i++){
      let row = []
      for(let j = 0; j < 3; j++){
        row.push(<TouchableOpacity key={nums[i][j]} onPress={()=>this.buttonPressed(nums[i][j])}  style={styles.btn}>
          <Text style={styles.btntext}>{nums[i][j]}</Text>
        </TouchableOpacity>
        )
      }
      rows.push(<View key={i} style={styles.row}>{row}</View>)
    }

    let ops = []
    for(let i=0; i<5; i++){
      ops.push(<TouchableOpacity key={this.operations[i]} style={styles.btn} onPress={()=> this.operate(this.operations[i])}>
        <Text style={[styles.btntext, styles.white]}>{this.operations[i]}</Text>
      </TouchableOpacity>
      )
    }

    return (
      <View style={styles.container}>
          <View style={styles.result}>
              <Text style={styles.resultText}>{this.state.resultText}</Text>
          </View>
          <View style={styles.calculation}>
              <Text style={styles.calculationText}>{this.state.calculationText}</Text>
          </View>
          <View style={styles.buttons}>
              <View style={styles.numbers}>
                  {rows}
              </View>
              <View style={styles.operations}>
                  {ops}
              </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  result: {
      flex : 2,
      backgroundColor: '#1C1C1C',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
        resultText:{
          fontSize: 65,
          fontWeight: 'normal',
          color: 'white',
          //fontstyle: 'italic'
          },

  calculation:{
    flex:  1,
    backgroundColor: '#1C1C1C',
    justifyContent: 'center',
    alignItems: 'flex-end',

    },
        calculationText: {
          fontSize: 50,
          fontWeight: 'normal',
          color: 'white',

          },

   buttons: {
    //  flexGrow: 7,
      flex: 7,
      flexDirection: 'row',
      backgroundColor: 'black'
    },
    numbers: {
      backgroundColor: '#D4D4D2',
      flex: 3,
    },
    btntext: {
      fontSize: 30,
      },
    white: {
      color: 'black',
      },
        btn:{
          flex: 1,
          alignItems: 'center',
          alignSelf: 'stretch',
          justifyContent: 'center',
          },

    row: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      },

    operations: {
      flex: 1,
      backgroundColor: '#FF9500',
      justifyContent: 'space-around',
      alignItems: 'center',
      },
});
