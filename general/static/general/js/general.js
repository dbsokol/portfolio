/* global $, Component, GET, POST, moment, jsPDF, html2canvas */


class Card extends Component {
  constructor(props) {
    super(props);
    this.attrs.card = $('<div>', {class : this.props.body + ' card dark'});
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
      });
      this.attrs.responsibilties.push(responsibility.attrs.card);
      responsibility.attrs.card.insertAfter(this.attrs.card);
    }
  }
  decorate() {
    var data = this.props.data;
    var cls = this.props.body;
    var row1 = $('<div>', {class : cls + ' row'}).appendTo(this.attrs.card);
    var row2 = $('<div>', {class : cls + ' row'}).appendTo(this.attrs.card);
    var start_date = moment(new Date(data.start_date)).format('MMMM, YYYY');
    var end_date = data.end_date ? moment(new Date(data.end_date)).format('MMMM, YYYY') : 'present';
    $('<div>', {class : cls + ' key', text:data.title + ' at ' + data.institution}).appendTo(row1);
    $('<div>', {class : cls + ' val', text:start_date + ' to ' + end_date}).appendTo(row1);
    $('<div>', {class : cls + ' key', text:'Company Mission: ' + data.mission}).appendTo(row2);
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
  }
}


class EducationCard extends Card {
  render() {
    this.decorate();
    var section = $('<section>').appendTo(this.attrs.body);
    this.attrs.card.appendTo(section);
  }
  decorate() {
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
  }
}


class ProjectCard extends Card {
  decorate() {
    var data = this.props.data;
    var cls = this.props.body;
    var row = $('<div>', {class : cls + ' row'}).appendTo(this.attrs.card);
    var url = $('<a>', {text:data.url.split('/')[2], href:data.url, target:'_blank'});
    $('<div>', {class : cls + ' key', text:data.name}).appendTo(row);
    $('<div>', {class : cls + ' val'}).appendTo(row).append(url);
  }
}


class SkillCard extends Card {
  decorate() {
    var data = this.props.data;
    var cls = this.props.body;
    var row = $('<div>', {class : cls + ' row'}).appendTo(this.attrs.card);
    var end_date = moment(new Date());
    var str_date = moment(new Date(data.start_date));
    var diff = moment.duration(end_date.diff(str_date));
    var date = diff.years() + ' years' + (diff.months() ? ' ' + diff.months() + ' months' : '');
    $('<div>', {class : cls + ' key', text:data.name}).appendTo(row);
    $('<div>', {class : cls + ' val', text:date}).appendTo(row);
    // row.on('mouseover', function(){
    //   row.html($('<div>', {class : cls + ' json', text:data}));
    // });
  }
}


$(document).ready(function() {
  GET({
    url : 'api/contact',
    success : function(response) {
      for (var object of response) new ContactCard({
        body : 'contact',
        data : object,
        keys : ['name', 'value']
      });
    }
  });
  GET({
    url : 'api/experiences',
    success : function(response) {
      for (var object of response) new ExperienceCard({
        body : 'experiences',
        data : object,
        keys : ['institution', 'title', 'mission', 'start_date', 'end_date'],
      });
    }
  });
  GET({
    url : 'api/education',
    success : function(response) {
      for (var object of response) new EducationCard({
        body : 'education',
        data : object,
        keys : ['institution', 'degree', 'major', 'start_date', 'end_date'],
      });
    }
  });
  GET({
    url : 'api/projects',
    success : function(response) {
      for (var object of response) new ProjectCard({
        body : 'projects',
        data : object,
        keys : ['name', 'url'],
      });
    }
  });
  GET({
    url : 'api/skills',
    success : function(response) {
      for (var object of response) new SkillCard({
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
    
    POST({
      url : 'download_pdf',
      data : document.body.serializeWithStyles(),
      success : function(response) {
        console.log('success')
      }
    });
  
  });
});


