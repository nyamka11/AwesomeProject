
    import  React, { useState, useEffect } from 'react';
    import { ActivityIndicator, StyleSheet, TextInput, ScrollView, SafeAreaView } from 'react-native';
    import { Text, View } from '../components/Themed';
    import DropDownPicker from 'react-native-dropdown-picker';
    import { DatePicker } from '../components/DatePicker';
    import { QRreader } from '../components/QR-reader';
    import { MapGps } from '../components/Map_gps';
    import { NativeRouter, Route, Link, Redirect, withRouter } from "react-router-native";
    import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

    const initialState = {
        latitude: null,
        longitude: null,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    function TabOneScreen()  {
        let basicURL = "http://ec2-107-23-240-208.compute-1.amazonaws.com/api/";
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);
        const [catalogs, setCatalogs] = useState([]);
        const [fields, setFields] = useState([]);
        const [date, setDate] = useState(new Date())
        const [isQRReader, setIsQRReader] = useState(false)
        const [isMap, setIsMap] = useState(false)
        const [curentPosition, setCurentPosition] = useState(initialState);

        useEffect(() =>  {
            getAPI("catalog.php",(result) =>  {
                setCatalogs(result);
            });

            navigator.geolocation.getCurrentPosition(position => {
                const { longitude, latitude } = position.coords;
                setCurentPosition({
                    ...curentPosition,
                    latitude,
                    longitude
                })
              },
                error => alert(error.message),
                { timeout: 20000, maximumAge: 1000 }
                
            )
        },[]);

        const getAPI = (URL, onSuccess) =>  {
            fetch(basicURL + URL)
            .then(res => res.json())
            .then(
                (result) => {
                    onSuccess(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
        }

        const onChange = (item) =>  {
            setIsLoaded(true);
            getAPI("fields.php?catalogid="+item.value,
            (result) =>  {
                setIsLoaded(false);
                setFields(result);
            });
        }

        const FieldDraw = () =>  {
            if(fields.length > 0)  {
                return fields.map((item)=> {
                    return <TextInput
                        key = { item.id }
                        style={ styles.textInput }
                        placeholder={ item.name }
                        placeholderTextColor="#cacaca"
                    />
                });
            }
            else  {
                return <Text style={styles.text}>Fields not found!</Text>
            }
        }

        if(isMap) return(
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                showsUserLocation
                initialRegion={curentPosition}
            />
        );
        else if(isQRReader) return <QRreader/>
        else return (
            <NativeRouter>
            <View style={styles.container}>
                <DropDownPicker
                    style={{ width:"90%", display: "flex", borderColor: "gray" }}
                    items={
                        catalogs.map((row) => {
                            return { label: row.name, value: row.id }
                        })
                    }
                    defaultIndex={ 5 }
                    containerStyle={{display: "flex"}}
                    activeItemStyle={{ alignItems: 'center' }}
                    activeLabelStyle={{ color: 'green' }}
                    containerStyle={{ height: 40 }}
                    dropDownMaxHeight = { 400 }
                    dropDownStyle = {{ width:"90%" }}
                    itemStyle={{ float:"left", alignItems: 'flex-start' }}
                    labelStyle={{fontSize: 18, color: '#000'}}
                    onChangeItem={(selectedItem) =>{ onChange(selectedItem) }}
                />
                { !isLoaded &&
                    <View style={{ width: "100%",flex: 1, alignItems: 'center',backgroundColor: "white" }}>
                        <FieldDraw />
                        <DatePicker Text=" Start date" />
                        <DatePicker Text=" End date" />
                    </View>
                }

                <View style={{borderWidth:1, width:"90%", height:50, flexDirection: "row", flexWrap: "wrap", borderRadius:5  }}>
                    <View 
                        style={{flex: 1, alignItems: "center", justifyContent: "center", width:"100%", height:"100%", backgroundColor:"green"}}
                        onStartShouldSetResponder={() => setIsQRReader(true) }
                    >
                        <Text style={{color:"white"}}>QR code</Text>
                    </View>
                </View>

                <View style={{borderWidth:1, width:"90%", height:50, flexDirection: "row", flexWrap: "wrap", borderRadius:5 , marginTop:5 }}>
                    <View 
                        style={{flex: 1, alignItems: "center", justifyContent: "center", width:"100%", height:"100%", backgroundColor:"green"  }}
                        onStartShouldSetResponder={() => setIsMap(true) }
                    >
                        <Text style={{color:"white"}}>GPS</Text>
                    </View>
                </View>

                <ActivityIndicator
                    style={{ height: 80 }}
                    color="green"
                    size="large"
                    animating ={ isLoaded }
                />
            </View>
            </NativeRouter>
        );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            // justifyContent: 'center',
            paddingTop: 20,
            backgroundColor: "white"
        },
        text: {
            marginTop:10,
            fontSize: 20,
            color: "black"
        },
        button: {
            backgroundColor:"blue",
            marginTop: 18,
            display: 'none'
        },
        scrollView: {
            backgroundColor: 'pink',
            height: "100%"
        },
        textInput: {
            width: "90%",
            height: 40,
            borderRadius: 5,
            paddingLeft: 15,
            paddingRight: 15,
            marginTop: 8,
            borderColor: "#cacaca",
            borderWidth: 1,
            color: "black"
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
        },
        separator: {
            marginVertical: 30,
            height: 1,
            width: '80%',
        },
    });

    export default TabOneScreen
