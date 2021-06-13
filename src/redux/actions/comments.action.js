import request from "../../api";
import {
  COMMENT_LIST_SUCCESS,
  COMMENT_LIST_FAIL,
  COMMENT_LIST_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
} from "../actionTypes";

export const getCommentsOfVideoById  = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COMMENT_LIST_REQUEST,
    });
    const { data } = await request("/commentThreads", {
      params: {
        part: "snippet",
        videoId: id,
      },
    });
    dispatch({
      type: COMMENT_LIST_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: COMMENT_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const addComment = (id, text) => async (dispatch, getState) => {
  console.log("comment in comment action is ", text);
  try {
    dispatch({
      type: COMMENT_LIST_REQUEST,
    });
    const obj = {
      snippet: {
        videoId: id,
        topLevelComment: {
          snippet: {
            textOriginal: text,
          },
        },
      },
    };
    await request.post("/commentThreads", obj, {
      params: {
        part: "snippet",
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });
    console.log("Access Token in Comments action", getState().auth.accessToken);
    dispatch({
      type: CREATE_COMMENT_SUCCESS,
    });
    setTimeout(() => dispatch(getCommentsOfVideoById(id)), 5000);
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: CREATE_COMMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};