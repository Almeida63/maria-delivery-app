import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import PosCompra from './PosCompra';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
 
const TelaCompra = ({ route }) => {
  const [cep, setCep] = useState('');
  const [bairro, setBairro] = useState('');
  const [metodoPagamento, setMetodoPagamento] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numeroCartao, setNumeroCartao] = useState('');
  const [senhaCartao, setSenhaCartao] = useState('');
  const [chavePix, setChavePix] = useState('');
  const {valorFinal} = route.params;
  const navigation = useNavigation();

   useEffect(() => {
    if (route.params?.dadosCompra) {
      console.log('Dados da compra:', route.params.dadosCompra);
    }
  }, [route.params?.dadosCompra]);

   const buscarDadosCEP = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const dadosCEP = await response.json();

      if (!dadosCEP.erro) {
        setBairro(dadosCEP.bairro);
        setEndereco(dadosCEP.logradouro);
      } else {
        console.error('CEP não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar dados do CEP', error);
    }
  };

 const opcoesPagamento = ['Débito', 'Crédito', 'Pix'];

  const selecionarMetodoPagamento = (opcao) => {
    setMetodoPagamento(opcao);
    setNumeroCartao('');
    setSenhaCartao('');
    setChavePix('');
  };

 
const finalizarCompra = () => {

  console.log('Dados da compra:', {
    cep,
    bairro,
    endereco,
    metodoPagamento,
    numeroCartao: metodoPagamento === 'Débito' || metodoPagamento === 'Crédito' ? numeroCartao : null,
    senhaCartao: metodoPagamento === 'Débito' || metodoPagamento === 'Crédito' ? senhaCartao : null,
    chavePix: metodoPagamento === 'Pix' ? chavePix : null,
    valorFinal,
  });

  navigation.navigate('PosCompra', { dadosCompra: {cep,bairro,endereco,metodoPagamento,valorFinal } });
};
   return (
    <View style={styles.container}>
      <Text style={styles.title}>Finalizar Compra</Text>
      <TextInput
        style={styles.input}
        placeholder="CEP"
        value={cep}
        onChangeText={(text) => setCep(text)}
        onBlur={buscarDadosCEP}
      />
      <TextInput
        style={styles.input}
        placeholder="Bairro"
        value={bairro}
        onChangeText={(text) => setBairro(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={(text) => setEndereco(text)}
      />
      <Text style={styles.label}>Método de Pagamento:</Text>
      {opcoesPagamento.map((opcao) => (
        <TouchableOpacity
          key={opcao}
          style={styles.opcaoPagamento}
          onPress={() => selecionarMetodoPagamento(opcao)}
        >
          <View style={styles.radioContainer}>
            <MaterialIcons
              name={metodoPagamento === opcao ? 'radio-button-checked' : 'radio-button-unchecked'}
              size={24}
              color="black"
            />
            <Text>{opcao}</Text>
          </View>
        </TouchableOpacity>
      ))}
      {metodoPagamento === 'Débito' || metodoPagamento === 'Crédito' ? (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Número do Cartão"
            value={numeroCartao}
            onChangeText={(text) => setNumeroCartao(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha do Cartão"
            secureTextEntry
            value={senhaCartao}
            onChangeText={(text) => setSenhaCartao(text)}
          />
        </View>
      ) : null}
      {metodoPagamento === 'Pix' ? (
        <TextInput
          style={styles.input}
          placeholder="Chave Pix"
          value={chavePix}
          onChangeText={(text) => setChavePix(text)}
        />
      ) : null}
      <Text style={styles.label}>Valor Final: {valorFinal.replace('.', ',')}</Text>
      <Button title="Finalizar Compra" onPress={finalizarCompra} />
    </View>
  );
};
 
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  opcaoPagamento: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
});
 
export default TelaCompra;

