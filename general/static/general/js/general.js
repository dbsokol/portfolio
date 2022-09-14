/* global $, Component, GET, POST, moment, jsPDF, html2canvas */


class Card extends Component {
  constructor(props) {
    super(props);
    this.attrs.card = $('<div>', {class : this.props.body + ' card dark animations-' + ($(window).width() > 768 ? 'on' : 'off')});
    this.render();
  }
  render() {
    this.decorate();
    this.attrs.card.appendTo(this.attrs.body);
  }
}


class SmallCard extends Card {
  render() {
    this.attrs.card.removeClass('card');
    this.attrs.card.addClass('small-card');
    this.decorate();
    this.attrs.card.appendTo(this.attrs.body);
  }
}


class ContactCard extends SmallCard {
  decorate() {
    var cls = this.props.body;
    var row = $('<div>', {class: cls + ' row'}).appendTo(this.attrs.card);
    var key = $('<div>', {class: cls + ' key', text: this.props.data.name +': '}).appendTo(row);
    var val = $('<div>', {class: cls + ' val', text: this.props.data.value}).appendTo(row);
  }
}


class ExperienceCard extends Card {
  render() {
    this.decorate();
    this.attrs.card.appendTo(this.attrs.body);
    this.attrs.responsibilties = [];
    for (var responsibility of this.props.data.responsibilties) {
      responsibility = new ResponsibilityCard({
        body : 'responsibility',
        data : responsibility,
        keys : ['details'],
        experience_id : this.props.data.id,
      });
      this.attrs.responsibilties.push(responsibility.attrs.card);
      responsibility.attrs.card.insertAfter(this.attrs.card);
    }
  }
  decorate() {
    var card = this;
    var data = this.props.data;
    var cls = this.props.body;
    var row1 = $('<div>', {class : cls + ' row'}).appendTo(this.attrs.card);
    var row2 = $('<div>', {class : cls + ' row'}).appendTo(this.attrs.card);
    var start_date = moment(new Date(data.start_date)).format('MMMM, YYYY');
    var end_date = data.end_date ? moment(new Date(data.end_date)).format('MMMM, YYYY') : 'present';
    $('<div>', {class : cls + ' key', text:data.title + ' at ' + data.institution}).appendTo(row1);
    $('<div>', {class : cls + ' val', text:start_date + ' to ' + end_date}).appendTo(row1);
    $('<div>', {class : cls + ' key', text:'Company Mission: ' + data.mission}).appendTo(row2);
    var json_data = $.extend(true, {}, data);
    for (var responsibility of json_data.responsibilties) {
      responsibility.details = responsibility.details.slice(0,30) + '... <truncated>';
    }
    json_data = JSON.stringify(json_data, null, 2);
    this.attrs.jsn = $('<pre>', {class : cls + ' json', text:json_data}).appendTo(this.attrs.card);
    this.attrs.card.mouseleave(function(){
      card.attrs.jsn.slideUp();
      $('.resp-exp-' + card.props.data.id).show();
    });
    this.attrs.card.click(function(){
      if ($(window).width() <= 768) return;
      if ($('#toggle-animations').attr('state') == 'off') return;
      card.attrs.jsn.slideDown();
      $('.resp-exp-' + card.props.data.id).hide();
    });
  }
}


class ResponsibilityCard extends SmallCard {
  decorate() {
    var data = this.props.data;
    var cls = this.props.body;
    var row = $('<div>', {class : cls + ' row'}).appendTo(this.attrs.card);
    var detail = $('<div>', {class: cls +' key'}).appendTo(row);
    $('<i>', {class: cls + ' key icn material-icons', text:'subdirectory_arrow_right'}).appendTo(detail);
    detail.append(data.details);
    this.attrs.card.addClass('resp-exp-' + this.props.experience_id);
  }
}


class EducationCard extends Card {
  render() {
    this.decorate();
    var section = $('<section>').appendTo(this.attrs.body);
    this.attrs.card.appendTo(section);
  }
  decorate() {
    var card = this;
    var data = this.props.data;
    var cls = this.props.body;
    var short_institution = data.institution.replace('University', 'Unv.').split('C')[0];
    var grad_date = moment(new Date(data.end_date));
    var row1 = $('<div>', {class : cls + ' row'}).appendTo(this.attrs.card);
    var row2 = $('<div>', {class : cls + ' row'}).appendTo(this.attrs.card);
    $('<div>', {class : cls + ' key long', text:data.institution}).appendTo(row1);
    $('<div>', {class : cls + ' key short', text:short_institution}).appendTo(row1);
    $('<div>', {class : cls + ' val', text:grad_date.format('MMMM, YYYY')}).appendTo(row1);
    $('<div>', {class : cls + ' key', text:data.degree + ' in ' + data.major}).appendTo(row2);
    this.attrs.jsn = $('<pre>', {class : cls + ' json', text:JSON.stringify(data, undefined, 2)}).appendTo(this.attrs.card);
    this.attrs.card.mouseleave(function(){
      card.attrs.jsn.slideUp();
    });
    this.attrs.card.click(function(){
      if ($(window).width() <= 768) return;
      if ($('#toggle-animations').attr('state') == 'off') return;
      card.attrs.jsn.slideDown();
    });
  }
}


