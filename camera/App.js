import { useState, useRef } from 'react'

import { StyleSheet, SafeAreaView, Button, Text, View, TouchableOpacity, Modal, Image } from 'react-native'
import { CameraView, useCameraPermissions } from 'expo-camera'

import { FontAwesome } from "@expo/vector-icons"

export default function App() {

  const camRef = useRef(null)
  const [facing, setFacing] = useState('back')
  const [permission, requestPermission] = useCameraPermissions()

  const [capturedPhoto, setCapturedPhoto] = useState(null)

  const [open, setOpen] = useState(false)

  if(!permission){
    return <View/>
  }

  if(!permission.granted){
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Nós precisamos da sua permissão para usar a câmera</Text>
        <Button onPress={requestPermission} title="Ceder permissão" />
      </View>
    )
  }

  async function takePicture(){

    if(camRef){
      const data = await camRef.current.takePictureAsync()
      setCapturedPhoto(data.uri)
      setOpen(true)
    }

  }

  return (
   <SafeAreaView style={styles.container}>
      <CameraView
      style={styles.camera}
      facing={facing}
      ref={camRef}
      >
      <View style={styles.contentButtons}>
        <TouchableOpacity
        style={styles.buttonFlip}
        onPress={() => {
          setFacing(
            facing =>
            (facing === 'back' ? 'front' : 'back')
          )
        }}
        >
        <FontAwesome name="exchange" size={23} color="red"></FontAwesome>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.buttonCamera}
        onPress={takePicture}
        >
        <FontAwesome name="camera" size={23} color="#fff"></FontAwesome>
        </TouchableOpacity>
      </View>
      </CameraView>
      {capturedPhoto && (
        <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        >
          <View style={styles.contentModal}>
            <TouchableOpacity
            style={styles.closeButton}
            onPress={()=> {setOpen(false)}}
            >  
              <FontAwesome name="close" size={50} color="#fff"></FontAwesome>
            </TouchableOpacity>
            <Image style={styles.imgPhoto} source={{uri: capturedPhoto}}/>
          </View>
        </Modal>
      )}
      
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  camera: {
    width: "100%",
    height: "100%",
  },
   message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  contentButtons: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row"
  },
  buttonFlip: {
    position: "absolute",
    bottom: 50,
    left: 30,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    backgroundColor: "white",
    height: 50,
    width: 50,
    borderRadius: 50
  },
  buttonCamera: {
    position: "absolute",
    bottom: 50,
    right: 30,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    backgroundColor: "red",
    height: 50,
    width: 50,
    borderRadius: 50
  },
  contentModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    margin: 20
  },
  closeButton: {
    position: "absolute",
    top: 10,
    left: 2,
    margin: 10
  },
  imgPhoto: {
    width: "100%",
    height: 400
  }
});
