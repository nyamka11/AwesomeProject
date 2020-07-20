
    import  React, { useState, useEffect } from 'react';
    import { ActivityIndicator, StyleSheet, TextInput, Button, ScrollView, SafeAreaView } from 'react-native';


    import { Text, View } from '../components/Themed';
    import DropDownPicker from 'react-native-dropdown-picker';


    function TabOneScreen()  {
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);
        const [catalogs, setCatalogs] = useState([]);
        const [fields, setFields] = useState([]);

        useEffect(()=>  {
            getAPI("http://ec2-107-23-240-208.compute-1.amazonaws.com/api/catalog.php", function(result)  {
                setCatalogs(result);
            });
        });

        function getAPI(URL, onSuccess)  {
            fetch(URL)
            .then(res => res.json())
            .then(
                (result) => {
                    onSuccess(result);
                    // console.log(result)
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
        }

        const onChange=(item) =>  {
            setIsLoaded(true);
            getAPI("http://ec2-107-23-240-208.compute-1.amazonaws.com/api/fields.php?catalogid="+item.value, function(result)  {
                setIsLoaded(false);
                setFields(result);
            });
        }

        function FieldDraw()  {
            if(fields.length > 0)  {
                return fields.map((item)=> {
                    return <TextInput
                        style={ styles.textInput }
                        placeholder={ item.name }
                        placeholderTextColor="#cacaca"
                    />
                });
            }
            else {
                return <Text style={styles.text}>Fields not found!</Text>
            }
        }

        return (
            <View style={styles.container}>
                <DropDownPicker
                    style={{ width:"90%", display: "flex" }}
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
                    onChangeItem={(selectedItem) =>{ onChange(selectedItem) }}
                />
                { !isLoaded && <FieldDraw /> }
                <ActivityIndicator
                    style={{ height: 80 }}
                    color="green"
                    size="large"
                    animating ={ isLoaded }
                />

            </View>
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
        textInput: {
            paddingLeft:15,
            paddingRight:15,
            height: 40,
            width: "100%",
            borderRadius: 5,
            marginVertical: 5,
            borderColor: 'gray',
            borderWidth: 1
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
            borderColor: "gray",
            borderWidth: 1
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
