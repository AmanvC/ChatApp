export const getSenderName = (currentUser, allIds) => {
  return allIds.filter((user) => user._id !== currentUser._id)[0].name;
};

export const getSenderFullDetails = (currentUser, allIds) => {
  return allIds.filter((user) => user._id !== currentUser._id)[0];
};
