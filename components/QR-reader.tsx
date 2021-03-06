import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput, ScrollView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export const QRreader = (props)=> {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [qrData, setQRData] = useState("");
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");
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

    const foundQR = scannedQRList.find((obj)=> obj.code === data);
    if(foundQR == null)  { //Amgiin ahnii vyd shineer unshigdah 
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

  const countHandler = (event) => {
      setValue(event.nativeEvent.text);
  };

  const okBtn = ()=> {
    console.log(value);
    setCount(parseInt(count) + parseInt(value || 0));
    const foundQR1 = scannedQRList.find((obj)=> obj.code === qrData);
    if(foundQR1 == null)  { //Amgiin ahnii vyd shineer unshigdah 
      setScannedQRList(scannedQRList.concat({'code': qrData, 'count': 1}));
      setCount(1);
    }
    else {
      foundQR1.count = (parseInt(count) + parseInt(value || 0));
      setCount(foundQR1.count);
    }
    setValue("");
  }

  if(scanned) return (      
    <View style={styles.box}>
      <View style={styles.inner}>
        <Text>Data: {qrData}</Text>
        <Text>Count: {count}</Text>
        <TextInput style={styles.textInput} value={ value } onChange={countHandler} placeholder="Quantity"/> 
        <Button title={'OK'} onPress={() => okBtn()} />
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>      
      <View style={styles.camerBox}>
        <View style={styles.inner}>
          <BarCodeScanner 
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          {/* <Button title={'back'} onPress={() => setState()} />  */}
        </View>
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width:"100%",
    height: "100%",
    padding: 5,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  scrollView: {
    height:"100%",
    backgroundColor: 'pink'
  },
  camerBox: {
    width: "100%",
    height: "100%",
    padding: 5
  },
  box:  {
    width: "100%",
    height: "100%",
    padding: 5
  }, 
  inner: {
    flex: 1,
    backgroundColor: "#cacaca",
    alignItems: "center",
    justifyContent: "center"  
  },
  textInput: {
    width: "80%",
    height: 40,
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 8,
    borderColor: "black",
    borderWidth: 1,
    color: "black"
  }
});
