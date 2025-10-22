import {
  ADD_COMMENT,
  ADD_POST,
  SET_POSTS,
  UPDATE_REACTIONS,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };
    case ADD_POST:
      return { ...state, posts: [action.payload, ...state.posts] };
    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.postId
            ? { ...post, comments: [...post.comments, action.payload.comment] }
            : post
        ),
      };
    case UPDATE_REACTIONS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.postId
            ? { ...post, reactions: action.payload.reactions }
            : post
        ),
      };
    default:
      return state;
  }
};
