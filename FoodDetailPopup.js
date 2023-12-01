import React from 'react';
import { View, Modal, Text, Image, Button } from 'react-native';

const FoodDetailPopup = ({ visible, food, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide">
      <View>
        <Image source={{ uri: food.thumbnail.path }} style={{ width: 200, height: 150 }} />
        <Text>{food.name}</Text>
        <Text>{food.description}</Text>
        <Button title="Fechar" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default FoodDetailPopup;

