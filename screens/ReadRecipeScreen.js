import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { Header, SearchBar } from 'react-native-elements';
import db from '../config';

export default class ReadRecipeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            dataSource: [],
            allRecipes: []
        }
    }
    componentDidMount() {
        this.retrieveRecipes()
    }
    updateSearch = search => {
        this.setState({search})
    }
    retrieveRecipes = () => {
        try {
            var allRecipes = []
            var recipe = db.collection("food")
                .get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        allRecipes.push(doc.data())
                    })
                    this.setState({ allRecipes })
                })
        }
        catch (error) {
            console.log(error)
        }
    }
    searchFilterFunction(text) {
        const newData = this.state.allRecipes.filter((item) => {
            const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            dataSource: newData,
            search: text
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Header
                    backgroundColor={"pink"}
                    centerComponent={{
                        text: "My Recipes Yasss",
                        style: { color: 'white', fontSize: 20 }
                    }} />
                <View styles={{ height: 20, width: '100%' }}>
                    <SearchBar
                        placeholder="type here ..."
                        onChangeText={text => this.searchFilterFunction(text)}
                        onClear={text => this.searchFilterFunction('')}
                        value={this.state.search}
                    />
                </View>
                <FlatList
                    data={this.state.search === '' ? this.state.allRecipes : this.state.dataSource}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text>
                                Title: {item.title}
                            </Text>
                            <Text>
                                Author: {item.author}
                            </Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={{
                    flex: 0.3,
                    marginLeft: 100}}>
                    <Image
                        source={require("../assets/cartoon-jazz.jpg")}
                        style={styles.recipeImage}
                    />
                </View>
            </View>
            )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFF',
    },
    item: {
        backgroundColor: 'pink',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    itemContainer: {
        height: 80,
        width: '100%',
        borderWidth: 2,
        borderColor: 'pink',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    recipeImage: {
        width: '70%',
        height: 200,
        resizeMode: 'stretch'
    }
})