import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {
  DataTable,
  FAB,
  Portal,
  Provider,
  ActivityIndicator,
} from 'react-native-paper';
import * as API_PATH from '../constants/APIPath';

const DataTableComponent = () => {
  const [recent, setRecent] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [state, setState] = useState({open: false});
  const onStateChange = ({open}) => setState({open});
  const {open} = state;
  const itemsPerPage = 5;
  const [page, setPage] = useState(0);
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  const getAllRecent = () => {
    // setLoading(true);
    fetch(API_PATH.MOCK_API_RECENT_GET_ALL)
      .then(response => response.json())
      .then(json => {
        setRecent(json);
        setLoading(false);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getAllRecent();
  }, []);

  return (
    <Provider>
      {isLoading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <ScrollView>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Index</DataTable.Title>
              <DataTable.Title>Target</DataTable.Title>
              <DataTable.Title>Action</DataTable.Title>
              <DataTable.Title>Date</DataTable.Title>
            </DataTable.Header>
            {recent.map((r, index) => (
              <DataTable.Row key={r.id}>
                <DataTable.Cell>{index + 1}</DataTable.Cell>
                <DataTable.Cell>{r.target}</DataTable.Cell>
                <DataTable.Cell>{r.action}</DataTable.Cell>
                <DataTable.Cell>{r.createdAt}</DataTable.Cell>
              </DataTable.Row>
            ))}
            <DataTable.Pagination
              page={page}
              numberOfPages={Math.floor(recent.length / itemsPerPage)}
              onPageChange={() => setPage(page)}
              label={`${from + 1}-${to} of ${recent.length}`}
            />
          </DataTable>
          <Portal>
            <FAB.Group
              open={open}
              icon={open ? 'calendar-today' : 'plus'}
              actions={[
                {icon: 'plus', onPress: () => console.log('Pressed add')},
                {
                  icon: 'star',
                  label: 'Star',
                  onPress: () => console.log('Pressed star'),
                },
                {
                  icon: 'email',
                  label: 'Email',
                  onPress: () => console.log('Pressed email'),
                },
                {
                  icon: 'bell',
                  label: 'Remind',
                  onPress: () => console.log('Pressed notifications'),
                  small: false,
                },
              ]}
              onStateChange={onStateChange}
              onPress={() => {
                if (open) {
                  // do something if the speed dial is open
                }
              }}
            />
          </Portal>
        </ScrollView>
      )}
    </Provider>
  );
};

export default DataTableComponent;
