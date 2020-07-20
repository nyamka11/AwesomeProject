    import * as React from 'react';
    import { StyleSheet, TextInput, Button } from 'react-native';

    import EditScreenInfo from '../components/EditScreenInfo';
    import { Text, View } from '../components/Themed';
    import DropDownPicker from 'react-native-dropdown-picker';


    let data =[
        {
            name: "Shossss eee",
            input1: "Couss nt",
            input2: "Start date",
            input2: "End date",
            input3: "Description"
        },
        {
            name: "Rise",
            input1: "Count",
            input2: "Start date",
            input2: "End date",
            input3: "Description"
        },
        {
            name: "Juice",
            input1: "Count",
            input2: "Start date",
            input2: "End date",
            input3: "Description"
        },
        {
            name: "Wather",
            input1: "Count",
            input2: "Start date",
            input2: "End date",
            input3: "Description"
        },
    ];

    function RegisterComponent(props) {
        return (
            <TextInput
                style={ styles.textInput }
                placeholder = { props.name }
            />
        );
    }

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
                items: []
            };
        }

        onChange(selectedItem)  {
            let selectedRow = [];
            data.map((row) => 　{
                if(selectedItem.label == row.name)  {
                    selectedRow.push(row);
                }
            });

            this.setState({
                items: selectedRow
            });

            // console.log(selectedRow);
        }

        render()  {
            return (
                <View style={ styles.container }>
                    <DropDownComponent onChange = { this.onChange }/>
                    <RegisterComponent />
                </View>
            );
        }
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: 20
      },
      textInput: {
        width: "90%",
        height: 40,
        borderRadius: 5,
        paddingLeft: 15,
        paddingRight: 15,
        marginVertical: 10,
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
