import React from 'react';
import { StyleSheet, TextInput, View, Keyboard, Button } from 'react-native';
import { Feather, Entypo } from "@expo/vector-icons";

const SearchBar = ({ clicked, searchPhrase, setSearchPhrase, setClicked }) => {
  return (
    <View style={styles.container}>
      <View
        style={
          clicked
            ? styles.searchBar__clicked
            : styles.searchBar__unclicked
        }
      >
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => setClicked(true)}
        />
        {clicked && (
          <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
              setSearchPhrase("")
          }}/>
        )}
      </View>
      {/* cancel button, depending on whether the search bar is clicked or not */}
      {clicked && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
              setSearchPhrase("")
            }}
          ></Button>
        </View>
      )}
    </View>
  );
};
export default SearchBar;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    width: "95%",
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "70%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    marginRight: 15,
    marginBottom: 10,
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
});