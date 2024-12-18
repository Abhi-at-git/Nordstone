import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";

const API_URL = "https://nordstone-backend.onrender.com/calculate";
 // Backend URL

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handlePress = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleClear = () => {
    setInput("");
    setResult("");
  };

  const handleCalculate = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ expression: input }),
      });

      if (!response.ok) {
        throw new Error("Invalid Expression");
      }

      const data = await response.json();
      setResult(data.result.toString());
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const renderButton = (value) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => handlePress(value)}
    >
      <Text style={styles.buttonText}>{value}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.inputText}>{input}</Text>
        <Text style={styles.resultText}>{result}</Text>
      </View>

      <View style={styles.row}>
        {renderButton("7")}
        {renderButton("8")}
        {renderButton("9")}
        {renderButton("/")}
      </View>
      <View style={styles.row}>
        {renderButton("4")}
        {renderButton("5")}
        {renderButton("6")}
        {renderButton("*")}
      </View>
      <View style={styles.row}>
        {renderButton("1")}
        {renderButton("2")}
        {renderButton("3")}
        {renderButton("-")}
      </View>
      <View style={styles.row}>
        {renderButton("0")}
        {renderButton(".")}
        <TouchableOpacity style={styles.button} onPress={handleCalculate}>
          <Text style={styles.buttonText}>=</Text>
        </TouchableOpacity>
        {renderButton("+")}
      </View>
      <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={handleClear}>
        <Text style={styles.buttonText}>C</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
    padding: 10,
  },
  display: {
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  inputText: {
    color: "#fff",
    fontSize: 24,
    textAlign: "right",
  },
  resultText: {
    color: "#00e676",
    fontSize: 32,
    textAlign: "right",
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    flex: 1,
    height: 60,
    margin: 5,
    backgroundColor: "#6200ee",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  clearButton: {
    backgroundColor: "#d50000",
    marginTop: 20,
  },
});

export default Calculator;
