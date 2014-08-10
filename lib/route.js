Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function(){
  this.route('chat_rooms', {path: '/'});
  this.route('user_profile', {
    path: '/user_profile/:_id',
    data: function(){
      var currentUserProfile = Meteor.users.findOne({_id: this.params._id});
      if (!currentUserProfile) {
        console.log('currentUserProfile is null');
        return;
      }
      else {
        return currentUserProfile.profile;
      }
    }

  });
  this.route('about', {path: '/about'});
  this.route('chat_box', {
    path: 'chat_box/:_id',
    data: function(){
      var currentRoom = Rooms.findOne({_id: this.params._id});
      if (!currentRoom) {
        console.log('currentRoom is null');
        return;
      }
      else {
        var _messages = Messages.find({roomId: this.params._id});
        if (!_messages) {
          console.log('_messages is null');
          return;
        }
        else {
          return {
            roomId: currentRoom._id,
            roomTitle: currentRoom.title.toUpperCase(),
            messages: _messages
          }
        }
      }
    }
  });
  this.route('404', {path: '/*'});
});