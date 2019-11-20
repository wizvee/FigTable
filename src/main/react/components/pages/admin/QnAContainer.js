import React, { useState, useCallback, useEffect } from 'react';
import AdminHeader from './AdminHeader';
import MenuNavi from './MenuNavi';
import styled from 'styled-components';
import QnaCategories from './qna/QnaCategories';
import client, { path } from '../../../lib/api/client';
import Loader from '../../common/Loader';
import moment from 'moment';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import Button from '../../../lib/styles/Button';
import palette from '../../../lib/styles/Palette';
import TextareaAutosize from 'react-textarea-autosize';

const BodyHeight = styled.div`
  height: 'auto';
  min-height: 490px;
`;

const Categories = styled.div`
  margin-top: 5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const TableWrapper = styled.div`
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  min-height: 490px;
  height: auto;
`;

const Table = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-text-align: center;
`;

const THead = styled.div`
  display: inline-flex;
  font-weight: bold;
  margin: 0.5rem;
  font-size: 1.2rem;
`;

const TheadItem = styled.div`
  margin-top: 0.5rem;
  height: 2rem;
  width: 260px;
  text-align: center;
`;

const Theadcontent = styled.div`
  margin-top: 0.5rem;
  height: 2rem;
  width: 330px;
  text-align: center;
`;

const THcheck = styled.div`
  margin-top: 0.5rem;
  height: 2rem;
  border: 1px soild blue;
  width: 70px;
  text-align: center;
`;

const TD = styled.div`
  border: 1px solid rgba(204, 204, 204, 0.7);
  border-radius: 30px;
  display: inline-flex;
  font-size: 1.2rem;
  & + & {
    margin-top: 0.5rem;
  }
`;

const TDItem = styled.div`
  margin-top: 0.5rem;
  height: 2rem;
  border: 1px soild blue;
  width: 260px;
  text-align: center;
`;

const TDcontent = styled.div`
  margin-top: 0.5rem;
  height: 2rem;
  border: 1px soild blue;
  width: 330px;
  text-align: center;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const IconBlock = styled.div`
  flex-direction: column;
  display: inline-block;
  border: 1px soild blue;
  width: 70px;
  text-align: center;
  font-size: 1.7rem;
  cursor: pointer;
  margin-top: 5px;
  &:hover {
    color: #f67280;
  }
`;

const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

const Modal = styled.div`
  position: relative;
  display: flex;
  text-align: center;
  margin: 0px auto;
  flex-direction: column;
  background-color: white;
  top: 9rem;
  width: 20rem;
  min-height: 17rem;
  height: auto;
  border-radius: 8px;
`;

const StyledTextarea = styled(TextareaAutosize)`
  align-self: flex-start;
  margin-top: 1.5rem;
  margin: 0.5rem;
  padding: 1rem;
  width: 90%;
  resize: none;
  border-radius: 5px;
  border: 1px solid ${palette.borderGray};
  font-size: 1rem;
  overflow: hidden;
  &::placeholder {
    color: ${palette.textGray};
  }
`;

const Title = styled.div`
  margin-top: 3rem;
`;

const Content = styled.div`
  margin-top: 1.5rem;
`;

const StyledInput = styled.input`
  padding: 0.5rem 0.8rem;
  margin: 0.5rem;
  width: 90%;
  border-radius: 5px;
  border: 1px solid ${palette.borderGray};
  font-size: 1rem;
  outline: none;
  & + & {
    margin-top: 0.5rem;
  }
`;

const StyledButton = styled(Button)`
  padding: 0.5rem;
  width: 5rem;
  margin: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const ButtonWrapper = styled.div`
  display: inline;
  flex-direction: column;
  text-align: center;
`;

const QnAContainer = () => {
  const [category, setCategory] = useState('E');
  const [input, setInput] = useState('');
  const [qnas, setQnas] = useState([]);
  const [qna, setQna] = useState(null);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [memNo, setMemNo] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    onSelect('E');
  }, []);

  const onSelect = useCallback(async category => {
    setCategory(category);
    await client
      .get(`${path}/api/adminQuestion/?category=${category}`)
      .then(({ data }) => setQnas(data));

    setLoading(false);
  }, []);

  const onChange = useCallback(({ target }) => {
    setInput(target.value);
  }, []);

  const onSubmit = useCallback(
    async e => {
      e.preventDefault();
      setModal(false);
      await client
        .post(`${path}/api/adminQuestion/answer`, {
          memNo,
          content,
          input,
          category,
        })
        .then(() => {
          setQnas(qnas.filter(qna => qna.Q_CONTENT != content));
          setInput('');
        });
    },
    [memNo, content, input, category],
  );

  const onCheck = useCallback(async qna => {
    await client.post(`${path}/api/adminQanCheck`, qna).then(() => {
      setQnas(qnas.filter(data => data.Q_CONTENT != qna.Q_CONTENT));
    });
  });

  const onCancel = () => {
    setModal(false);
  };

  const onOpenModal = qna => {
    setQna(qna);
    setMemNo(qna.MEM_NO);
    setContent(qna.Q_CONTENT);
    setModal(true);
  };

  return (
    <>
      <AdminHeader />
      <BodyHeight>
        <MenuNavi subTitle="문의 내역" />
        <Categories>
          <QnaCategories category={category} onSelect={onSelect} />
        </Categories>

        <TableWrapper>
          <Table>
            <THead>
              <TheadItem>문의자</TheadItem>
              <Theadcontent>문의내용</Theadcontent>
              <TheadItem>문의일자</TheadItem>
              <THcheck>확인</THcheck>
            </THead>
            {loading && <Loader />}
            {!loading &&
              qnas &&
              qnas.map((row, index) => {
                return (
                  <>
                    <TD key={index}>
                      <TDItem key={`${index}+name`}>{row.MEM_NAME}</TDItem>
                      <TDcontent
                        key={`${index}+content`}
                        onClick={() => onOpenModal(row)}
                      >
                        {row.Q_CONTENT.length > 18
                          ? row.Q_CONTENT.slice(0, 18) + '....'
                          : row.Q_CONTENT}
                      </TDcontent>
                      <TDItem key={`${index}+date`}>
                        {moment(row.Q_DATE).format('YYYY-MM-DD')}
                      </TDItem>
                      <IconBlock>
                        <IoIosCheckmarkCircleOutline
                          onClick={() => onCheck(row)}
                        />
                      </IconBlock>
                    </TD>
                  </>
                );
              })}
          </Table>
        </TableWrapper>
        {modal && (
          <ModalWrap>
            <Modal>
              <Title>
                <div>답변하기</div>
              </Title>
              <Content>
                <StyledTextarea value={qna.Q_CONTENT} />
                <StyledInput type="text" name="input" onChange={onChange} />
              </Content>
              <ButtonWrapper>
                <StyledButton onClick={onSubmit}>전송</StyledButton>
                <StyledButton onClick={onCancel}>취소</StyledButton>
              </ButtonWrapper>
            </Modal>
          </ModalWrap>
        )}
      </BodyHeight>
    </>
  );
};

export default QnAContainer;
