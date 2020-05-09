import React, { 
    useState, 
    useEffect 
} from 'react';
import axios from 'axios'
import * as S from '../style/ChattingListStyle';
import { withRouter } from 'react-router-dom';
import { x } from '../../public/imgs'
import { 
    chatUserListURL
} from '../../resource/serverURL';

const SearchModal = ({ 
    modalChange,
    accessToken,
    history,
}) => {
    const [studentList, listChange] = useState([]);
    const [searchInput, inputChange] = useState("");
    const header = {
        headers: {
            "Authorization": accessToken,
        },
    };
    useEffect(()=> {
        axios.get(`${chatUserListURL}?query=`,header)
        .then(({ data })=> {
            listChange(data);
        })
    },[]);
    const modalOffButtonClickHandler = () => {
        modalChange(false);
    }
    const searchUser = (query) => {
        axios.get(`${chatUserListURL}?query=${query}`,header)
        .then(({ data })=> {
            listChange(data);
        })
    }
    const inputChangeHandler = ({ target }) => {
        const data = target.value;
        inputChange(data);
    }
    const searchButtonClickHandler = () => {
        searchUser(searchInput);
    }
    const setList = (list) => {
        const buffer = [];
        list.map(({ 
            userName, 
            userId, 
            userNumber 
        })=> {
            buffer.push(
                <li onClick={()=>{moveChatPage(userId)}}>
                    <div>{userNumber}</div>
                    <div>{userName}</div>
                </li>
            )
            return { 
                userName, 
                userId, 
                userNumber 
            }
        })
        return buffer;
    }
    const moveChatPage = (userNumber) => {
        history.push(`/Admin/Chatting/${userNumber}`)
    }
    const inputKeyPress = ({ key }) => {
        if(key === "Enter"){
            searchButtonClickHandler();
        }
    }
    return (
        <S.SearchModalDiv>
            <S.SearchModal>
                <S.SearchModalHeader>
                    <S.SearchModalSearch>
                        <input 
                            placeholder="이름을 입력해 주세요"
                            onChange={inputChangeHandler}
                            onKeyPress={inputKeyPress}
                        />
                        <button onClick={searchButtonClickHandler}>검색</button>
                    </S.SearchModalSearch>
                    <S.SearchModalExitButton onClick={modalOffButtonClickHandler}>
                        <img src={x} alt="모달 끄기"/>
                    </S.SearchModalExitButton>
                </S.SearchModalHeader>
                <S.SearchModalList>
                    <li>
                        <div className="header">학년</div>
                        <div className="header">이름</div>
                    </li>
                    {
                        setList(studentList)
                    }
                </S.SearchModalList>
            </S.SearchModal>
            <S.SearchModalBackground/>
        </S.SearchModalDiv>
    )
}

export default withRouter(SearchModal);