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
      Meteor.subscribe('rooms_by_id', this.params._id);
      var currentRoomInfo = Rooms.find().fetch()[0];
      if (currentRoomInfo) {
        Meteor.subscribe('messages_by_room', this.params._id);
        var _messages = Messages.find().fetch();
        if (_messages){
          return {
            roomId: currentRoomInfo._id,
            roomTitle: currentRoomInfo.title.toUpperCase(),
            messages: _messages
          }
        }
      }
    }
  });
  this.route('404', {path: '/*'});
});