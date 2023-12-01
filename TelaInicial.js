import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, Pressable, Image, Button, TextInput, TouchableOpacity, Modal }
from 'react-native';
import Carrinho from './Carrinho';
import TelaCompra from './TelaCompra';
import EnviarProduto from './EnviarProduto';
import { ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
 
const DATA = [
    {
      "id": 1009220,
      "name": "Arroz de carne seca com abóbora",
      "sellerName": 'Luzinete da Silva',
      "description": "A base do prato é o arroz, que é cozido com pedaços de carne-seca...",
      "price": 15.99,
      "thumbnail": {
        "path": "https://anamariabraga.globo.com/wp-content/uploads/2018/01/arroz-com-carne-seca-e-abobora-na-pressao.jpg",
        "extension": "jpg"
      }
    },
   
    {
      "id": 1010914,
      "name": "Lasanha à Bolonhesa",
      "sellerName": 'Fernanda Soares',
      "description": "A Lasanha à Bolonhesa é um prato italiano clássico...",
      "price": 12.00,
      "thumbnail": {
        "path": "https://www.anamariareceitas.com.br/wp-content/uploads/2022/10/Lasanha-a-bolonhesa.jpg",
        "extension": "jpg"
      },
    },
    {
      "id": 1017295,
      "name": "Frango Assado com Batatas e Ervas",
      "sellerName": 'Maria Cleuza',
      "description": "O frango inteiro ou pedaços de frango são temperados com uma mistura de ervas frescas...",
      "price": 34.15,
      "thumbnail": {
        "path": "https://s2.glbimg.com/K6joGtkRO77-41kKVgkPk1MuiHQ=/512x320/smart/e.glbimg.com/og/ed/f/original/2013/09/19/cc10_confort_08.jpg",
        "extension": "jpg"
      }
    },
    {
      "id": 1017575,
      "name": "Feijoada",
      "sellerName": 'Henrique Almeida',
      "description": "A base da Feijoada é o feijão preto cozido lentamente com uma variedade de carnes defumadas...",
      "price": 28.00,
      "thumbnail": {
        "path": "https://img.saborosos.com.br/imagens/feijoada-1.jpg",
        "extension": "jpg"
      }
    },
    {
  "id": 1010001,
  "name": "Salmão Grelhado",
  "sellerName": 'Fernanda de Alcântara',
  "description": "Salmão grelhado com molho de alho e limão, servido com vegetais frescos.",
  "price": 32.15,
  "thumbnail": {
    "path": "https://www.dicasdemulher.com.br/wp-content/uploads/2020/01/salmao-grelhado-0.png",
    "extension": "jpg"
  }
},
{
  "id": 1010002,
  "name": "Tacos de Carne Assada",
  "sellerName": "Rogério Rodrigues",
  "description": "Tortilhas de milho recheadas com carne asada grelhada, cebola, coentro e molho picante.",
  "price": 15.99,
  "thumbnail": {
    "path": "https://www.allrecipes.com/thmb/vG-of0Xa0W0eodSXPWV1KXD009U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/70935-taqueria-style-tacos-mfs-3x2-35-9145991a0ef94ceb8be05ae8d6be4f0f.jpg",
    "extension": "jpg"
  }
},
{
  "id": 1010003,
  "name": "Massa Carbonara",
  "sellerName": "Berenice Souza",
  "description": "Massa cozida com molho à base de ovos, queijo parmesão, pancetta e pimenta preta.",
  "price": 27.23,
  "thumbnail": {
    "path": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjKqiDs9yv1G_ppD3aNY6ksDEajdh_uNbWVfi0dYt2PrnHGmxd1QjiORHgPPAwDA_Xa0uIM2FyjYR08YOvxUgcNZcoE91lQodd2edrc7gr2Q-iUzwp_2vWhVopTdVI_xghN9pcGSDrAWM58gt0_zWRXY3RREjsVqU_qAJWnFyEgz-mRJwChwLUY_HKT/s2000/receita-de-macarr%C3%A3o-a-carbonara-1.jpg",
    "extension": "jpg"
  }
},
{
  "id": 1010004,
  "name": "Salada de Quinoa",
  "sellerName": 'Lucia Silva',
  "description": "Salada leve de quinoa, tomate, pepino, espinafre e molho de limão.",
  "price": 32.00,
  "thumbnail": {
    "path": "https://marolacomcarambola.com.br/wp-content/uploads/2019/01/Receita-de-salada-de-quinoa-leve-pratica-11.jpg",
    "extension": "jpg"
  }
},
{
  "id": 1010005,
  "name": "Pizza Margherita",
  "sellerName": 'Claudia Pereira',
  "description": "Pizza clássica com molho de tomate, muçarela, manjericão fresco e azeite de oliva.",
  "price": 30.00,
  "thumbnail": {
    "path": "https://anamariabraga.globo.com/wp-content/uploads/2020/08/pizza-margherita.jpg",
    "extension": "jpg"
  }
},
{
  "id": 1010006,
  "name": "Strogonoff de frango",
  "sellerName": "Rute Silva",
  "description": "Tradicional e delicioso strogonoff de frango, acompanhado com arroz e batata palha",
  "price": 34.23,
  "thumbnail": {
    "path": "https://www.unileverfoodsolutions.com.br/dam/global-ufs/mcos/SLA/calcmenu/recipes/BR-recipes/chicken-&-other-poultry-dishes/strogonoff-de-frango/main-header.jpg",
    "extension": "jpg"
  }
},
{
  "id": 1010007,
  "name": "Bife à cavalo",
  "sellerName": "Claudivan Rocha",
  "description": "Bife à Cavalo  é um prato brasileiro que consiste em um bife de carne bovina grelhado, servido com um ovo frito por cima, lembrando um cavalo",
  "price": 28.00,
  "thumbnail": {
    "path": "https://www.sabornamesa.com.br/media/k2/items/cache/8d00d7ae4f3b1af3be8d6d077cf2f6c4_XL.jpg",
    "extension": "jpg"
  }
},
{
  "id": 1010008,
  "name": "Tacos de Peixe",
  "sellerName": "Felipe Cardoso",
  "description": "Tortilhas de milho recheadas com peixe empanado, repolho e molho de iogurte.",
  "price": 43.31,
  "thumbnail": {
    "path": "https://www.pingodoce.pt/wp-content/uploads/2019/03/tacos-de-peixe.jpg",
    "extension": "jpg"
  }
},
{
  "id": 1010009,
  "name": "Panqueca",
  "sellerName": "Arthur Nogueira",
  "description": "Nossa panqueca preparada com uma massa super fina, recheada com frango desfiado com bastante tempero natural, finalizada com molho de tomate caseiro. Um opção super leve de jantar, para sair da mesmice..",
  "price": 35.80,
  "thumbnail": {
    "path": "https://porkworld.com.br/wp-content/uploads/2022/11/panqueca-de-carne-moida.jpg",
    "extension": "jpg"
  }
},
{
  "id": 1010010,
  "name": "Frango à Parmegiana",
  "sellerName": "Flora Tavares",
  "description": "Peito de frango empanado com molho de tomate e queijo derretido, servido com espaguete.",
  "price": 29.50,
  "thumbnail": {
    "path": "https://www.minhareceita.com.br/app/uploads/2020/09/frango-suculento-a-parmegiana_mobile.jpg",
    "extension": "jpg"
  }
},
{
  "id": 1010011,
  "name": "Frango ao manjericão",
  "sellerName": "Roberta Campos",
  "description": "Ingredientes: Filé de frango, batata doce, cebola, manjericão, polpa de tomate, alho e sal. NÃO CONTÉM GLÚTEN. NÃO CONTÉM LACTOSE. ALÉRGICOS: Pode conter traços de trigo, leite, ovo, soja, peixe e camarão.",
  "price": 24.21,
  "thumbnail": {
    "path": "https://www.saborlight.com.br/sites/default/files/styles/product_main_360x459/public/produtos/img-20210928-wa0038.jpg?itok=96s_7ll3",
    "extension": "jpg"
  }
},
{
  "id": 1010012,
  "name": "Hambúrguer Clássico",
  "sellerName": "Rodrigo Gouveia",
  "description": "Hambúrguer grelhado com queijo cheddar, alface, tomate e molho especial.",
  "price": 25.00,
  "thumbnail": {
    "path": "https://www.unileverfoodsolutions.pt/dam/global-ufs/mcos/portugal/calcmenu/recipes/PT-recipes/In-Development/hamb%C3%BArguer-cl%C3%A1ssico/main-header.jpg",
    "extension": "jpg"
  }
},
{
  "id": 1010013,
  "name": "Baião de dois",
  "sellerName": "Nathalia Almeida",
  "description": "Mistura de dois elementos básicos da culinária brasileira, apreciados e de fácil acesso, o arroz e o feijão.",
  "price": 47.80,
  "thumbnail": {
    "path": "https://www.coisasdaroca.com/wp-content/uploads/2021/10/Baiao-de-Dois.jpg",
    "extension": "jpg"
  }
},
{
  "id": 1010014,
  "name": "Churrasco",
  "sellerName": "Inacio Oliveira",
  "description": "Arroz, farofa, carne, linguiça e feijão tropeiro",
  "price": 32.12,
  "thumbnail": {
    "path": "https://cms-cdn.saipos.com/assets/2023/04/26/Churrasco-marmitex---SAIPOS---Sistema-para-Restaurante-2_uid_64497c22306ef.jpg",
    "extension": "jpg"
  }
},
{
  "id": 1010015,
  "name": "Prato Feito",
  "sellerName": "Geovanna Oliveira",
  "description": "Arroz, feijão, bife acebolado, ovo, tomate e alface.",
  "price": 15.00,
  "thumbnail": {
    "path": "https://curtebh.com.br/wp-content/uploads/2023/05/prato-feito.webp",
    "extension": "jpg"
  }
},
{
  "id": 1010016,
  "name": "Moqueca",
  "sellerName": "Jefferson Tavares",
  "description": "A moqueca é um ensopado de peixe ou frutos do mar, cozido com leite de coco, azeite de dendê, pimentões, cebola, tomate e coentro. É uma especialidade da região nordeste do Brasil.",
  "price": 22.00,
  "thumbnail": {
    "path": "https://www.receitasnestle.com.br/sites/default/files/srh_recipes/9ae6e28383dc732ba697d21aaa71edbf.jpg",
    "extension": "jpg"
  }
},
{
  "id": 1010017,
  "name": "Acarajé",
  "sellerName": "Clarice Almeida",
  "description": "O acarajé é uma iguaria baiana feita de massa de feijão-fradinho frita em azeite de dendê. É recheado com vatapá, camarão seco e pimenta. É uma comida de rua popular em Salvador, Bahia.",
  "price": 37.50,
  "thumbnail": {
    "path": "https://receitasrapidas.org/wp-content/uploads/2023/03/Acaraje-de-Camarao-1-1024x683-1.jpg",
    "extension": "jpg"
  }
},
{
  "id": 1010018,
  "name": "Tapioca",
  "sellerName": "Maria das Neves",
  "description": " A tapioca é uma panqueca fina feita a partir da fécula de mandioca, geralmente recheada com queijo, coco e outros ingredientes. É uma opção leve e sem glúten.",
  "price": 23.50,
  "thumbnail": {
    "path": "https://cdn0.tudoreceitas.com/pt/posts/4/5/3/tapioca_com_queijo_coalho_9354_orig.jpg",
    "extension": "jpg"
  }
}
 
 
  ];
 
const TelaInicial = () => {
  const [searchText, setSearchText] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isEnviarProdutoVisible, setIsEnviarProdutoVisible] = useState(false);
  const [foodItems, setFoodItems] = useState(DATA);
  const navigation = useNavigation();
 
  const handleToggleCart = () => {
    setIsCartVisible(!isCartVisible);
 
  };
 
  const handleEnviarProduto = (novoProduto) => {
    console.log('Novo Produto:', novoProduto);
 
   
  const { nome, descricao, vendedor, imagem, preco } = novoProduto;
 

  const novoItem = {
    id: Math.random(), 
    name: nome,
    sellerName: vendedor,
    description: descricao,
    thumbnail: {
      path: imagem,
      extension: 'jpg', 
    },
    price: preco, 
  };
 
    setFoodItems((prevFoodItems) => [...prevFoodItems, novoItem]);
 
    setIsEnviarProdutoVisible(false);
 
  };
 
 
 
const formatCurrency = (value) => {
  const roundedValue = Math.round(value * 100) / 100;

  return roundedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};
    const handleBuy = (item) => {
    const precoProduto = item.price || 0;
    const precoFinal = precoProduto + 10.00;
   
   
navigation.navigate('TelaCompra', { cartItems, valorFinal: formatCurrency(precoFinal), selectedFood: item });
 
 
  };
 
  const addToCart = (item) => {
    const updatedItem = { ...item, cartItemId: Math.random().toString() };
    setCartItems([...cartItems, updatedItem]);

    

    ToastAndroid.show('Produto adicionado ao carrinho', ToastAndroid.SHORT);
 
  };
 
  const removeFromCart = (cartItemId) => {
    const updatedCart = cartItems.filter(item => item.cartItemId !== cartItemId);
    setCartItems(updatedCart);
  };
 
 const handleSearch = (text) => {
  setSearchText(text);
};
  const handleFoodImageClick = (food) => {
    setSelectedFood(food);
  };
 
  const closePopup = () => {
    setSelectedFood(null);
  };
 
 
  const Prato= ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        style={styles.thumbnail}
        source={{ uri: item.thumbnail.path }}
        onPress={() => handleFoodItemPress(item)}
      />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.sellerName}>{item.sellerName}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <Text style={styles.itemPrice}> {item.price ?
      `R$ ${item.price.toFixed(2).replace('.', ',')}` :   'Não disponível'}
           </Text>
    </View>
  );
 
   return (
    <SafeAreaView style={styles.container}>
      <TextInput
      style={styles.searchInput}
      placeholder="Pesquisar por pratos:"
      value={searchText}
      onChangeText={handleSearch}
      />
      <View style={styles.buttonContainer}>
      <TouchableOpacity
      style={[styles.button, styles.verCarrinhoButton]}
      onPress={handleToggleCart}
      >
    <Text style={styles.buttonText}>Ver Carrinho</Text>
    </TouchableOpacity>
    <TouchableOpacity
    style={[styles.button, styles.enviarProdutoButton]}
    onPress={() => setIsEnviarProdutoVisible(true)}
  >
    <Text style={styles.buttonText}>Enviar Produto</Text>
  </TouchableOpacity>
</View>

 
            <FlatList
           data={foodItems.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))}
           keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
            renderItem={({ item }) => (
          item && (
           <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => handleFoodImageClick(item)}>
              <Image
                style={styles.thumbnail}
                source={{ uri: item.thumbnail && item.thumbnail.path }}
              />
            </TouchableOpacity>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.sellerName}>{item.sellerName} </Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Text style={styles.itemPrice}>
            {item.price ? `R$${item.price.toFixed(2).replace('.', ',')}` : 'Não disponível'}
           </Text>
           <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
          <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleBuy(item)}>
          <Text style={styles.buttonText}>Comprar Produto</Text>
          </TouchableOpacity>
          </View>
          </View>
          )
        )}
        //keyExtractor={(item) => item.id.toString()}
      />
      <Modal visible={isCartVisible} animationType="slide">
        <Carrinho cartItems={cartItems} removeFromCart={removeFromCart} />
        <Button title="Fechar Carrinho" onPress={handleToggleCart} />
      </Modal>
      <Modal visible={isEnviarProdutoVisible} animationType="slide">
        <EnviarProduto onEnviarProduto={handleEnviarProduto} />
        <Button title="Fechar" onPress={() => setIsEnviarProdutoVisible(false)} />
      </Modal>
      <Modal visible={selectedFood !== null} animationType="slide">
      <View style={styles.popupContainer}>
    {selectedFood && selectedFood.thumbnail && (
      <TouchableOpacity onPress={() => handleFoodImageClick(selectedFood)}>
        <Image
          style={styles.thumbnail}
          source={{ uri: selectedFood.thumbnail.path }}
        />
      </TouchableOpacity>
    )}
          <Text style={styles.popupName}>{selectedFood ? selectedFood.name : ''}</Text>
          <Text style={styles.popupDescription}>{selectedFood ? selectedFood.description : ''}</Text>
          <Button title="Fechar" onPress={closePopup} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
  },
  searchInput: {
    height: 30,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
  },
  itemContainer: {
    margin: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
  },
  thumbnail: {
    width: 280,
    height: 170,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sellerName: {
    fontSize: 16,
    color: 'gray',
    textDecorationLine: 'underline',
  },
  itemDescription: {
    fontSize: 14,
  },
  itemPrice:{
    marginTop:8,
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupThumbnail: {
    width: 200,
    height: 150,
  },
  popupName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  popupDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 10,
},

button: {
  flex: 1,
  backgroundColor: '#007BFF',  
  borderRadius: 5,
  padding: 4,  
  marginHorizontal: 5,
},

buttonText: {
  color: 'white',
  textAlign: 'center',
  fontWeight: 'bold',
  marginTop: 5,
},
verCarrinhoButton: {
    backgroundColor: '#28a745', 
  },
  enviarProdutoButton: {
    backgroundColor: '#007BFF', 
  },

});
 
export default TelaInicial;