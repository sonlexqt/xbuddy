Template.chat_box.events({
  'click .sendMsg': function(){
    if (Meteor.user())
    {
      var _userId = Meteor.userId();
      var _userEmail = Meteor.user().emails[0].address;
      var _userMessage = $('.inputMsg').val();
      var _createdAt = new Date();
      var data = {
        roomId: this.roomId,
        userId: _userId,
        userEmail: _userEmail,
        userMsg: _userMessage,
        createdAt: _createdAt
      };
      Messages.insert(data);
      $('.inputMsg').val('');
    }
    else{
      alert("You haven't logged in yet!");
      return;
    }
  },
  'keypress .inputMsg': function(e, t){
    if (e.keyCode === 13){
      if (Meteor.user())
      {
        var _userId = Meteor.userId();
        var _userEmail = Meteor.user().emails[0].address;
        var _userMessage = $('.inputMsg').val();
        var _createdAt = new Date();
        var data = {
          roomId: this.roomId,
          userId: _userId,
          userEmail: _userEmail,
          userMsg: _userMessage,
          createdAt: _createdAt
        };
        Messages.insert(data);
        $('.inputMsg').val('');
      }
      else{
        alert("You haven't logged in yet!");
        return;
      }
    }
    else {
      var _userId = Meteor.userId();
      var _roomId = this.roomId;
      var _userEmail = Meteor.user().emails[0].address;
    }
  }
});

Template.chat_box.helpers({
  userTextColor: function(){
    var thisUser = Meteor.users.findOne({_id: this.userId});
    if (thisUser){
      return thisUser.profile.textColor;
    }
  },
  typingUsers: function(){
    return Session.get('typingUsers');
  }
});