import fetch from 'isomorphic-fetch'
import { message } from 'antd'

export const SET_COUNTER = 'SET_COUNTER'
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER'
export const SET_USERS = 'SET_USERS'
export const DELETE_USER = 'DELETE_USER'
export const ADD_USER = 'ADD_USER'
export const LOGIN_USER = 'LOGIN_USER'

export function set(value) {
  return {
    type: SET_COUNTER,
    payload: value
  }
}

export function increment() {
  return {
    type: INCREMENT_COUNTER
  }
}

export function decrement() {
  return {
    type: DECREMENT_COUNTER
  }
}

export function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState()

    if (counter % 2 === 0) {
      return
    }

    dispatch(increment())
  }
}

export function incrementAsync(delay = 1000) {
  return dispatch => {
    setTimeout(() => {
      dispatch(increment())
    }, delay)
  }
}

// 获取用户列表
const fetchUser = function(){
  return dispatch => {
    return fetch('/user/getAll')
            .then(response => response.json())
            .then(json => {
                console.log(json);
                dispatch(setUsers(json.attr))
              })
  };
}
// 删除用户
const fetchDUser = function(id){
  return dispatch => {
    return fetch('/user/delete?id='+id)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                if(json.type){
                  dispatch(deleteUser(id));
                  message.info(json.msg);
                }else{
                  message.error(json.msg);
                }
                
              })
  };
}
// 保存用户
const fetchAUser = function(username){
  return dispatch => {
    return fetch('/user/save?username='+username)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                if(json.type){
                  dispatch(addUser(json.attr));
                  message.info(json.msg);
                }else{
                  message.error(json.msg);
                }
              })
  };
}
// 用户登录
const fetchLUser = function(username){
  return dispatch => {
    return fetch('/user/login?username='+username)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                if(json.type){
                  dispatch(loginUser(json.attr));
                  message.info(json.msg);
                }else{
                  message.error(json.msg);
                }
              })
  };
}

/* 设置用户列表 */
export function setUsers(json){
  return {
    type :SET_USERS,
    userlist :json
  }
}

/* 获取用户列表-服务器 */
export function getUserList(){
  return dispatch => {
    return dispatch(fetchUser());
  }
}

/* 删除用户 */
export function deleteUser(id){
  // console.log(id);
  return{
    type: DELETE_USER,
    id
  }
}

/* 删除用户-服务器 */
export function fetchDeleteUser(id){
  return dispatch => {
    return dispatch(fetchDUser(id));
  }
}

/* 添加用户 */
export function addUser(user){
  return{
    type: ADD_USER,
    user
  }
}

/* 添加用户-服务器 */
export function fetchAddUser(name){
  return dispatch => {
    return dispatch(fetchAUser(name));
  }
}

/* 用户登录 */
export function loginUser(user){
  return{
    type: LOGIN_USER,
    user
  }
}

/* 用户登录-服务器 */
export function fetchLoginUser(name){
  return dispatch => {
    return dispatch(fetchLUser(name));
  }
}
