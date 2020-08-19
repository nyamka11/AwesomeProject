import React, { useState } from 'react';
import { View,  Platform, TextInput, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


export const DatePicker = (props) => {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [value, setValue] = useState(props.Text);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let d = new Date(currentDate);
        setValue(" "+d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear());
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const onCancel = () => {
        setShow(false);
        setValue(props.Text);
    };

    const onConfirm = () => {
        setShow(false);
    };

    return (
        <View style={{ width: "90%"}}>
            <View>
                <Button
                    icon={
                        <Icon
                          name="calendar"
                          size={15}
                          color="black"
                        />
                    }
                    title={value}
                    type="outline"
                    onPress={ showDatepicker }
                />
            </View>
            {show && (
                <View style ={{ position: "relative", borderWidth:1, width:"100%", zIndex: 1000, backgroundColor: "white" }}>
                    <View style={{flexDirection: 'row'}}>
                        <View >
                            <Button
                                title="Cancel"
                                style={{ width:100, height:35 }}
                                type="clear"
                                onPress={ onCancel }
                            />
                        </View>
                        <View style={{marginLeft: 'auto'}} >
                            <Button
                                title="Confirm"
                                style={{ width:100, height:50, height:35 }}
                                type="clear"
                                onPress={ onConfirm }
                            />
                        </View>
                    </View>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        textColor="black"
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        borderRadius: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderColor: "red",
        borderWidth: 1,
        color: "black",
        backgroundColor: "white",
        height:40
    }
});
