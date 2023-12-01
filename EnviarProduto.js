import React, { useState, useEffect } from 'react';
import { View, TextInput, Image, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const EnviarProduto = ({ onEnviarProduto }) => {
  const [nomeProduto, setNomeProduto] = useState('');
  const [descricao, setDescricao] = useState('');
  const [vendedor, setVendedor] = useState('');
  const [imagemProduto, setImagemProduto] = useState('');
  const [preco, setPreco] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Desculpe, precisamos das permissões da câmera para fazer isso funcionar!');
      }
    })();
  }, []);

  const handleEscolherImagem = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImagemProduto(result.uri);
      }
    } catch (error) {
      console.error('Erro ao escolher a imagem', error);
    }
  };

   const camposPreenchidos = () => {
    return nomeProduto !== '' && descricao !== '' && vendedor !== '' && preco !== '' && imagemProduto !== '';
  };


  const handleEnviarProduto = () => {
    if (!camposPreenchidos()) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos antes de enviar a foto.');
      return;
    }
    const novoProduto = {
      nome: nomeProduto,
      descricao,
      vendedor,
      imagem: imagemProduto,
      preco: parseFloat(preco),
    };

    
    onEnviarProduto(novoProduto);

   
    setNomeProduto('');
    setDescricao('');
    setVendedor('');
    setImagemProduto('');
    setPreco('');
  };

  return (
    <View style={styles.container}>
      <Text>Enviar Produto</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={nomeProduto}
        onChangeText={(text) => setNomeProduto(text)}
      />
      <TextInput
      style={styles.input}
      placeholder="Descrição"
      value={descricao}
      onChangeText={(text) => setDescricao(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Vendedor"
        value={vendedor}
        onChangeText={(text) => setVendedor(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço"
        value={preco}
        onChangeText={(text) => setPreco(text)}
        keyboardType="numeric" 
      />
      <TouchableOpacity onPress={handleEscolherImagem}style={styles.botao} >
        <Text style={styles.enviarButton}>Escolher Imagem</Text>
      </TouchableOpacity>
      {imagemProduto !== '' && (
        <Image source={{ uri: imagemProduto }} style={{ width: 200, height: 200, marginVertical: 10 }} />
      )}
      <TouchableOpacity onPress={handleEnviarProduto} style={styles.botao}>
        <Text style={styles.enviarButton}>Enviar Produto</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 8,
    padding: 8,
  },
  enviarButton: {
    backgroundColor: 'blue',
    color: 'white',
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
  },
  botao: {
    marginTop: 10,
  },
});

export default EnviarProduto;