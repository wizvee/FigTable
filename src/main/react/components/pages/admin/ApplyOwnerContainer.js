import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOwners } from '../../../modules/adminOwners';
import AdminHeader from './AdminHeader';
import MenuNavi from './MenuNavi';
import styled from 'styled-components';
import OwnersList from './owner/OwnersList';
import './TableStyle.css';

const BodyHeight = styled.div`
  height: 'auto';
  min-height: 500px;
  margin: auto;
`;

const TableWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 2rem;
  min-height: 465px;
`;

const ApplyOwnerContainer = () => {
  const dispatch = useDispatch();
  const { owners, error, loading } = useSelector(
    ({ adminOwners, loading }) => ({
      owners: adminOwners.owners,
      error: adminOwners.error,
      loading: loading['adminOwners/LIST_OWNERS'],
    }),
  );

  useEffect(() => {
    dispatch(listOwners());
  }, [dispatch]);

  const [searchKeyword, setSearchKeyword] = useState('');

  const input = useRef(null);

  const onSubmit = e => {
    e.preventDefault();
    setSearchKeyword(input.current.value);
  };

  const onReset = e => {
    e.preventDefault();
    setSearchKeyword('');
    input.current.value = '';
  };

  return (
    <>
      <AdminHeader />
      <BodyHeight>
        <MenuNavi
          subTitle="사장님 신청 내역"
          onSubmit={onSubmit}
          input={input}
          onReset={onReset}
        />

        <TableWrapper>
          <table>
            <thead>
              <tr>
                <th>매장명</th>
                <th>매장주소</th>
                <th>대표자</th>
                <th>이메일</th>
              </tr>
            </thead>
            <tbody>
              <OwnersList
                loading={loading}
                error={error}
                owners={owners}
                keyword={searchKeyword}
              />
            </tbody>
          </table>
        </TableWrapper>
      </BodyHeight>
    </>
  );
};

export default ApplyOwnerContainer;
