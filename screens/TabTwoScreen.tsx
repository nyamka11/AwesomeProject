import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput, TouchableHighlight } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {BootstrapStyleSheet } from 'react-native-bootstrap-styles';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [qrData, setQRData] = useState("");
  const [count, setCount] = useState(0);
  const [scannedQRList, setScannedQRList] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setQRData(data);
    const foundQR = scannedQRList.find((obj)=> obj.code === data );
    if(foundQR == null)  {
      setScannedQRList(scannedQRList.concat({'code': data, 'count': 1}));
      setCount(1);
    } 
    else {
      foundQR.count += 1;
      setCount(foundQR.count);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ backgroundColor:"white"}}>
      <View style={{height: "100%" }}>
        {/* <BarCodeScanner 
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        /> */}

        <View style={{ backgroundColor:"white",  position: "relative", width:"100%", bottom: 0 }}>
          {scanned &&  <Button title={'Tap to Scan Again'} style={{ backgroundColor:"red", borderWidth:1, color:"black" }} onPress={() => setScanned(false)} />}

          <View style={styles.view1}>
            <Text>
              <Text style={styles.textLabel}>Data: </Text>{qrData}
            </Text>
          </View>

          <View style={styles.view2}>
            <Text>
              <Text style={styles.textLabel}>Count: </Text>{count}
            </Text>
          </View>
          <View style={styles.view3}> 
           {!count  ? 
              <TextInput style={styles.textInput} placeholder="count"/> 
              // <Button style={{ borderWidth:1, float:"left", color:"red" }}  title="OK"/>
            : null } 
          </View>
        </View>
      </View>      
    </View>
  );
}

const styles = StyleSheet.create({
  textLabel: {
    fontWeight: 'bold'
  },
  textInput: {
    width: "80%",
    height: 40,
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 8,
    borderColor: "#cacaca",
    borderWidth: 1,
    color: "black"
  },
  view1:{
    paddingLeft:15, 
    paddingTop:15,
    paddingRight:15
  },
  view2: {
    padding:15,
  },
  view3: {
    height:41,
    borderWidth:1,
    borderColor:"red"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  },
  countText: {
    color: "#FF00FF"
  }
});
