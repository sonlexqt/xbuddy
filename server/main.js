Meteor.publish('currentTypingUsers', function(roomId) {
  var sub = this;
  var res = Utilites.find({title: "typingUsers", content: {
      roomId: roomId
    }
  });
  sub.ready();
  return res;
});