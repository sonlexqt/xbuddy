Template.chat_rooms.helpers({
  chat_room: function() {
    Meteor.subscribe('rooms');
    return Rooms.find();
  },
  createdAt_day: function() {
    var temp = new Date(this.createdAt);
    return temp.getDate();
  },
  createdAt_month: function(){
    var temp = new Date(this.createdAt);
    return getMonthName(temp.getMonth());
  },
  numberOfParticipants: function(){
    return this.participants.length;
  }
});

Template.chat_rooms.events({
  'click .btnCreateRoom': function(){
    var _creatorId = Meteor.userId();
    var _participants = [];
    var _title = $('#inputTitle').val();
    var _description = $('#inputDescription').val();
    var _imgLink = $('#inputImgLink').val();
    var _createdAt = new Date();
    var data = {
      creatorId : _creatorId,
      createdAt : _createdAt,
      title: _title,
      description: _description,
      participants: _participants,
      imgLink: _imgLink
    };
    Rooms.insert(data, function(err, newRoomId){
      Messages.insert({
        roomId: newRoomId,
        userEmail: 'ts7@admin.com',
        userMsg: 'initialMsg',
        createdAt: new Date()
      })
    });
  },
  'click #back-to-top': function(){
    $('#back-to-top').tooltip('hide');
    $('body,html').animate({
      scrollTop: 0
    }, 800);
    return false;
  }
});

function getMonthName(monthNumber){
  var monthNames = [ "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER" ];
  return monthNames[monthNumber].slice(0,3);
}

$(document).ready(function(){
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $('#back-to-top').fadeIn();
    } else {
      $('#back-to-top').fadeOut();
    }
  });
  $('#back-to-top').tooltip('show');
});