import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import Tarefa from "./src/Tarefa";

export default function App() {
  const [tarefa, setTarefa] = useState("");
  const [list, setList] = useState([]);

  function handleAdd() {
    if (tarefa === "") {
      return;
    } else {
      let dados = {
        key: Date.now(),
        item: tarefa,
      };
      setList((oldArray) => [dados, ...oldArray]);
      setTarefa("");
    }
  }

  function handleDelete(item) {
    let filterItem = list.filter((tarefa) => {
      return tarefa.key !== item;
    });
    setList(filterItem);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas</Text>

      <View style={styles.containerInput}>
        <TextInput
          onChangeText={(e) => setTarefa(e)}
          style={styles.input}
          value={tarefa}
          placeholder="Digite sua tarefa..."
          placeholderTextColor="#fff" 
        />
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <FontAwesome name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.list}
        data={list}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Tarefa data={item} deleteItem={() => handleDelete(item.key)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b1f24",
    paddingTop: 28,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#fff",
    marginTop: "5%",
    paddingStart: "5%",
    marginBottom: 12,
  },
  containerInput: {
    flexDirection: "row",
    width: "100%",
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },
  input: {
    width: "75%",
    backgroundColor: "rgba(196, 196, 196, 0.20)",
    height: 44,
    borderRadius: 4,
    paddingHorizontal: 8,
    color: "#fff",
  },

  buttonAdd: {
    width: "15%",
    height: 44,
    backgroundColor: "#73f7ff",
    marginLeft: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  list: {
    flex: 1,
    paddingStart: "4%",
    paddingEnd: "4%",
    backgroundColor: '#22272e'
  },
});
