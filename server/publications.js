Meteor.publish('rooms', function(){
  return Rooms.find();
});
Meteor.publish('rooms_by_id', function(_roomId){
  return Rooms.find({_id: _roomId});
});
Meteor.publish('messages_by_room', function(_roomId){
  return Messages.find({roomId: _roomId});
});
Meteor.publish("userData", function (_userId) {
    return Meteor.users.find({_id: _userId});
});