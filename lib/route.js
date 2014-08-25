Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function(){
  this.route('chat_rooms', {path: '/'});
  this.route('user_profile', {
    path: '/user_profile/:_id',
    data: function(){
      var currentUserProfile = Meteor.users.findOne({_id: this.params._id});
      return currentUserProfile.profile;
    }
  });
  this.route('about', {path: '/about'});
  this.route('chat_box', {
    path: 'chat_box/:_id',
    data: function(){
      Meteor.subscribe('rooms');
      var currentRoom = Rooms.findOne({_id: this.params._id});
      Meteor.subscribe('messages');
      var _messages = Messages.find({roomId: this.params._id});
      return {
        roomId: currentRoom._id,
        roomTitle: currentRoom.title.toUpperCase(),
        messages: _messages
      }
    }
  });
  this.route('404', {path: '/*'});
});