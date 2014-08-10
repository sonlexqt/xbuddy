Template.user_profile.events({
  'click .fa-pencil': function(el){
    el.preventDefault();
    el.stopPropagation();
    var ev = $(el.currentTarget);
    ev.parent().parent().find('.user_profile_editable').editable('toggle');
  },
  'click .editUserTags': function(el){
    el.preventDefault();
    el.stopPropagation();
    var ev = $(el.currentTarget);
    var tagsString = '';
    var tagsLength = ev.parent().parent().find('.tags').length;
    var newTagsArray = '';
    ev.parent().parent().find('.tags').each(function(index, element){
      tagsString += $(this).html();
      if (index != tagsLength - 1) tagsString += ' ';
    });
    ev.parent().parent().find('.user_profile_editable_tags').editable({
      toggle: 'click',
      display: false,
      success: function(response, newValue){
        newTagsArray = newValue.split(' ');
        ev.parent().parent().find('.tags').remove();
        for (var i=0; i < newTagsArray.length; i++){
          $('.user_profile_editable_tags').append('<span class="tags">'+newTagsArray[i] +'</span>');
          if (i != newTagsArray.length-1) $('.user_profile_editable_tags').append('<span class="single_space">'+'&nbsp;'+'</span>');
        }
      }
    });
    ev.parent().parent().find('.user_profile_editable_tags').editable('toggle');
    $('.input-sm').val(tagsString);
  },
  'click .btnSaveProfile': function(){
    var _username = $('.profile_username').html();
    var _email = $('.profile_email').html();
    var _about = $('.profile_about').html();
    var _hobbies = $('.profile_hobbies').html();
    var _textColor = $('#hue-demo').val();
    var _skills = [];
    $('.tags').each(function(index, element){
      _skills.push($(this).html());
    });
    var profileData = {
      username: _username,
      email: _email,
      about: _about,
      hobbies: _hobbies,
      skills: _skills,
      textColor: _textColor
    };
    Meteor.users.update({_id: Meteor.userId()},{
      $set: {
        profile: {
          username: _username,
          email: _email,
          about: _about,
          hobbies: _hobbies,
          skills: _skills,
          textColor: _textColor
        }
      }
    }, function(err, profileUpdated){
      if (err){
        console.log(err);
      }
      else {
        $('.profile_username').html(profileData.username);
        $('.profile_email').html(profileData.email);
        $('.profile_about').html(profileData.about);
        $('.profile_hobbies').html(profileData.hobbies);
        $('.user_profile_editable_tags span').remove();
        $('.user_profile_editable_tags.single_space').remove();
        for (var i=0; i < profileData.skills.length; i++){
          $('.user_profile_editable_tags').append('<span class="tags">'+ profileData.skills[i] +'</span>');
          if (i != profileData.skills.length -1) $('.user_profile_editable_tags').append('<span class="single_space">'+'&nbsp;'+'</span>');
        }
        $('.save-user-profile-success').fadeIn();
      }
    });
  }
});

Template.user_profile.rendered = function() {
  $(function() {
    var colpick = $('.demo').each(function () {
      $(this).minicolors({
        control: $(this).attr('data-control') || 'hue',
        inline: $(this).attr('data-inline') === 'true',
        letterCase: 'lowercase',
        opacity: false,
        change: function (hex, opacity) {
          if (!hex) return;
          if (opacity) hex += ', ' + opacity;
          try {
            console.log(hex);
          } catch (e) {
          }
          $(this).select();
        },
        theme: 'bootstrap'
      });
    });
  });
};

window.onload = function () {
  $('#hue-demo').minicolors('value', $('#hue-demo').val());
};
