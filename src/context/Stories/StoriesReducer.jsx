import {
  ADD_STORY_CONTENT,
  GET_FEED_STORIES,
  MARK_STORY_AS_VIEWED,
  MARK_ALL_STORIES_AS_VIEWED,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_FEED_STORIES:
      return {
        ...state,
        stories: action.payload,
        loading: false,
      };

    case ADD_STORY_CONTENT:
      return {
        ...state,
        stories: [action.payload, ...state.stories],
        loading: false,
      };

    case MARK_STORY_AS_VIEWED: {
      const { storyId, userId } = action.payload;
      return {
        ...state,
        stories: state.stories.map((group) => {
          if (group.userId === userId) {
            const updatedStories = group.stories.map((s) =>
              s.id === storyId ? { ...s, isSeen: true } : s,
            );
            const hasUnseen = updatedStories.some((s) => !s.isSeen);
            return { ...group, stories: updatedStories, hasUnseen };
          }
          return group;
        }),
      };
    }

    case MARK_ALL_STORIES_AS_VIEWED: {
      const { userId } = action.payload;
      return {
        ...state,
        stories: state.stories.map((group) => {
          if (group.userId === userId) {
            const updatedStories = group.stories.map((s) => ({
              ...s,
              isSeen: true,
            }));
            return { ...group, stories: updatedStories, hasUnseen: false };
          }
          return group;
        }),
      };
    }

    default:
      return state;
  }
};
