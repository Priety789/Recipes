import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';

export default class WriteRecipeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            recipe: ''
        }
    }
    submitRecipe = () => {
        db.collection('food').add({
            title: this.state.title,
            author: this.state.author,
            recipe: this.state.recipe
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Header
                    backgroundColor={"pink"}
                    centerComponent={{
                        text: "My Recipes Yasss",
                        style: {color: 'white', fontSize: 20}
                    }} />
                <TextInput
                    placeholder="recipe name"
                    onChangeText={(text) => {
                        this.setState({
                            title: text
                        })
                    }}
                    value={this.state.title}
                    style={styles.title} />
                <TextInput
                    placeholder="author"
                    onChangeText={(text) => {
                        this.setState({
                            author: text
                        })
                    }}
                    value={this.state.author}
                    style={styles.author} />
                <TextInput
                    placeholder="recipe"
                    multiline={true}
                    onChangeText={(text) => {
                        this.setState({
                            recipe: text
                        })
                    }}
                    value={this.state.recipe}
                    style={styles.recipeText} />
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={this.submitRecipe}>
                    <Text style={styles.buttonText}>
                        Submit WOO!!
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7987AD',
    },
    title: {
        height: 40,
        borderWidth: 2,
        marginTop: 40,
        padding: 10,
        margin: 10,
    },
    author: {
        height: 40,
        borderWidth: 2,
        padding: 10,
        margin: 10
    },
    recipeText: {
        height: 250,
        borderWidth: 2,
        margin: 10,
        padding: 10,
    },
    submitButton: {
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#7912BE',
        width: '35%',
        height: 40,
    },
    buttonText: {
        textAlign: 'center',
        color: '#ADE876',
        fontWeight: 'bold'
    }
})