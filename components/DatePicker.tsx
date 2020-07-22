import React, { useState } from 'react';
import { View, Button, Platform, TextInput, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export const DatePicker = () => {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
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

    // <Button onPress={showTimepicker} title="Show time picker!" />
    return (
        <View style={{ width: "90%", backgroundColor: "green"}}>
            <View>
                <TextInput style={styles.textInput} onFocus={showDatepicker} />
                <div>asdasdf</div>
            </View>
            {show && (
                <DateTimePicker
                    style ={{ }}
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    textColor="black"
                />
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
