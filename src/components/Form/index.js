import React, {useState} from "react"
import {View, TextInput, Text, TouchableOpacity} from "react-native"
import ResultImc from "./ResultImc"
import styles from "./style"

export default function Form(){

    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [messageImc, setMessageImc] = useState("Preencha o peso e altura")
    const [imc, setImc] = useState('')
    const [textButton, setTextButton] = useState("Calcular")

    function imcCalculator(){
        return setImc((weight/(height*height)).toFixed(2))
    }

    function validationImc(){
        if(weight != '' && height != ''){
            imcCalculator()
            setHeight('')
            setWeight('')
            setMessageImc("Seu IMC é igual a:")
            setTextButton("Calcular novamente")
            return
        }
        setMessageImc('Preencha o peso e altura')
        setImc('')
        setTextButton("Calcular")
    }

    return(
        <View style={styles.formContext}>
            <View style={styles.form}>

                <Text style={styles.formLabel}>Altura</Text> 
                <TextInput
                style={styles.input}
                placeholder="Ex. 1.75"
                inputMode="numeric"
                onChangeText={(height) => setHeight(height)}
                value={height}
                />

                <Text style={styles.formLabel}>Peso</Text>
                <TextInput
                style={styles.input}
                placeholder="Ex. 75.365"
                inputMode="numeric"
                onChangeText={(weight) => setWeight(weight)}
                value={weight}
                />

                <TouchableOpacity
                onPress={() => validationImc()} 
                style={styles.buttonCalculator}
                > 
                <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity> 

            </View>

            <ResultImc messageResultImc={messageImc} resultImc={imc}/>

        </View>
    )

}