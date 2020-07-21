
    import  React, { useState, useEffect } from 'react';
    import { ActivityIndicator, StyleSheet, TextInput, Button, ScrollView, SafeAreaView } from 'react-native';
    import { Text, View } from '../components/Themed';
    import DropDownPicker from 'react-native-dropdown-picker';
    import { DatePicker } from '../components/DatePicker';

    function TabOneScreen()  {
        let basicURL = "http://ec2-107-23-240-208.compute-1.amazonaws.com/api/";
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);
        const [catalogs, setCatalogs] = useState([]);
        const [fields, setFields] = useState([]);
        const [date, setDate] = useState(new Date())

        useEffect(() =>  {
            getAPI("catalog.php",(result) =>  {
                setCatalogs(result);
            });
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

        return (
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
                { !isLoaded && <FieldDraw /> }
                <ActivityIndicator
                    style={{ height: 80 }}
                    color="green"
                    size="large"
                    animating ={ isLoaded }
                />
                <DatePicker/ >
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
