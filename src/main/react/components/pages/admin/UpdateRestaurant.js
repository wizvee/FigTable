import React, { Component } from 'react';
import AdminHeader from './AdminHeader';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import RestaurantList from './RestaurantList';

class UpdateRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: RestaurantList.resList,
    };
  }

  render() {
    const { data } = this.state;
    return (
      <>
        <AdminHeader />
        <div>
          <ReactTable
            data={data}
            columns={[
              {
                Header: '',
                columns: [
                  {
                    Header: '매장명',
                    id: 'resName',
                    accessor: d => d.resName,
                  },
                ],
              },
              {
                Header: '',
                columns: [
                  {
                    Header: '매장주소',
                    id: 'resAddr',
                    accessor: 'resAddr',
                  },
                ],
              },
              {
                Header: '',
                columns: [
                  {
                    Header: '대표자',
                    id: 'adminName',
                    accessor: 'adminName',
                  },
                ],
              },
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
          <br />
        </div>
      </>
    );
  }
}

export default UpdateRestaurant;