class ProjectCard extends Card {
  decorate() {
    var card = this;
    var data = this.props.data;
    var cls = this.props.body;
    var url = $('<a>', {text:data.url.split('/')[2], href:data.url, target:'_blank'});
    this.attrs.row = $('<div>', {class : cls + ' row'}).appendTo(this.attrs.card);
    this.attrs.key = $('<div>', {class : cls + ' key', text:data.name}).appendTo(this.attrs.row);
    this.attrs.val = $('<div>', {class : cls + ' val'}).appendTo(this.attrs.row).append(url);
    this.attrs.jsn = $('<pre>', {class : cls + ' json', text:JSON.stringify(data, undefined, 2)}).appendTo(this.attrs.card);
    this.attrs.card.mouseleave(function(){
      card.attrs.jsn.slideUp();
    });
    this.attrs.card.click(function(){
      if ($(window).width() <= 768) return;
      if ($('#toggle-animations').attr('state') == 'off') return;
      card.attrs.jsn.slideDown();
    });
  }
}


class SkillCard extends Card {
  decorate() {
    var card = this;
    var data = this.props.data;
    var cls = this.props.body;
    var end_date = moment(new Date());
    var str_date = moment(new Date(data.start_date));
    var diff = moment.duration(end_date.diff(str_date));
    var date = diff.years() + ' years' + (diff.months() ? ' ' + diff.months() + ' months' : '');
    this.attrs.row = $('<div>', {class : cls + ' row'}).appendTo(this.attrs.card);
    this.attrs.key = $('<div>', {class : cls + ' key', text:data.name}).appendTo(this.attrs.row);
    this.attrs.val = $('<div>', {class : cls + ' val', text:date}).appendTo(this.attrs.row);
    this.attrs.jsn = $('<pre>', {class : cls + ' json', text:JSON.stringify(data, undefined, 2)}).appendTo(this.attrs.card);
    this.attrs.card.mouseleave(function(){
      card.attrs.jsn.slideUp();
    });
    this.attrs.card.click(function(){
      if ($(window).width() <= 768) return;
      if ($('#toggle-animations').attr('state') == 'off') return;
      card.attrs.jsn.slideDown();
    });
  }
}


class TitleCard extends Component {
  constructor(props) {
    super(props);
    var card = this;
    this.attrs.title = $('.title.' + this.props.body);
    this.attrs.link = $('.api-link.' + this.props.body);
  }
}


$(document).ready(function() {
  new TitleCard({body:'experiences'});
  new TitleCard({body:'education'});
  new TitleCard({body:'projects'});
  new TitleCard({body:'skills'});
  GET({
    url : 'api/contact',
    success : function(response) {
      for (var object of response.results) new ContactCard({
        body : 'contact',
        data : object,
        keys : ['name', 'value']
      });
    }
  });
  GET({
    url : 'api/experiences',
    success : function(response) {
      for (var object of response.results) new ExperienceCard({
        body : 'experiences',
        data : object,
        keys : ['institution', 'title', 'mission', 'start_date', 'end_date'],
      });
    }
  });
  GET({
    url : 'api/education',
    success : function(response) {
      for (var object of response.results) new EducationCard({
        body : 'education',
        data : object,
        keys : ['institution', 'degree', 'major', 'start_date', 'end_date'],
      });
    }
  });
  GET({
    url : 'api/projects',
    success : function(response) {
      for (var object of response.results) new ProjectCard({
        body : 'projects',
        data : object,
        keys : ['name', 'url'],
      });
    }
  });
  GET({
    url : 'api/skills',
    success : function(response) {
      for (var object of response.results) new SkillCard({
        body : 'skills',
        data : object,
        keys : ['name', 'start_date'],
      });
    }
  });
  $('#color-mode').click(function(){
    var state = $(this).attr('state');
    if (state=='dark') {
      $(this).attr('state', 'light');
      $(this).text('dark mode');
      $('.dark').addClass('light');
      $('.dark').removeClass('dark');
    }
    else {
      $(this).attr('state', 'dark');
      $(this).text('light mode');
      $('.light').addClass('dark');
      $('.light').removeClass('light');
    }
  });
  $('#download-pdf').click(function() {
    window.print();
  });
  $('#toggle-animations').click(function() {
    var state = $(this).attr('state');
    if (state=='on') {
      $(this).attr('state', 'off');
      $(this).text('animations on');
      $(".card").addClass('animations-off');
      $(".card").removeClass('animations-on');
    } else {
      $(this).attr('state', 'on');
      $(this).text('animations off');
      $(".card").addClass('animations-on');
      $(".card").removeClass('animations-off');
    }
  });
  $('.title').mouseenter(function(){
    if ($(window).width() <= 768) return;
    if ($('#toggle-animations').attr('state') == 'off') return;
    var title = $(this);
    var cls = $(this).attr('class').split(' ')[0];
    var link = $('.' + cls + '.api-link');
    title.hide();
    link.show();
  });
  $('.api-link').mouseleave(function(){
    var link = $(this);
    var cls = $(this).attr('class').split(' ')[0];
    var title = $('.' + cls + '.title');
    title.show();
    link.hide();
  });
  $(document).mouseleave(function(){
    $('.title').show();
    $('.api-link').hide();
  });
});


