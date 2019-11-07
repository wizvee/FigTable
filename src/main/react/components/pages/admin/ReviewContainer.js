import React from 'react';
import AdminHeader from './AdminHeader';
import MenuNavi from './MenuNavi';
import ReviewList from './review/ReviewList';
import styled from 'styled-components';
import './TableStyle.css';

const BodyHeight = styled.div`
  height: ${props => (props.bodyHeight > 8 ? 'auto' : '500px')};
  margin: auto;
`;

const TableWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 2rem;
  min-height: 460px;
`;

const reviews = [
  {
    rvNo: 1,
    memName: '홍길동',
    resName: '바버32',
    resAddr: '인천시 연수구 송도동 22-22',
    rvRating: 3,
    rvContent: '맛없어요',
    rvImages:
      'https://img.huffingtonpost.com/asset/5bf24ac824000060045835ff.jpeg?ops=scalefit_630_noupscale',
    rvDate: '19-11-03',
  },
  {
    rvNo: 2,
    memName: '김철수',
    resName: '이치류',
    resAddr: '서울시 마포구 서교동 395-124',
    rvRating: 0,
    rvContent: '욕 test 욕 test 욕 test 욕 test 욕 test 욕 test',
    rvImages: 'http://image.itdonga.com/files/2015/09/29/aaa.jpg',
    rvDate: '19-11-04',
  },
  {
    rvNo: 3,
    memName: '김ㅇㅇ',
    resName: '카페람베리',
    resAddr: '서울시 서초구 방배동 751-1',
    rvRating: 0,
    rvContent: '웩',
    rvImages: '',
    rvDate: '19-11-05',
  },
  {
    rvNo: 4,
    memName: '김사장',
    resName: '카페람베리',
    resAddr: '서울시 강남구',
    rvRating: 0,
    rvContent: '맛없어요맛없어요맛없어요맛없어요맛없어요맛없어요맛없어요',
    rvImages:
      'https://imgsnacker.hankyung.com/wp-content/uploads/2017/02/funny-kitchen-cooking-fails-117-5894451da3f6b__605.jpg',
    rvDate: '19-11-05',
  },
  {
    rvNo: 5,
    memName: '홍ㅇㅇ',
    resName: '더키친 살바토레 쿠오모 압구정점',
    resAddr: '서울시 종로구 통인동 15',
    rvRating: 0,
    rvContent: '맛없어요',
    rvImages:
      'https://imgsnacker.hankyung.com/wp-content/uploads/2017/02/funny-kitchen-cooking-fails-145-58984ebd92f65__605.jpg',
    rvDate: '19-11-05',
  },
  {
    rvNo: 6,
    memName: '홍ㅇㅇ',
    resName: '더키친 살바토레 쿠오모 압구정점',
    resAddr: '서울시 종로구 통인동 15',
    rvRating: 0,
    rvContent: '맛없어요',
    rvImages:
      'https://imgsnacker.hankyung.com/wp-content/uploads/2017/02/funny-kitchen-cooking-fails-145-58984ebd92f65__605.jpg',
    rvDate: '19-11-05',
  },
  {
    rvNo: 7,
    memName: '홍ㅇㅇ',
    resName: '더키친 살바토레 쿠오모 압구정점',
    resAddr: '서울시 종로구 통인동 15',
    rvRating: 0,
    rvContent: '맛없어요',
    rvImages:
      'https://imgsnacker.hankyung.com/wp-content/uploads/2017/02/funny-kitchen-cooking-fails-145-58984ebd92f65__605.jpg',
    rvDate: '19-11-05',
  },
  {
    rvNo: 8,
    memName: '홍ㅇㅇ',
    resName: '더키친 살바토레 쿠오모 압구정점',
    resAddr: '서울시 종로구 통인동 15',
    rvRating: 0,
    rvContent: '맛없어요',
    rvImages:
      'https://imgsnacker.hankyung.com/wp-content/uploads/2017/02/funny-kitchen-cooking-fails-145-58984ebd92f65__605.jpg',
    rvDate: '19-11-05',
  },
  {
    rvNo: 9,
    memName: '홍ㅇㅇ',
    resName: '더키친 살바토레 쿠오모 압구정점',
    resAddr: '서울시 종로구 통인동 15',
    rvRating: 0,
    rvContent: '맛없어요',
    rvImages:
      'https://imgsnacker.hankyung.com/wp-content/uploads/2017/02/funny-kitchen-cooking-fails-145-58984ebd92f65__605.jpg',
    rvDate: '19-11-05',
  },
  {
    rvNo: 10,
    memName: '홍ㅇㅇ',
    resName: '더키친 살바토레 쿠오모 압구정점',
    resAddr: '서울시 종로구 통인동 15',
    rvRating: 0,
    rvContent: '맛없어요',
    rvImages:
      'https://imgsnacker.hankyung.com/wp-content/uploads/2017/02/funny-kitchen-cooking-fails-145-58984ebd92f65__605.jpg',
    rvDate: '19-11-05',
  },
  {
    rvNo: 11,
    memName: '홍ㅇㅇ',
    resName: '더키친 살바토레 쿠오모 압구정점',
    resAddr: '서울시 종로구 통인동 15',
    rvRating: 0,
    rvContent: '맛없어요',
    rvImages:
      'https://imgsnacker.hankyung.com/wp-content/uploads/2017/02/funny-kitchen-cooking-fails-145-58984ebd92f65__605.jpg',
    rvDate: '19-11-05',
  },
];

const ReviewContainer = () => {
  const bodyHeight = reviews.length;
  return (
    <>
      <AdminHeader />
      <BodyHeight bodyHeight={bodyHeight}>
        <MenuNavi subTitle="신고 리뷰" />
        <TableWrapper>
          <table>
            <thead>
              <tr>
                <th>작성자</th>
                <th>내용</th>
                <th>작성일</th>
                <th>매장명</th>
                <th>매장주소</th>
                <th style={{ width: 150 }}></th>
              </tr>
            </thead>
            <tbody>
              <ReviewList reviews={reviews} />
            </tbody>
          </table>
        </TableWrapper>
      </BodyHeight>
    </>
  );
};

export default ReviewContainer;
