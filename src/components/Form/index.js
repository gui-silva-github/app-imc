import React, {useState} from "react"
import {View, TextInput, Text, TouchableOpacity, Vibration, Pressable, Keyboard, FlatList} from "react-native"
import ResultImc from "./ResultImc"
import styles from "./style"

export default function Form(){

    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [messageImc, setMessageImc] = useState("Preencha o peso e altura")
    const [imc, setImc] = useState('')
    const [textButton, setTextButton] = useState("Calcular")
    const [errorMessage, setErrorMessage] = useState("")
    const [imcList, setImcList] = useState([])

    function imcCalculator(){

        let heightFormat = height.replace(",", ".")

        let totalImc = (weight/(heightFormat*heightFormat)).toFixed(2)

        setImcList((arr) => [...arr, {id: new Date().getTime(), imc: totalImc}])
        setImc(totalImc)
    }

    function verificationImc(){

        if(imc == ""){
            Vibration.vibrate()
            setErrorMessage("campo obrigatório*")
        }

    }

    function validationImc(){
        if(weight != '' && height != ''){
            imcCalculator()
            setHeight('')
            setWeight('')
            setMessageImc("Seu IMC é igual a:")
            setTextButton("Calcular novamente")
            setErrorMessage("")
        } else {
            verificationImc()
            setMessageImc('Preencha o peso e altura')
            setImc('')
            setTextButton("Calcular")
        }
    }

    return(
            <View style={styles.formContext}>
                {imc == "" ?
                <Pressable onPress={Keyboard.dismiss} style={styles.form}>
                    <Text style={styles.formLabel}>Altura</Text> 
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    <TextInput
                    style={styles.input}
                    placeholder="Ex. 1.75"
                    inputMode="numeric"
                    onChangeText={(height) => setHeight(height)}
                    value={height}
                    />

                    <Text style={styles.formLabel}>Peso</Text>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
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
                    
                    <Text style={styles.information}>{messageImc}</Text> 

                </Pressable>
                :
                    <View style={styles.exhibitionResultImc}>
                        <ResultImc messageResultImc={messageImc} resultImc={imc}/>
                        <TouchableOpacity
                        onPress={() => validationImc()} 
                        style={styles.buttonCalculator}
                        > 
                        <Text style={styles.textButtonCalculator}>{textButton}</Text>
                        </TouchableOpacity> 
                    </View>
                }
                <FlatList
                showsVerticalScrollIndicator={false}
                style={styles.listImcs}
                data={imcList.reverse()}
                renderItem={({item}) =>{
                    return(
                        <Text style={styles.resultImcItem}>
                            <Text style={styles.textResultItemList}>Resultado IMC = </Text>
                            {item.imc}
                        </Text>
                    )
                }}
                keyExtractor={(item)=>{
                    item.id
                }}/>
            </View>
    )

}