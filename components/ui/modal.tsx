import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Card } from './card';

export const SimpleModal: React.FC<{ visible: boolean; children: React.ReactNode; onRequestClose?: () => void }> = ({ visible, children, onRequestClose }) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onRequestClose}>
      <View style={styles.backdrop}>
        <Card style={styles.card}>{children}</Card>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', padding: 20 },
  card: { elevation: 8 },
});
