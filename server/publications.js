Meteor.publish('rooms', function(){
  return Rooms.find();
});
Meteor.publish('rooms_by_id', function(_roomId){
  return Rooms.find({_id: _roomId});
});
Meteor.publish('messages_by_room', function(_roomId){
  console.log('log from Meteor publish messages 1 arg:');
  console.log(_roomId);
  return Messages.find({roomId: _roomId});
});