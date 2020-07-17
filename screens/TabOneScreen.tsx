    import * as React from 'react';
    import { StyleSheet, TextInput, Button, ScrollView, SafeAreaView } from 'react-native';


    import { Text, View } from '../components/Themed';
    import DropDownPicker from 'react-native-dropdown-picker';

    let data =[
        {
            name: "Shoseee",
            input1: "Count",
            input2: "Start date",
            input3: "End date",
            input4: "Description"
        },
        {
            name: "Rise",
            input1: "Count",
            input2: "Start date",
        },
        {
            name: "Juice",
            input1: "Count",
            input3: "End date",
            input4: "Description"
        },
        {
            name: "Wather",
            input1: "Count",
            input4: "Description"
        },
        {
            name: "Cup",
            input1: "Count",
            input2: "Start date",
            input3: "End date",
            input4: "Description"
        },
    ];

    class DropDownComponent extends React.Component  {
        constructor(props)  {
            super(props);
        }

        render()  {
            let items = [];
            data.map((row) => {
                items.push({label: row.name, value: row.name })
            })

            return(
                <DropDownPicker
                    style={{ width:"90%", display: "flex" }}
                    items={ items }
                    defaultIndex={ 5 }
                    containerStyle={{display: "flex"}}
                    activeItemStyle={{ alignItems: 'center' }}
                    activeLabelStyle={{ color: 'red' }}
                    containerStyle={{ height: 40 }}
                    dropDownMaxHeight = { 400 }
                    dropDownStyle = {{ width:"90%" }}
                    itemStyle={{ backgroundColor: "green",  float:"left", alignItems: 'flex-start' }}
                    onChangeItem={ (selectedItem) =>{ this.props.onChange(selectedItem) }}
                />
            )
        }
    }

    export default class TabOneScreen extends React.Component {
        constructor(props)  {
            super(props);
            this.state = {
                items: ""
            };
            this.onChange = this.onChange.bind(this);
            this.btnIshide = true;
        }

        onChange(selectedItem)  {
            data.map((row) => 　{
                if(selectedItem.label == row.name)  {
                    this.setState({ items: row });
                }
            });
        }

        componentDidUpdate()  {

        }

        render()  {
            const items = [];
            Object.entries(this.state.items).map(([key,value],i) =>  {
                items.push(<TextInput
                    style={ styles.textInput }
                    placeholder={ value }
                    placeholderTextColor="#cacaca"
                />);
            });

            return (
                // <SafeAreaView style={styles.container}>
                //     <ScrollView style={ styles.scrollView }>
                    <View style={ styles.container }>
                        <DropDownComponent onChange = { this.onChange } />
                        {items}
                        <Button
                            style = { styles.button  }
                            title="Register"
                            onPress={() => { alert("OK")  }}
                        />
                    </View>
                    // </ScrollView>
                // </SafeAreaView>
            );
        }
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
            width: "90%",
            borderRadius: 5,
            marginVertical: 5,
            borderColor: 'gray',
            borderWidth: 1
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
