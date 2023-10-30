import React, {useState} from 'react';

import {StyleSheet, FlatList, Text, View} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Portal,
  Dialog,
  Button,
  Snackbar,
} from 'react-native-paper';
import {range} from 'lodash';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../../components/App';

const data = range(10).map(index => ({index}));

const RemoveDialog = ({visible, hideDialog, onOkPress}) => (
  <Portal>
    <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
      <Dialog.Content>
        <Paragraph>Do you want to delete list?</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button textColor="#0378ff" uppercase mode="text">
          Cancel
        </Button>
        <Button onPress={onOkPress} mode="text" textColor="#ff0000" uppercase>
          Delete
        </Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);

const RemoveDialogError = ({visible, onDismissSnackBar}) => (
  <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
    Oops, something went wrong
  </Snackbar>
);

const Lists = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const navigation = useNavigation<StackNavigation>();

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const showSnackbar = () => {
    showModal();
    setSnackbarVisible(true);
  };

  const hideSnackbar = () => {
    setSnackbarVisible(false);
  };

  return (
    <>
      <FlatList
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        data={data}
        renderItem={({index}) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title>List name{index}</Title>
              <Paragraph>Description</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() =>
                  navigation.navigate('DetailMovieModal', {
                    title: 'Custom Header',
                    description: 'description',
                    itemsCount: 5,
                  })
                }
                textColor="#0378ff"
                mode="text"
                uppercase>
                View
              </Button>
              <Button
                textColor="#0378ff"
                uppercase
                mode="text"
                onPress={showModal}>
                Delete
              </Button>
            </Card.Actions>
          </Card>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text>No results</Text>
          </View>
        }
      />
      <RemoveDialog
        visible={modalVisible}
        hideDialog={hideModal}
        onOkPress={showSnackbar}
      />
      <RemoveDialogError
        visible={snackbarVisible}
        onDismissSnackBar={hideSnackbar}
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: data.length === 0 ? 1 : 0,
  },
  dialog: {
    backgroundColor: '#ffffff',
  },
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#ffffff',
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Lists;
