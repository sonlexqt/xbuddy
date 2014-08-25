addTypingUser = function(_userInfo) {
  TypingUsersStream.emit('add', _userInfo);
};

TypingUsersStream.on('add', function(_userInfo) {
  var result = TypingUsersCollection.find({roomId: _userInfo.roomId, userId: _userInfo.userId}).fetch();
  if (!result.length){
    TypingUsersCollection.insert(_userInfo);
  }
});

removeTypingUser = function(_userInfo) {
  TypingUsersStream.emit('remove', _userInfo);
};

TypingUsersStream.on('remove', function(_userInfo) {
  TypingUsersCollection.remove({roomId: _userInfo.roomId, userId: _userInfo.userId});
});