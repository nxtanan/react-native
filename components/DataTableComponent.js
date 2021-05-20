import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, Text} from 'react-native';
import {
  ActivityIndicator,
  Colors,
  DataTable,
  Provider,
} from 'react-native-paper';
import * as API_PATH from '../constants/APIPath';
import Style from '../css/Style';

const DataTableComponent = () => {
  const isFocused = useIsFocused();
  const [recent, setRecent] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const itemsPerPage = 5;
  const [page, setPage] = useState(0);
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  const getData = () => {
    fetch(API_PATH.MOCK_API_RECENT_GET_ALL)
      .then(response => (response.ok ? response.json() : []))
      .then(json => {
        setRecent(json);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  return (
    <Provider>
      {isLoading ? (
        <ActivityIndicator
          style={Style.noDataText}
          animating={true}
          color={Colors.red500}
        />
      ) : recent.length === 0 ? (
        <Text style={Style.noDataText}>No data found</Text>
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
        </ScrollView>
      )}
    </Provider>
  );
};

export default DataTableComponent;
