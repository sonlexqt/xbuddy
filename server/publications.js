Meteor.publish('rooms', function(){
  return Rooms.find();
});
Meteor.publish('messages', function(){
  return Messages.find();
});