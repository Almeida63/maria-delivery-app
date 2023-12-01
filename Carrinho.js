import React, { useState } from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet } from 'react-native';
import TelaCompra from './TelaCompra';
import { useNavigation } from '@react-navigation/native';

const Carrinho = ({ cartItems, removeFromCart }) => {
const calcularTotal = () => {
  const totalProdutos = cartItems.reduce((total, item) => total + item.price, 0);
  const frete = 10.00;
  const totalCompra = totalProdutos + frete;

  const formatarValor = (valor) => {
    return `R$ ${valor.replace('.', ',')}`;
  };

  return {
    totalProdutos: formatarValor(totalProdutos.toFixed(2)),
    frete: formatarValor(frete.toFixed(2)),
    totalCompra: formatarValor(totalCompra.toFixed(2)),
  };
};
  const navigation = useNavigation();

  const [mostrarTelaCompra, setMostrarTelaCompra] = useState(false);

  const { totalProdutos, frete, totalCompra } = calcularTotal();

  const handleFinalizarCompra = () => {
    setMostrarTelaCompra(true);
    navigation.replace('TelaCompra', { valorFinal: totalCompra });
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Carrinho vazio</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Itens no Carrinho:</Text>
      <FlatList
        style={styles.lista}
        contentContainerStyle={styles.listaContent}
        data={cartItems}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image style={styles.thumbnail} source={{ uri: item.thumbnail.path }} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.sellerName}>Vendedor: {item.sellerName}</Text>
              <Text style={styles.itemPrice}>
                {item.price ? `R$ ${item.price.toFixed(2).replace('.', ',')}` : 'Não disponível'}
              </Text>
              <Button title="Remover" onPress={() => removeFromCart(item.cartItemId)} />
            </View>
          </View>
        )}
        keyExtractor={(item) => item.cartItemId}
      />
      <View style={styles.resumoContainer}>
        <Text style={styles.resumoText}>Resumo do Carrinho:</Text>
        <Text style={styles.resumoText}>Total dos Produtos: {totalProdutos}</Text>
        <Text style={styles.resumoText}>Frete: {frete}</Text>
        <Text style={styles.resumoText}>Valor Final: {totalCompra}</Text>
        <View style={styles.botoesContainer}>
          <Button title="Finalizar Compra" onPress={handleFinalizarCompra} />
        </View>
      </View>
      {mostrarTelaCompra && <TelaCompra valorFinal={totalCompra} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  thumbnail: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sellerName: {
    fontSize: 14,
    color: 'gray',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  botoesContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  resumoContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    paddingTop: 10,
  },
  resumoText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  lista: {
    width: '100%',
  },
  listaContent: {
  paddingHorizontal: 10,
},
});

export default Carrinho;
