import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PosCompra = ({ route }) => {
  const dadosCompra = route.params?.dadosCompra;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedido em andamento</Text>
      <Text style={styles.subtitle}>Seu pedido está a caminho!</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>CEP: {dadosCompra && dadosCompra.cep}</Text>
        <Text style={styles.infoText}>
          Endereço: {dadosCompra && dadosCompra.endereco}, {dadosCompra && dadosCompra.bairro}
        </Text>
        <Text style={styles.infoText}>
          Método de Pagamento: {dadosCompra.metodoPagamento ?? 'N/A'}
        </Text>
        {/* Adicione outros detalhes da compra conforme necessário */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0', // Cor de fundo
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333', // Cor do texto
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 16,
    color: '#666', // Cor do texto
  },
  infoContainer: {
    backgroundColor: '#fff', // Cor de fundo do container de informações
    padding: 16,
    borderRadius: 8,
    elevation: 4, // Sombra no Android
    shadowColor: '#000', // Cor da sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333', // Cor do texto
  },
});

export default PosCompra;

