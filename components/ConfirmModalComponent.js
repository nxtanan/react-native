import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Colors, IconButton, Modal, Portal} from 'react-native-paper';
import Style from '../css/Style';

const ConfirmModalComponent = ({
  open,
  target,
  message,
  onDismiss,
  onConfirm,
}) => {
  const [visible, setVisible] = useState(open);

  const handleConfirm = () => {
    onConfirm(target);
    setVisible(false);
  };

  useEffect(() => {
    setVisible(open);
  }, [open]);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={Style.containerStyle}>
        <Text>{message}</Text>
        <View style={Style.modalContainer}>
          <IconButton
            style={Style.iconButtonContainer}
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

export default ConfirmModalComponent;
