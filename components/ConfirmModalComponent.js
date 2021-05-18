import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, IconButton, Modal, Portal} from 'react-native-paper';

const ConfirmModalComponent = ({isOpen, song, onDismiss, onConfirm}) => {
  const [visible, setVisible] = useState(isOpen);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const handleConfirm = () => {
    onConfirm(song);
    setVisible(false);
  };

  useEffect(() => {
    setVisible(isOpen);
  }, [isOpen]);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={containerStyle}>
        <Text>Are you sure to delete this song</Text>
        <View style={styles.container}>
          <IconButton
            icon="check"
            color={Colors.green500}
            size={20}
            onPress={handleConfirm}
          />
          <IconButton
            icon="close"
            color={Colors.red500}
            size={20}
            onPress={onDismiss}
          />
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
});

export default ConfirmModalComponent;
