import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import api from './services/Api';

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      console.log(response.data);
      setProjects(response.data);
    });
  }, []);

 async function handleAddProject() {
  const res = await api.post('projects', {
    title: `Novo Projeto ${Date.now()}`,
    owner: 'KauãWds' 
  });

  const project = res.data;
  setProjects([...projects, project])
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

      <SafeAreaView style={styles.container} >
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.textTest} key={project.id}>{project.title}</Text>
          )}></FlatList>

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={ handleAddProject }>
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>

    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#7159c1',
  },
  textTest: {
    // flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center'

  },

  button: {
    backgroundColor: '#fff',
    margin: 30,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    fontSize: 16,
    color: '#7159c1'
  }

})