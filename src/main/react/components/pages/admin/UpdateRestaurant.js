import React, { Component } from 'react';
import AdminHeader from './AdminHeader';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import styled from 'styled-components';
import Button from '../../../lib/styles/Button';

const TableWrapper = styled.div`
  margin-top: 1rem;
  height: 3rem;
  text-align: center;
`;

const ButtonWrapper = styled.div``;
const StyledButton = styled(Button)`
  padding: 0.5rem;
`;

const data = [
  {
    id: 1,
    resName: '달콩커피',
    resAddr: '경기도 수원시',
    resTel: '031-000-0000',
    adminName: '알콩달콩',
  },
  {
    id: 2,
    resName: '달콩커피',
    resAddr: '서울시 강남구',
    resTel: '02-000-0000',
    adminName: '김사장',
  },
  {
    id: 3,
    resName: '스타벅스',
    resAddr: '서울시 강남구',
    resTel: '02-000-0000',
    adminName: '이사장',
  },
  {
    id: 4,
    resName: '스타벅스',
    resAddr: '서울시 강남구',
    resTel: '02-000-0000',
    adminName: '박사장',
  },
];

const makeDefaultState = () => ({
  sorted: [],
  page: 0,
  pageSize: 10,
  expanded: {},
  resized: [],
  filtered: [],
});
class UpdateRestaurant extends Component {
  constructor() {
    super();
    this.state = makeDefaultState();
    this.resetState = this.resetState.bind(this);
  }
  resetState() {
    this.setState(makeDefaultState());
  }

  render() {
    return (
      <>
        <AdminHeader />
        <div>
          <TableWrapper>
            <h3>매장 정보 수정</h3>
          </TableWrapper>
          <ButtonWrapper>
            <StyledButton onClick={this.resetState}>검색 초기화</StyledButton>
          </ButtonWrapper>
        </div>

        <div>
          <ReactTable
            data={data}
            columns={[
              {
                Header: '매장명',
                id: 'resName',
                accessor: d => d.resName,
              },
              {
                Header: '매장주소',
                id: 'resAddr',
                accessor: 'resAddr',
              },
              {
                Header: '전화번호',
                id: 'resTel',
                accessor: 'resTel',
              },
              {
                Header: '대표자',
                id: 'adminName',
                accessor: 'adminName',
              },
            ]}
            pivotBy={['resName']}
            filterable
            defaultPageSize={10}
            className="-striped -highlight"
            //controll props
            sorted={this.state.sorted}
            page={this.state.page}
            pageSize={this.state.pageSize}
            expanded={this.state.expanded}
            resized={this.state.resized}
            filtered={this.state.filtered}
            // Callbacks
            onSortedChange={sorted => this.setState({ sorted })}
            onPageChange={page => this.setState({ page })}
            onPageSizeChange={(pageSize, page) =>
              this.setState({ page, pageSize })
            }
            onExpandedChange={expanded => this.setState({ expanded })}
            onResizedChange={resized => this.setState({ resized })}
            onFilteredChange={filtered => this.setState({ filtered })}
          />
          <br />
        </div>
      </>
    );
  }
}

export default UpdateRestaurant;
